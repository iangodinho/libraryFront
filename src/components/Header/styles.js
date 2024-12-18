import styled from 'styled-components';

// Estilo do header principal
export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;     // Fixa o header no topo da página
  top: 0;              // Cola no topo
  left: 350px;         // Define a posição da borda esquerda ao lado do menu lateral (ajustando para o tamanho do menu)
  width: calc(100% - 350px);  // O header ocupará todo o espaço restante da página, considerando o tamanho do menu
  height: 60px;        // Defina a altura desejada do header
  background-color: #F8F9FA;
  padding: 10px;
  z-index: 1000;       // Garante que o header fique sobre outros elementos
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.1); // Pequena sombra para destacar o header
`;

// Estilo para os ícones
export const Icon = styled.div`
  margin-right: 20px;
  cursor: pointer;
  font-size: 28px;
  display: flex;
`;

// Estilo da bandeira
export const FlagImage = styled.img`
  margin-right: 20px;
  width: 32px;
  height: auto;
`;
