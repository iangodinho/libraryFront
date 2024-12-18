import styled from "styled-components";

export const ButtonForm = styled.button`
  background-color: #183EFF; // Cor azul
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px; // Adiciona borda arredondada
  font-size: 18px; // Aumenta a fonte
  &:after {
    content: '→'; // Adicionar setinha
    margin-left: 10px;
  }
`;
