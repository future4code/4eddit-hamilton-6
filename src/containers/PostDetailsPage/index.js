import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { routes } from "../Router";

class PostDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  
  componentDidMount(){
    const token = window.localStorage.getItem("token")
    if (token === null) {
      console.log("token null")
      this.props.goToLoginPage();
    }    
  }


  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  render() {
    const { text } = this.state
    const { goToFeedPage } = this.props

    return (
      <LoginPageWrapper>
        <CommentWrapper>
          <Post>
            <h4>TESTE</h4>
            <p>TESTE</p>
          </Post>
          <TextField
            onChange={this.handleFieldChange}
            name="text"
            type="text"
            label="Comentário"
            value={text}
            multiline
            rowsMax={10}
          />
          <Button 
            onClick={goToFeedPage}
            >Enviar Comentário
          </Button>
        </CommentWrapper>
      </LoginPageWrapper>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    goToFeedPage: () => dispatch(push(routes.feedPage)),
    goToLoginPage: () => dispatch(push(routes.root)),

  }
}

export default connect (null, mapDispatchToProps) (PostDetailsPage);

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  min-height: 75vh;
`

const CommentWrapper = styled.div`
  width: 60%;
  height: auto;
  min-height: 68vh;
  min-width: 250px;
  box-shadow: 0.1vw 0.1vw 1vw;
  border-radius: 2vw;
  padding: 3vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
`

const Post = styled.div`
  width: 100%;
  height: auto;
  min-height: 10vw;
  box-shadow: 0 0.3px 0.2vw;

`