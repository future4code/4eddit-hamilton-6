import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getPostDetails } from "../actions/postDetails";
import { getAllPosts, setSelectedPostId, getPostVotes } from "../actions/post";
import { routes } from "../containers/Router";
//COMPONENTES DA ESTILIZAÇÂO DO CARD
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Logo from "../img/logo.png";
import UnLike from "../img/outline_thumb_up_black_18dp.png";
import Like from "../img/baseline_thumb_up_black_18dp.png";
import Comment from "../img/baseline_comment_black_18dp.png";


class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLiked: true,
     
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

  handleOnClickReaction = (reaction, postId) => {
    console.log("O POST FOI CURTIDO") //APAGAR NO FINAL DO PROJETO
    
    this.props.setSelectedPostId(reaction, postId);
    this.setState({ isLiked: !this.state.isLiked})
  }
  
  render(){
    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 345,
        margin: 30,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      avatar: {
        backgroundColor: green[500],
      },
    }));

    const {isLiked} = this.state
  
    return(
      <div>
        {this.props.allPosts
        .sort((a, b) => b.votesCount - a.votesCount)
        .map((post) => (
          <Card className={useStyles.root} key={post.id}>

              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={useStyles.avatar}></Avatar>
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
                {isLiked ?
                <IconButton 
                  aria-label="DisLiked Post"
                  onClick={() => this.handleOnClickReaction (-1, post.id)}  
                >
                  <img src={UnLike}/>
                  <Typography>{post.votesCount}</Typography> 
                </IconButton> //NÃO PREENCHIDO
                :
                <IconButton 
                  aria-label="Liked Post"
                  onClick={() => this.handleOnClickReaction (1, post.id)}  
                >
                  <img src={Like}/>
                  <Typography>{post.votesCount}</Typography> 
                </IconButton> //PREENCHIDO
                }
                <IconButton 
                  aria-label="Comments"
                  onClick={() => this.handleOnClickPostDetails(post.id)} 
                >
                  <img src={Comment} />
                  <Typography>{post.commentsCount}</Typography> 
                </IconButton>
              </CardActions>


            </Card>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allPosts: state.posts.allPosts,
  //like: state.posts.like,
  //disLike: state.posts.disLike,
});

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts()),
  goToPostDetailsPage: () => dispatch(push(routes.postDetails)),
  //increment: () => dispatch({type: 'INCREMENT'}),
  //decrement: () => dispatch({type: 'DECREMENT'}),
  setSelectedPostId: (post) => dispatch(setSelectedPostId(post)),
  getPostVotes: (reaction, postId) => dispatch(getPostVotes(reaction, postId)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post)

