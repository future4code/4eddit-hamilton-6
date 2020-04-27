import React, { Component } from "react";
import styled from "styled-components";



export default class Post extends Component {

  render() {
    return (
      <PostWrapper>
          <UserName>
            Nome Muito Louco
          </UserName>

          <PostText>
            <span>Esse é um teste</span>
          </PostText>

          <ReactionsWrapper>
              <p>LIKE / DISLIKE</p>
              <p>Comentários</p>
          </ReactionsWrapper>

      </PostWrapper>
    );
  }
}



const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  min-width: 250px;
  height: auto;
  margin: 3vw 0;
  border: 1px black solid;
`
const UserName = styled.p`
font-size: 15px;
font-weight: 700;
width: 100%;
height: 22px;
`

const PostText = styled.div`
width: 100%;
height: auto;
min-height: 164px;
border: 1px black solid;
`

const ReactionsWrapper = styled.div`
display: flex;
font-size: 15px;
width: 100%;
height: 40px;
`