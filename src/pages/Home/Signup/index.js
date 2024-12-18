import React, { useState, useRef } from "react";
import ButtonForm from "../../../components/ButtonForm";
import Input from "../../../components/Input";
import ContainerForm from "../../../components/ContainerForm";
import Logo from "../../../components/Logo";
import Content from "../../../components/Content";
import FormBox from "../../../components/FormBox";
import Label from "../../../components/Label";
import ImageBox from "../../../components/ImageBox";
import LabelError from "../../../components/LabelError";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isReading, setIsReading] = useState(false);
  const portRef = useRef(null);
  const navigate = useNavigate();

  const accessLevelMap = {
    Administrador: "ADMIN",
    "Ministro do meio ambiente": "ENVIRONMENTAL_MINISTER",
    "Diretor de Divisão": "DIVISION_DIRECTOR",
    Usuário: "USER",
  };

  const connectSerialPort = async () => {
    try {
      console.log("Solicitando conexão com a porta serial...");
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate: 9600 });
      portRef.current = selectedPort;
      console.log("Conexão com porta serial estabelecida.");
      setError(""); // Limpa erros anteriores
    } catch (error) {
      console.error("Erro ao conectar à porta serial:", error);
      setError("Erro ao conectar ao dispositivo de leitura");
    }
  };

  const closeSerialPort = async () => {
    if (portRef.current) {
      try {
        if (
          portRef.current.readable.locked ||
          portRef.current.writable.locked
        ) {
          console.log("Stream ainda está travado. Tentando liberar...");
          const writer = portRef.current.writable.getWriter();
          await writer.close();
        }

        if (portRef.current.writable) {
          const writer = portRef.current.writable.getWriter();
          await writer.close();
        }

        if (
          !portRef.current.readable.locked &&
          !portRef.current.writable.locked
        ) {
          await portRef.current.close();
          console.log("Porta serial fechada.");
        } else {
          console.log(
            "Porta serial ainda está travada e não pode ser fechada agora."
          );
        }
      } catch (error) {
        if (
          error.message.includes("Cannot cancel a locked stream") ||
          error.message.includes(
            "Cannot create writer when WritableStream is locked"
          )
        ) {
          console.warn(
            "Tentativa de fechar um stream já travado. Este erro pode ser ignorado."
          );
        } else {
          console.error("Erro ao fechar a porta serial:", error);
        }
      }
    }
  };

  const readData = async () => {
    const token = localStorage.getItem("token"); // Obtém o token do localStorage
    if (!token) {
      setError("Usuário não autenticado. Faça login novamente.");
      return;
    }

    if (!portRef.current) {
      setError("Conecte o dispositivo antes de cadastrar");
      return;
    }

    try {
      const selectedPort = portRef.current;

      if (selectedPort.readable.locked) {
        console.log("Stream já está em uso. Liberando o stream anterior...");
        if (selectedPort.reader) {
          await selectedPort.reader.cancel();
          selectedPort.reader.releaseLock();
          selectedPort.reader = null;
        }
        if (selectedPort.decoder) {
          await selectedPort.decoder.readable.cancel();
          await selectedPort.decoder.writable.getWriter().close();
          selectedPort.decoder = null;
        }
      }

      const decoder = new TextDecoderStream();
      selectedPort.decoder = decoder;
      const readableStreamClosed = selectedPort.readable
        .pipeTo(decoder.writable)
        .catch((err) => {
          if (err !== undefined) {
            console.error("Erro no pipeTo:", err);
          }
          selectedPort.decoder = null;
        });
      const reader = decoder.readable.getReader();
      selectedPort.reader = reader;

      setIsReading(true);
      console.log("Aguardando leitura da digital...");

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log("Leitura da porta serial encerrada.");
          break;
        }
        if (value) {
          const parsedId = parseInt(value.trim());
          console.log("ID da digital recebida:", parsedId);

          if (isNaN(parsedId)) {
            console.error("ID da digital inválido:", value);
            setError("ID da digital inválido recebido.");
            continue; // Continua lendo
          }

          // Envia os dados para o backend
          const success = await registerUser(token, parsedId);
          if (success) {
            console.log("Usuário cadastrado com sucesso!");
            await closeSerialPort();
            setIsReading(false);
            alert("Usuário cadastrado com sucesso!");
            break;
          } else {
            console.log("Falha ao cadastrar usuário.");
            break;
          }
        }
      }
    } catch (error) {
      console.error("Erro ao ler da porta serial:", error);
      setError("Erro ao ler do dispositivo");
    } finally {
      if (portRef.current.reader) {
        portRef.current.reader.releaseLock();
        portRef.current.reader = null;
      }

      if (portRef.current.decoder) {
        try {
          if (!portRef.current.decoder.readable.locked) {
            await portRef.current.decoder.readable.cancel();
            await portRef.current.decoder.writable.getWriter().close();
          }
        } catch (e) {
          if (
            e.message.includes(
              "Cannot create writer when WritableStream is locked"
            ) ||
            e.message.includes("Cannot cancel a locked stream")
          ) {
            console.warn(
              "Tentativa de fechar um decoder já travado. Este erro pode ser ignorado."
            );
          } else {
            console.error("Erro ao fechar o decoder:", e);
          }
        }
        portRef.current.decoder = null;
      }

      setIsReading(false);
    }
  };

  const registerUser = async (token, biometricId) => {
    try {
      console.log("Enviando dados do usuário para o backend...");

      const mappedAccessLevel = accessLevelMap[accessLevel];
      if (!mappedAccessLevel) {
        setError("Nível de acesso inválido.");
        return false;
      }

      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          password,
          accessLevel: mappedAccessLevel,
          biometricId,
        }),
      });

      if (response.ok) {
        console.log("Cadastro bem-sucedido.");
        return true;
      } else {
        let errorMessage = "Falha ao cadastrar usuário";
        try {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        } catch (e) {
          console.error("Erro ao obter mensagem de erro:", e);
        }
        setError(errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário no backend:", error);
      setError(error.message || "Erro ao cadastrar usuário");
      return false;
    }
  };

  const handleSignup = async () => {
    if (!username || !password || !accessLevel) {
      setError("Preencha todos os campos");
      return;
    }

    setError("Aguardando leitura da digital...");

    if (!isReading) {
      await readData();
    }
  };

  return (
    <ContainerForm>
      <Logo />
      <Content>
        <FormBox>
          <Label>Cadastrar novo usuário</Label>
          <Input
            type="text"
            placeholder="Digite seu E-mail"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />
          <div style={{ position: "relative" }}>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <select
            value={accessLevel}
            onChange={(e) => {
              setAccessLevel(e.target.value);
              setError("");
            }}
          >
            <option value="">Selecione o nível de acesso</option>
            <option value="Administrador">Administrador</option>
            <option value="Ministro do meio ambiente">
              Ministro do meio ambiente
            </option>
            <option value="Diretor de Divisão">Diretor de Divisão</option>
            <option value="Usuário">Usuário</option>
          </select>
          <LabelError>{error}</LabelError>
          <div style={{ display: "flex", gap: "8px" }}>
            <ButtonForm onClick={handleSignup} disabled={isReading}>
              Cadastrar Usuário
            </ButtonForm>
            <ButtonForm onClick={connectSerialPort} disabled={isReading}>
              Conectar
            </ButtonForm>
          </div>
        </FormBox>
        <ImageBox />
      </Content>
    </ContainerForm>
  );
};

export default Signup;
