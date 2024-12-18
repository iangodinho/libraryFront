import React from "react";
import * as C from "./styles";
import logoMenu from "../../img/logo.png";
import lockGrayIcon from "../../img/lock-gray.svg"; // Ícone cinza para Grupos
import lockBlueIcon from "../../img/lock-blue.svg"; // Ícone azul para Grupos
import gearGrayIcon from "../../img/gear-gray.svg"; // Ícone cinza para Configurações
import gearBlueIcon from "../../img/gear-blue.svg"; // Ícone azul para Configurações
import speedometerGrayIcon from "../../img/speedometer-gray.svg"; // Ícone cinza para Dashboard
import speedometerBlueIcon from "../../img/speedometer-blue.svg"; // Ícone azul para Dashboard

const MenuLateral = () => {

  return (
    <C.MenuWrapper>
      <C.LogoWrapper>
        <img src={logoMenu} alt="Logo" width="250" height="auto" />
      </C.LogoWrapper>
      <C.CategoryTitle>INÍCIO</C.CategoryTitle>
      <C.MenuItem>
        <C.StyledNavLink to="/dashboard">
          <img
            src={isDashboardActive ? speedometerBlueIcon : speedometerGrayIcon}
            alt="Ícone de Dashboard"
            width="20"
            height="20"
            style={{ marginRight: "10px" }}
          />
          Dashboard
        </C.StyledNavLink>
      </C.MenuItem>

      <C.CategoryTitle>PUBLICAR</C.CategoryTitle>
      <C.MenuItem>
        <C.StyledNavLink to="/posts">
          <img
            src={isGruposActive ? lockBlueIcon : lockGrayIcon}
            alt="Ícone de Grupos"
            width="20"
            height="20"
            style={{ marginRight: "10px" }}
          />
          Criar Post
        </C.StyledNavLink>
      </C.MenuItem>

      <C.CategoryTitle>SISTEMA</C.CategoryTitle>
      <C.MenuItem>
        <C.StyledNavLink to="/signup">
          <img
            src={isConfigActive ? gearBlueIcon : gearGrayIcon}
            alt="Ícone de Configurações"
            width="20"
            height="20"
            style={{ marginRight: "10px" }}
          />
          Criar Usuário
        </C.StyledNavLink>
      </C.MenuItem>
    </C.MenuWrapper>
  );
};

export default MenuLateral;
