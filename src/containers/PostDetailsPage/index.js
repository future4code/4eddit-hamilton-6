import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { routes } from "../Router";
import {getPostDetails, postComment} from '../../actions/postDetails'
import { getAllPosts } from "../../actions/post";
import Logo from "../../img/logo.png";
//COMPONENTES DA ESTILIZAÇÂO DO CARD
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UnLike from "../../img/outline_thumb_up_black_18dp.png";
import Like from "../../img/baseline_thumb_up_black_18dp.png";



class PostDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      posts: [],
      postDetails:{},
      isLiked: true,
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

  handleOnClickReaction = () => {
        
    //this.props.setSelectedPostId(reaction, postId);
    this.setState({ isLiked: !this.state.isLiked})
  }


  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 345,
      },      
      avatar: {
        backgroundColor: green[500],
      },
    }));

    const theme = createMuiTheme({
      overrides: {
        // Style sheet name ⚛️
        MuiCard: {
          // Name of the rule
          margin: {
            // Some CSS
            margin: "30px",
          },
        },
      },
    });

    const {isLiked} = this.state
    const { text } = this.state
    const { postDetails } = this.props

    return (
      <LoginPageWrapper>
        <CommentWrapper>
          
            <Card className={useStyles.root} key={postDetails.id}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={useStyles.avatar}></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={postDetails.username}  
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {postDetails.text} 
                </Typography>
              </CardContent>              
            </Card>
          


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
            {postDetails.comments ? postDetails.comments.map(comment =>(
              <Card 
                className={useStyles.root} 
                key={comment.id}
                theme={theme}
              >
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={useStyles.avatar}></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={comment.username}   
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {comment.text} 
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing >
                    {isLiked ?
                      <IconButton 
                        aria-label="DisLiked"
                        onClick={this.handleOnClickReaction}  
                      >
                        <img src={UnLike}/>
                        <Typography>(numero de curtidas)</Typography> 
                      </IconButton>
                      :
                      <IconButton 
                        aria-label="Liked"
                        onClick={this.handleOnClickReaction}
                      >
                        <img src={Like}/>
                        <Typography>(numero de curtidas)</Typography>  
                      </IconButton> 
                    }                  
                  </CardActions>
                </Card>
               
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