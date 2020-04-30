import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router";
import { createPost } from "../../actions/post";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Post from "../../components/Post";
import Button from "@material-ui/core/Button";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
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
 
  handleCreatePost = () => {
    this.props.createPost(this.state.text, this.state.text);
    this.setState({text: ""});
    this.setState({title: ""});
    
  }

  render() {
    const { text } = this.state

    const theme = createMuiTheme({
      overrides: {
        MuiTextField: {
          root: {
            margin: "2vw 0 1vw 0",
            padding: '1vw',
            boxShadow: "0.1vw 0.1vw 0.5vw",
            color: '#F4A384',
          },
        },
      },
    });
    
    return (
      <FeedPageWrapper>
          <PostWrapper>
            {/* <TextField
              onChange={this.handleFieldChange}
              name="newTitleText"
              type="text"
              label="Título"
              value={title}
              multiline
              rowsMax={2}
            /> */}
            <ThemeProvider theme={theme}>
            <TextField
              onChange={this.handleFieldChange}
              name="text"
              type="text"
              label="O que você está pensando?"
              value={text}
              multiline
              rowsMax={10}
            />
            </ThemeProvider>
            <Button 
            color="primary" 
            size="medium" 
            onClick={this.handleCreatePost}
            >Postar
            </Button>
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



