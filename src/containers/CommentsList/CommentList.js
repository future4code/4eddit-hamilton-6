import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import UnLike from "../../img/outline_thumb_up_black_18dp.png";
import Like from "../../img/baseline_thumb_up_black_18dp.png";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';




const CommentsListWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 10vw;
  padding: 3vw;
`

// const Comment = styled.div`
//   background-color: white;
//   width: 100%;
//   height: auto;
//   min-height: 2vw;
//   padding: 1vw 1vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   box-shadow: 0.1vw -0.1vw 0.1vw;
//   border-radius: 1vw;
//   margin-bottom: 1vw;
// `

class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      posts: [],
      postDetails:{},
      isLiked: true,
    };
  }

  handleOnClickReaction = () => {
        
    //this.props.setSelectedPostId(reaction, postId);
    this.setState({ isLiked: !this.state.isLiked})
  }


  render() {
    const { postDetails } = this.props

    const {isLiked} = this.state



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
        MuiCard: {
          root: {
            margin: "2vw",
            boxShadow: "0.1vw -0.1vw 0.1vw",
          },
        },
      },
    });


    return (
          <CommentsListWrapper>
            {postDetails.comments ? postDetails.comments
            .sort((a, b) => a.votesCount - b.votesCount)
            .map(comment =>(
            <ThemeProvider theme={theme}>
              <Card 
                // className={useStyles.root} 
                key={comment.id}
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
                </ThemeProvider>
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



