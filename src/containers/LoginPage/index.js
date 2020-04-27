import React, { Component } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class LoginPage extends Component {
  render() {
    return (
      <LoginPageWrapper>
        <LoginWrapper onSubmit={this.toLogin}>
          <TextField
            // onChange={this.handleFieldChange}
            name="email"
            type="email"
            label="E-mail"
            // value={email}
          />
          <TextField
            // onChange={this.handleFieldChange}
            name="password"
            type="password"
            label="Password"
            // value={password}
          />
          <TextField
            // onChange={this.handleFieldChange}
            name="userName"
            type="userName"
            label="userName"
            // value={username}
          />
          <Button type="submit">Login</Button>
          <Button type="submit">Cadastrar</Button>
        </LoginWrapper>
      </LoginPageWrapper>
    );
  }
}

export default LoginPage;


const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 75vh;
`

const LoginWrapper = styled.form`
  width: 100%;
  height: 100%;
  gap: 10px;
  place-content: center center;
  display: grid;
`

