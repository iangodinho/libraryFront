import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";

const Strong = ({ children, to }) => {
  return (
    <S.Strong>
      <Link to={to}>{children}</Link>
    </S.Strong>
  );
};

export default Strong;
