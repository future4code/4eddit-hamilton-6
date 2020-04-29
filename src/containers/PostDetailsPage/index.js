import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { routes } from "../Router";
import {getPostDetails, postComment} from '../../actions/postDetails'
import { getAllPosts } from "../../actions/post";


class PostDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      posts: [],
      postDetails:{}
    };
  }

  
  
  componentDidMount(){
    const token = window.localStorage.getItem("token")
    console.log(this.props.postDetails)
    if (token === null) {
      this.props.goToLoginPage();
    }
    this.getPostDetails()
  }


  handleFieldChange = event => {

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getPostDetails = () => {
    const postId = localStorage.getItem('postId')
    this.props.getPostDetails(postId)
  }


  toPostComment = () => {
    this.props.getAllPosts()
    console.log(this.props.postDetails.id, this.state.text)
    this.props.postComment(this.state.text, this.props.postDetails.id)
  }

  render() {
    const { text } = this.state
    const { postDetails } = this.props

    return (
      <LoginPageWrapper>
        <CommentWrapper>
          <Post>
            <h4>{postDetails.username}</h4>
            <p>{postDetails.text}</p>
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
            onClick={this.toPostComment}
          >Enviar Comentário
          </Button>
          <CommentsList>
            <h4><u>Comentários</u></h4>
            {postDetails.comments ? postDetails.comments.map(comment => (
              <Comment
              key={comment.id}
              >
                <h4>{comment.username}</h4>
                <p>{comment.text}</p>
              </Comment>
            )) : <span>Carregando...</span>}
          </CommentsList>
        </CommentWrapper>
      </LoginPageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  allPosts: state.posts.allPosts,
  postDetails: state.posts.postDetails,
});

const mapDispatchToProps = (dispatch) => {
  return{
    goToFeedPage: () => dispatch(push(routes.feedPage)),
    goToLoginPage: () => dispatch(push(routes.root)),
    getPostDetails: (postId) => dispatch(getPostDetails(postId)),
    postComment:(comment, postId) => dispatch(postComment(comment, postId)),
    getAllPosts: () => dispatch(getAllPosts()),
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostDetailsPage);

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
  margin: 2vw 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
`

const Post = styled.div`
  width: 100%;
  height: auto;
  min-height: 10vw;
  padding: 1vw 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 0 0.3px 0.2vw;
  border-radius: 1vw;
  margin-bottom: 1vw;
`

const CommentsList = styled.div`
  width: 100%;
  height: auto;
  min-height: 10vw;
  padding: 3vw;
`

const Comment = styled.div`
  width: 100%;
  height: auto;
  min-height: 2vw;
  padding: 1vw 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 1px black solid;
  border-radius: 1vw;
  margin-bottom: 1vw;
`