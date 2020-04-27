import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { routes } from "../Router";
import Post from "../../components/Post";

class FeedPage extends Component {


  render() {
    return (
      <FeedPageWrapper>
          <PostWrapper>
          <TextField
            // onChange={this.handleFieldChange}
            name="email"
            type="email"
            label="O que você está pensando?"
            // value={}
          />
          </PostWrapper>
          <PostList>
              <Post/>
          </PostList>
      </FeedPageWrapper>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
    return{
      goToLoginPage: () => dispatch(push(routes.root))
    }
  }

export default connect (null, mapDispatchToProps) (FeedPage);


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

