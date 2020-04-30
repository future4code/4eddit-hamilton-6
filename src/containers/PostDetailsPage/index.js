import React, { Component } from "react";
import { connect } from "react-redux";
import { push, goBack } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { routes } from "../Router";
import {getPostDetails, postComment} from '../../actions/postDetails'
import { getAllPosts } from "../../actions/post";
import CommentsList from '../CommentsList/CommentList'


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
    this.props.postComment(this.state.text, this.props.postDetails.id)
    this.props.getPostDetails(this.props.postDetails.id)
    this.setState({text: ""})
  }

  render() {
    const { text } = this.state
    const { postDetails, goBack } = this.props



    return (
      <PostDetailsPageWrapper>
        <GoBackContainer>
        <Button
          color="primary"
          onClick={goBack}
          >Voltar ao Feed
        </Button>
        </GoBackContainer>
        <CommentWrapper>
          <Post>
            <h4>{postDetails.username}</h4>
            <p>{postDetails.text}</p>
          </Post>
          <InputWrapper>
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
            color="secondary"
            onClick={this.toPostComment}
          >Enviar Comentário
          </Button>
          </InputWrapper>
          <CommentsList/>
        </CommentWrapper>
      </PostDetailsPageWrapper>
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
    goBack: () => dispatch(goBack()),
    getPostDetails: (postId) => dispatch(getPostDetails(postId)),
    postComment:(comment, postId) => dispatch(postComment(comment, postId)),
    getAllPosts: () => dispatch(getAllPosts()),
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (PostDetailsPage);

const PostDetailsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  min-height: 75vh;
`

const GoBackContainer = styled.div`
  width: 60%;
  padding: 1vw 3vw 0 3vw;
  display: flex;
  justify-content: flex-start;
`


const CommentWrapper = styled.div`
  background-color: #F8E1D2;
  width: 60%;
  height: auto;
  min-height: 68vh;
  min-width: 250px;
  box-shadow: 0.1vw 0.2vw 1vw;
  border-radius: 2vw;
  padding: 3vw;
  margin: 2vw 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const InputWrapper = styled.div`
  background-color: white;
  box-shadow: 0.1vw 0.1vw 0.5vw;
  padding: 0.5vw 3vw;
  border-radius: 0.5vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const Post = styled.div`
  background-color: white;
  width: 100%;
  height: auto;
  min-height: 10vw;
  padding: 1vw 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 0 0.3px 0.3vw;
  border-radius: 1vw;
  margin-bottom: 1vw;
`

