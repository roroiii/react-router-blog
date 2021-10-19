import React, { useState } from "react";
import styled from "styled-components";
import { register } from "../../api/WebAPI";

import { Link } from "react-router-dom";

const Banner = styled.div`
  position: relative;
  background-image: url("https://picsum.photos/id/174/1200");
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

const RegisterContent = styled.form`
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

const RegisterText = styled.h3`
  margin-bottom: 16px;
`;

const RegisterInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 0;
  margin-bottom: 32px;
`;

const RegisterButton = styled.button`
  width: 100%;
  background-color: #f35f70;
  border: 0;
  color: #ffffff;
  padding: 16px 0;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
`;

const SuccessMessage = styled.p`
  color: #1b9e1b;
`;

const LoginRegisterTab = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RegisterTab = styled(Link)`
  display: block;
  text-decoration: none;
  color: #5d5d5d;
  width: 50%;
  padding: 20px;
  text-align: center;
`;
const LoginTab = styled(RegisterTab)`
  background-color: #e8e8e6;
`;

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    register(nickname, username, password).then((data) => {
      if (data.ok !== 1) {
        setErrorMessage(data.message);
        setSuccessMessage(null);
      }
      if (data.ok === 1) {
        setErrorMessage(null);
        setSuccessMessage("註冊成功！請直接登入。");
      }
    });
  };

  return (
    <>
      <Banner>
        <Title>Register</Title>
      </Banner>
      <Content>
        <LoginRegisterTab>
          <LoginTab to="/login">LOGIN</LoginTab>
          <RegisterTab to="/register">REGISTER</RegisterTab>
        </LoginRegisterTab>
      </Content>
      <RegisterContent onSubmit={handleSubmit}>
        <RegisterText>Nickname</RegisterText>
        <RegisterInput
          value={nickname}
          placeholder="nickname"
          onChange={(e) => setNickname(e.target.value)}
        />
        <RegisterText>Username</RegisterText>
        <RegisterInput
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <RegisterText>Password</RegisterText>
        <RegisterInput
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <RegisterButton>Register</RegisterButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </RegisterContent>
    </>
  );
}
