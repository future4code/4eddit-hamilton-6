import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getPostDetails } from "../actions/postDetails";
import { getAllPosts, getPostVotes } from "../actions/post";
import { routes } from "../containers/Router";
//COMPONENTES DA ESTILIZAÇÂO DO CARD
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Logo from "../img/logo.png";
//ICONES DO LOGO
import UnLike from "../img/outline_thumb_down_black_18dp.png";
import Like from "../img/outline_thumb_up_black_18dp.png";
import Comment from "../img/baseline_comment_black_18dp.png";

import UpVote from "@material-ui/icons/ThumbUp";
import UpVoteOutlined from "@material-ui/icons/ThumbUpOutlined";
import DownVote from "@material-ui/icons/ThumbDown";
import DownVoteOutlined from "@material-ui/icons/ThumbDownOutlined";


class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
      
     
    };
  }
  
  componentDidMount(){
    const token = window.localStorage.getItem("token")
    if (token === null) {
      this.props.goToLoginPage()
    }

    this.props.getAllPosts()
  }

  handleOnClickPostDetails = (postId) => {
    console.log(postId)
    this.props.getPostDetails(postId);
    localStorage.setItem('postId', postId)
    this.props.goToPostDetailsPage();
  }

  handleOnClickReaction = (postId) => {
    console.log("ID DO POST: ", postId) //APAGAR NO FINAL DO PROJETO
    this.setState({ isLiked: !this.state.isLiked})
    this.props.getPostDetails(postId);
    localStorage.setItem('postId', postId)
   
  }

  clickVote = (post,direction) => {
    if(post.userVoteDirection === direction) {
      this.props.getPostVote(post, 0);
    } else {
    this.props.getPostVote(post, direction);
    console.log(post.id)
  }}

  
  render(){

    const theme = createMuiTheme({
      overrides: {
        MuiCard: {
          root: {
            margin: "2vw 0",
            boxShadow: "0.1vw -0.1vw 0.5vw",
          },
        },
        MuiCardContent: {
          root:{
            cursor: "pointer",
          }
        }
      },
    });

      
    return(
      <div>
        {this.props.allPosts
        .sort((a, b) => b.votesCount - a.votesCount)
        .map((post) => (
          <ThemeProvider theme={theme}>         
          <Card
          key={post.id}>

              <CardHeader
                avatar={
                <Avatar aria-label="recipe"></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.username}   
              />

              {/* <CardMedia
                className={useStyles.media}
              >
              <img src={Logo}/>
              </CardMedia> */}

              <CardContent 
              onClick={ () => this.handleOnClickPostDetails(post.id)} 
              >
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.text}
                </Typography>
              </CardContent>



              <CardActions disableSpacing>                
                  
                    <IconButton 
                      aria-label="DisLiked Post"                    
                      onClickDownVote = {() => this.clickVote(post.id,-1)}
                      DownVote={
                        post.userVoteDirection < 0 ? (
                          <DownVote />
                        ) : (
                          <DownVoteOutlined />
                        )
                      }
                    >
                      <UpVote/>                   
                    </IconButton>                  
                    <IconButton 
                      aria-label="Liked Post"
                      onClickUpVote = {() => this.clickVote(post.id,1)}
                      upVote={
                        post.userVoteDirection > 0 ? <UpVote /> : <UpVoteOutlined />
                      }
                    >
                      <DownVote/>                                                     
                    </IconButton>
                    

              <CardActions disableSpacing>
                
                <IconButton 
                  aria-label="DisLiked Post"
                  onClick={() => this.handleOnClickReaction (post.id)}  
                >
                  <img src={Like}/>
                </IconButton>                 
                <IconButton 
                  aria-label="Liked Post"
                  onClick={() => this.handleOnClickReaction (post.id)}  
                >
                  <img src={UnLike}/>                              
                </IconButton>

                <Typography>{post.votesCount}</Typography> 
                <Typography>Likes</Typography>
                <IconButton 
                  aria-label="Comments"
                  onClick={() => this.handleOnClickPostDetails(post.id)} 
                >
                  <img src={Comment} />                   
                </IconButton>
                <Typography>{post.commentsCount}</Typography>
                <Typography>Comentários</Typography>
              </CardActions>
            </Card>
            </ThemeProvider>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allPosts: state.posts.allPosts,  
});

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts()),
  goToPostDetailsPage: () => dispatch(push(routes.postDetails)),
  getPostVotes: ( postId, direction) => dispatch(getPostVotes(postId, direction)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post)