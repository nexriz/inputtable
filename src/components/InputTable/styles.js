import React, {
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback,
  useContext,
  useReducer
} from "react";
import styled from "styled-components";
import { selectContext as SelectContext } from "./selectContext";

export const Section = styled.section`
  display: table;
  border-collapse: collapse;
  border-spacing: 0;
  .ds-selector {
    border: 5px solid gold;
  }
  * {
    box-sizing: border-box;
  }
  /* .he {
    background: #f6f8fa;
  } */
  .se {
    background: #ecff1621;
  }
`;

export const Header = styled.div`
  display: table-row;
  user-select: none;
  border-collapse: collapse;
  border-spacing: 0;
`;
export const Body = styled.div`
  display: table-row;
  user-select: none;
  border-collapse: collapse;
  border-spacing: 0;
`;
export const CellWrapper = styled.div`
  display: table-cell;
  border: 1px solid #ccc;
  position: relative;
  cursor: text;
`;

export const Input = styled.input`
  border: 1px solid ${props => (props.selected ? "#e23535" : "transparent")};
  padding: 10px;
  outline: none;
  background: ${props => (props.validated ? "white" : "red")};

  &:focus {
    border: 1px solid ${props => (props.selected ? "#ffe72e" : "#ccccccb3")};
    outline: none;
  }
`;

export const Selector = styled.div`
  position: absolute;
  cursor: text;
`;

export const EditorContainer = styled.div`
  position: absolute;
  display: block;
  width: 13px;
  height: 99%;
  border: 1px solid transparent;
  margin: 1px;
  background: #e6e6e680;
  top: 0;
  right: 0;
  transition: width 0.2s ease-in-out;
  will-change: width;
  &:hover {
    width: 50px;
  }
`;
