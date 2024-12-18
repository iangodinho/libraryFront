import React from "react";
import * as S from "./styles";

const ButtonForm = ({ children, onClick }) => {
  return <S.ButtonForm onClick={onClick}>{children}</S.ButtonForm>;
};

export default ButtonForm;