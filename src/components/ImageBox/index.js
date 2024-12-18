import React from "react";
import * as S from "./styles";
import image from "../../img/img-borda.png";

const ImageBox = ({ src, alt }) => {
  return <S.ImageBox src={image} alt={alt} />;
};

export default ImageBox;
