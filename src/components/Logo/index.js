import React from "react";
import * as S from "./styles";
import logo from "../../img/logo.png";

const Logo = ({ src, alt }) => {
  return <S.Logo src={logo} alt={alt} />;
};

export default Logo;
