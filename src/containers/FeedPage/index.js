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
    if (token === null) {
      this.props.goToLoginPage();
    }
    // this.getPostDetails()
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
            padding: '2vw 1vw',
            boxShadow: "0.1vw 0.1vw 0.5vw",
            color: '#F4A384',
            borderRadius: '4px',
          },
        },
      },
    });
    
    return (
      <FeedPageWrapper>
          <PostWrapper>
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
            color="secondary" 
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
      createPost: (text, tittle) => dispatch(createPost(text, tittle)),
      goToLoginPage: () => dispatch(push(routes.root)),
      goToPostDetailsPage: () => dispatch(push(routes.postDetails)),
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



