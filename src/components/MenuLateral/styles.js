import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const MenuWrapper = styled.div`
  width: 350px;
  height: 100vh;
  background-color: #f8f9fa; /* Cor de fundo mais clara */
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 10px;
`;

export const CategoryTitle = styled.div`
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #333; /* Cor do texto mais escura */
`;

export const MenuItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: #e9ecef; /* Cor de fundo ao passar o mouse */
    border-radius: 5px; /* Bordas arredondadas */
  }
  &.active {
    background-color: #e9ecef; /* Cor de fundo do item ativo */
    color: #183EFF; /* Cor do texto do item ativo */
    border-radius: 10px;
  }
`;

export const Icon = styled.img`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  /* O svg dentro do ícone vai herdar a cor do texto atual */
  svg {
    fill: currentColor;
  }
`

export const StyledNavLink = styled(NavLink)`
  color: #959595;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px;

  &.active {
    background-color: #e9ecef;
    color: #183EFF;
    border-radius: 5px;
  }

  &:hover {
    background-color: #e9ecef;
    border-radius: 5px;
  }

  img {
    margin-right: 10px;
  }
`