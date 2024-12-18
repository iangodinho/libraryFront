import React, { useState } from "react";
import {
  Container,
  Form,
  Input,
  TextArea,
  Select,
  Button,
  Label,
  Row,
} from "./styles";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [accessLevel, setAccessLevel] = useState("Usuário");

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Adicionar título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Escrever conteúdo do post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Row>
          <Label>Quem pode ver a sua publicação?</Label>
          <Select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
          >
            <option value="Usuário">Usuário</option>
            <option value="Diretor de Divisão">Diretor de Divisão</option>
            <option value="Ministro do Meio Ambiente">
              Ministro do Meio Ambiente
            </option>
          </Select>
          <Button type="submit">Publicar</Button>
        </Row>
      </Form>
    </Container>
  );
};

export default CreatePost;
