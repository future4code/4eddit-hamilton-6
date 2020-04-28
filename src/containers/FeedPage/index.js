import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router";
import { getAllPosts, setSelectedPostId } from "../../actions/post";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Post from "../../components/Post";
import Button from "@material-ui/core/Button";

class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    const token = window.localStorage.getItem("token")
    if (token === null) {
      console.log("token null") //APAGAR AO FINAL DO PROJETO
      //this.props.goToLoginPage();
    }    
  }

  handleOnClickPost = (postId) => {
    console.log("O post foi clicado"); //RETIRAR AO FINAL DO PROJETO
    // this.props.setSelectedPostId(postId);
    // this.props.goToPostDetailsPage();
  }

  render() {
    return (
      <FeedPageWrapper>
          <PostWrapper>
          <TextField
            // onChange={this.handleFieldChange}
            name="text"
            type="text"
            label="O que você está pensando?"
            // value={}
          />
          <Button color="primary" size="mediun" onClick={() => this.handleOnClickPost(Post.id)}>Postar</Button>
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
      goToPostDetailsPage: () => dispatch(push(routes.postDetails))
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



