import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  font-family: "Poppins", sans-serif;
`;

export const Form = styled.form`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px; /* Aumentando a largura máxima */
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  border: 1px solid #a2a2a2;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  font-size: 1rem;
  &::placeholder {
    color: #a2a2a2;
  }
`;

export const TextArea = styled.textarea`
  border: 1px solid #a2a2a2;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  height: 200px; /* Tamanho fixo para a área de conteúdo */
  font-size: 1rem;
  resize: none; /* Desabilitar redimensionamento */
  &::placeholder {
    color: #a2a2a2;
  }
`;

export const Select = styled.select`
  border: 1px solid #a2a2a2;
  border-radius: 4px;
  padding: 10px;
  font-size: 1rem;
  margin-right: 20px;
  color: #656565;
`;

export const Button = styled.button`
  background-color: #183eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #1453d1;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-right: 20px;
  color: #656565;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
