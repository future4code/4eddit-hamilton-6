import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router";
import { createPost } from "../../actions/post";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Post from "../../components/Post";
import Button from "@material-ui/core/Button";

class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    };
  }

  componentDidMount(){
    const token = window.localStorage.getItem("token")
  }

  
  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
 
  handleOnClickCreatePost = () => {
    const {title,text} = this.state;
    this.props.createPost(title,text);
    this.setState({text: ""});
    this.setState({title: ""});
    
  }

  render() {
    const { title , text} = this.state
    
    return (
      <FeedPageWrapper>
          <PostWrapper>
            <TextField
              onChange={this.handleFieldChange}
              name="title"
              type="text"
              label="Título"
              value={title}
              multiline
              rowsMax={2}
            />
            <TextField
              onChange={this.handleFieldChange}
              name="text"
              type="text"
              label="O que você está pensando?"
              value={text}
              multiline
              rowsMax={10}
            />
            <Button color="primary" size="mediun" onClick={this.handleOnClickCreatePost}>Postar</Button>
          </PostWrapper>

          <PostList>
            <Post/>
          </PostList>

      </FeedPageWrapper>
    );
  }
  }


  const mapStateToProps = state => ({
    allPosts: state.allPosts
  });

  const mapDispatchToProps = (dispatch) => {
    return{
      goToLoginPage: () => dispatch(push(routes.root)),
      goToPostDetailsPage: () => dispatch(push(routes.postDetails)),
      createPost: (text,title) => dispatch(createPost(text,title)),
      
    }
  }

export default connect (mapStateToProps, mapDispatchToProps) (FeedPage);


const FeedPageWrapper = styled.div`
  gap: 10px;
  place-content: start center;
  display: grid;
  width: 100%;
  height: auto;
  min-height: 75vh;
`
const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 40vw;
  min-width: 250px;
  height: auto;
`

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 40vw;
  min-width: 250px;
  height: auto;
`



