import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const spinnerAnimation = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }`;

const Loading = styled.div`
  color: #efe9f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

  svg {
    color: #efe9f4;
    margin-left: 12.5px;
    animation: ${spinnerAnimation} 1.5s linear infinite;
  }
`;

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }

  h1 {
    font-size: 30px;
    color: #0d2636;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  & + li {
    margin-top: 12px;
  }

  li {
    display: flex;
    padding: 15px 10px;

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #0d2636;
    }

    div {
      flex: 1;
      margin-left: 12px;

      p {
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }

    a {
      text-decoration: none;
      color: #222;
      transform: 0.3s;
    }
    strong {
      font-size: 15px;
      a {
        text-decoration: none;
        color: #222;
        transform: 0.3s;

        &:hover {
          color: #0071db;
        }
      }

      span {
        background-color: #222;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        padding: 4px 7px;
        margin-left: 10px;
      }
    }
  }
`;

const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;

  button {
    outline: 0;
    border: 0;
    background: #222;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

const FilterList = styled.div`
  margin-top: 20px;
  button {
    outline: 0;
    border: 0;

    background: #222;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;

    & + button {
      margin-left: 10px;
    }

    &:hover {
      background: rgba(34, 34, 34, 0.9);
    }

    &[filterselected="1"] {
      background: rgba(34, 34, 34, 0.8);
    }

    &:nth-child(${props => props.active + 1}) {
      background: #0071db;
      color: #fff;
    }
  }
`;

export {
  Container,
  Owner,
  Loading,
  BackButton,
  IssuesList,
  PageActions,
  FilterList,
};
