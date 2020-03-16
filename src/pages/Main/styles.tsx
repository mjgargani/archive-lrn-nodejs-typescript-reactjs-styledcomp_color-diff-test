import styled from "styled-components";

export const LabelResult = styled.div`
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  background-color: #fff;
  color: #000;
  font-size: 13px;
`;

export const CounterResult = styled.div`
  position: fixed;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  color: #000;
  font-size: 16px;
  line-height: 25px;
  padding: 5px;
  margin: 5px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const CounterLine = styled.div`
  display: flex;
  padding: 5px;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
`;

interface IColorBlock {
  color: string;
  diff?: boolean;
}

export const ColorBlock = styled.div<IColorBlock>`
  border: 5px solid #fff !important;
  border-radius: 16px;
  background-color: ${props => props.color};
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.diff ? "center" : "flex-end")};
  width: 20vw;
  height: 100vh;
  box-sizing: border-box;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100vh;
`;
