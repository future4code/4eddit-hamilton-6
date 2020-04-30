import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { routes } from "../Router";
import {toLogin, toSignUp} from '../../actions/login'
import Logo from '../../img/logo.png'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username:""
    };
  }


  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toSignUp = event => {
    event.preventDefault()

    this.props.toSignUp(this.state.email, this.state.password, this.state.username)
    this.setState({email: "", password: "", username: ""})
  }
  
  toLogin = event => {
    event.preventDefault()

    this.props.toLogin(this.state.email, this.state.password)
    this.setState({email: "", password: "", username: ""})
  }


  render() {
    const {email, password, username, goToFeedPage} = this.props
    const isLoged = localStorage.getItem("token") !== null

    return (
      <LoginPageWrapper>
        {isLoged ?
        <LoginWrapper>
        <Img src={Logo}/>
        <Button 
        onClick={goToFeedPage}
        >Explore seu Feed!
        </Button>
        </LoginWrapper>
        :
        <LoginWrapper onSubmit={this.toLogin}>
          <TextField
            onChange={this.handleFieldChange}
            name="email"
            type="email"
            label="E-mail"
            value={email}
            inputProps={{
              pattern: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
            }}
          />
          <TextField
            onChange={this.handleFieldChange}
            name="password"
            type="password"
            label="Senha"
            value={password}
          />
          <TextField
            onChange={this.handleFieldChange}
            name="username"
            type="text"
            label="Nome de Usuário"
            value={username}
          />
          <Button
          type="submit"
          >Login
          </Button>
          <Button
          onClick={this.toSignUp} 
          >Cadastrar
          </Button>
        </LoginWrapper>
        }
      </LoginPageWrapper>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    toSignUp: (email, password, username) => dispatch(toSignUp(email, password, username)),
    toLogin: (email, password) => dispatch(toLogin(email, password)),
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

const Img = styled.img`
  width: 17vw;
  min-width: 250px;
  box-shadow: 0.5vw 0.5vw 1vw;
  border-radius: 2vw;
  margin: 5vw 0 4vw 0;
`

