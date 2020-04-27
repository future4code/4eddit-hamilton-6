import React, { Component } from "react";
import styled from 'styled-components'
import logo from '../../img/logo.png'
import { push, goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import { routes } from '../Router'
import Fab from '@material-ui/core/Fab';


class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <ImgContainer>
            <Img src={logo}
            onClick={this.props.goToLoginPage}
            />
        </ImgContainer>
        <ButtonWrapper>
        <SignIn
        // onClick={this.props.goToApplicationPage}
        >Sign In
        </SignIn>
        {/* {isLogged ?                 
        <Fab variant = "extended" size="small" color="primary" aria-label="add"
        onClick={this.toLogout}
        >
        Logout
        </Fab> : <span/>} */}
        </ButtonWrapper>
      </HeaderWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        goToLoginPage: () => dispatch(push(routes.root)),
        // toLogin: (email, password) => dispatch(toLogin(email, password)),
    }
  }
  

  export default connect (null, mapDispatchToProps) (Header);


const HeaderWrapper = styled.div`
width:100%;
min-height: 40px;
display: flex;
justify-content: space-around;
align-items: center;
box-shadow: 0 0.1vw 1vw;
background: rgb(217, 217, 217);
background: linear-gradient(
90deg,
#ffffff 30%,
#D9D9D9 50%,
#ffffff 70%
);
`

const ImgContainer = styled.div`
  height: auto;
  padding-top: 4px;
`

const Img = styled.img`
  width: 100px;
  cursor: pointer;
`
const SignIn = styled.div`
  text-align: center;
  font-size: 16px;
  color: #EC7D62;
  font-weight: 700;
  height: 70%;
  cursor: pointer;
  `

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #EC7D62;
  font-weight: 700;
  height: 70%;
  width: 100px;
  cursor: pointer;
  `

