import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getPostDetails } from "../actions/postDetails";
import { getAllPosts, getPostVotes } from "../actions/post";
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
import UnLike from "../img/outline_thumb_down_black_18dp.png";
import Like from "../img/outline_thumb_up_black_18dp.png";
import Comment from "../img/baseline_comment_black_18dp.png";


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

      
    return(
      <div>
        {this.props.allPosts.map((post) => (
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

