import styled from 'styled-components';

export const ButtonLight = styled.button`
  background-color: #0f2d40;
  border: 1px solid #103d58;
  border-radius: 92px;
  padding: 5px 15px;
  font-size: 18px;
  transition: 0.3s;
  color: #72ccf8;
  border: 1px solid #103b55;
  cursor: pointer;

  &:hover {
    background-color: #103b55;
  }
`;

export const ButtonDark = styled.button`
  background-color: #0c79bc;
  border: 1px solid #103d58;
  border-radius: 92px;
  padding: 5px 15px;
  font-size: 18px;
  transition: 0.3s;
  color: white;
  border: 1px solid #103b55;
  cursor: pointer;

  &:hover {
    background-color: #159be2;
  }
`;
