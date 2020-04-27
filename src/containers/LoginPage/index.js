import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { routes } from "../Router";

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
            label="Senha"
            // value={password}
          />
          <TextField
            // onChange={this.handleFieldChange}
            name="userName"
            type="userName"
            label="Nome de Usuário"
            // value={username}
          />
          <Button
          onClick={this.props.goToFeedPage}
          >Login</Button>
          <Button type="submit">Cadastrar</Button>
        </LoginWrapper>
        <PostListWrapper>
          
        </PostListWrapper>

      </LoginPageWrapper>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    goToFeedPage: () => dispatch(push(routes.feedPage))
  }
}

export default connect (null, mapDispatchToProps) (LoginPage);

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

const PostListWrapper = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

