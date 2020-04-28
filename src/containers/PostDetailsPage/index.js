import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { routes } from "../Router";
import {getPostDetails, postComment} from '../../actions/postDetails'
import {getAllPosts} from '../../actions/post'

const postIdStorage = "0tPTBygOm8sCxtcGVxtB" //localStorage.getItem("postId")

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
    if (token === null) {
      console.log("token null")
      this.props.goToLoginPage();
    }
    this.getPostDetails("0tPTBygOm8sCxtcGVxtB")
    this.getAllPosts()
  }


  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getPostDetails = (postId) => {
    const setPostDetails = this.props.getPostDetails(postId)

    this.setState({postDetails: setPostDetails})
    console.log(this.state.postDetails)
  }

  getAllPosts = () => {
    const setAllPosts = this.props.getAllPosts()

    this.setState({posts: setAllPosts})
    console.log(this.state.posts)
  }

  toPostComment = () => {
    const postId = "0tPTBygOm8sCxtcGVxtB"

    this.props.postComment(this.state.text, postId)
  }

  render() {
    const { text } = this.state
    const { postDetails } = this.props

    return (
      <LoginPageWrapper>
        <CommentWrapper>
          <Post>
            <h4>{postDetails.username}</h4>
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
            onClick={this.toPostComment}
          >Enviar Comentário
          </Button>
          <CommentsList>
            <h4><u>Comentários</u></h4>
            {postDetails.comments ? postDetails.comments.reverse() .map(comment => (
              <Comment>
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
  postDetails: state.posts.postDetails
});

const mapDispatchToProps = (dispatch) => {
  return{
    goToFeedPage: () => dispatch(push(routes.feedPage)),
    goToLoginPage: () => dispatch(push(routes.root)),
    getPostDetails: (postId) => dispatch(getPostDetails(postId)),
    getAllPosts: () => dispatch(getAllPosts()),
    postComment:(comment, postId) => dispatch(postComment(comment, postId))
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