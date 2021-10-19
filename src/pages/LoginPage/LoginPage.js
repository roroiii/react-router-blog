import React, { useState, useContext } from "react";
import styled from "styled-components";
import { login, getMe } from "../../api/WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
import { useHistory, Link } from "react-router-dom";

const Banner = styled.div`
  position: relative;
  background-image: url("https://picsum.photos/id/1015/1200");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 350px;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
  text-align: center;
`;

const Content = styled.form`
  width: 600px;
  margin: 80px auto 0;
  line-height: 1.5;
  font-size: 18px;
  color: #5d5d5d;
  background-color: #faf7f3;

  @media all and (max-width: 600px) {
    width: 100%;
  }
`;

const LoginContent = styled.form`
  width: 600px;
  margin: 0 auto 120px;
  line-height: 1.5;
  font-size: 18px;
  color: #5d5d5d;
  background-color: #faf7f3;
  padding: 40px 20px 20px;
  p {
    margin: 6px;
  }

  @media all and (max-width: 600px) {
    width: 100%;
  }
`;

const LoginText = styled.h3`
  margin-bottom: 16px;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 0;
  margin-bottom: 32px;
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: #f35f70;
  border: 0;
  color: #ffffff;
  padding: 16px 0;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
`;

const LoginRegisterTab = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LoginTab = styled(Link)`
  display: block;
  text-decoration: none;
  color: #5d5d5d;
  width: 50%;
  padding: 20px;
  text-align: center;
`;
const RegisterTab = styled(LoginTab)`
  background-color: #e8e8e6;
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push("/");
      });
    });
  };

  return (
    <>
      <Banner>
        <Title>LOGIN</Title>
      </Banner>
      <Content>
        <LoginRegisterTab>
          <LoginTab to="/login">LOGIN</LoginTab>
          <RegisterTab to="/register">REGISTER</RegisterTab>
        </LoginRegisterTab>
      </Content>
      <LoginContent onSubmit={handleSubmit}>
        <LoginText>Username</LoginText>
        <LoginInput
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginText>Password</LoginText>
        <LoginInput
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton>LOGIN</LoginButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </LoginContent>
    </>
  );
}
