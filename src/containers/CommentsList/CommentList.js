import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";



const CommentsListWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 10vw;
  padding: 3vw;
`

const Comment = styled.div`
  background-color: white;
  width: 100%;
  height: auto;
  min-height: 2vw;
  padding: 1vw 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 0.1vw -0.1vw 0.1vw;
  border-radius: 1vw;
  margin-bottom: 1vw;
`

class CommentsList extends Component {

  render() {
    const { postDetails } = this.props

    return (
          <CommentsListWrapper>
            <h4><u>Comentários</u></h4>
            {postDetails.comments ? postDetails.comments.map(comment => (
              <Comment
              key={comment.id}
              >
                <h4>{comment.username}</h4>
                <p>{comment.text}</p>
              </Comment>
            )) : <span>Carregando...</span>}
          </CommentsListWrapper>
    );
  }
}



const mapStateToProps = state => ({
  postDetails: state.posts.postDetails,
});

const mapDispatchToProps = (dispatch) => ({

})

export default connect (mapStateToProps, mapDispatchToProps) (CommentsList);



