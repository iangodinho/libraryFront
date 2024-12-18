import styled from "styled-components";

export const Select = styled.select`
  outline: none;
  width: 100%;
  padding: 12px 0px;
  border: none;
  border-bottom: 1px solid #202020;
  background-color: transparent;
  font-size: 18px;
  margin-bottom: 20px;
  color: #757575;
  cursor: pointer;
  &.active {
    border-left: 5px solid gray;
  }
  option {
    color: black; /* Cor das opções */
  }
  option:disabled {
    color: #A2A2A2; /* Cor das opções */
  }
`
