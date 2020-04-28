import React, { Component } from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import { green } from '@material-ui/core/colors';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Logo from "../img/logo.png";
// import UnLike from "../img/unlike.png";
// import Like from "../img/baseline_thumb_up_black_18dp.png";

import { connect } from "react-redux";
import { push } from "connected-react-router";
//import { routes } from "../Router/index";
import { getAllPosts } from "../actions/post";




class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }

  componentDidMount(){
    const token = window.localStorage.getItem("token")
    if (token === null) {
      //this.props.goToLoginPage()
    }

    this.props.getAllPosts()
  }

  render(){
    return(
      <div>
        {this.props.allPosts.map((post) => (
          <div>
            <span>User Name: </span><span>{post.username}</span>
            <br/>
            <span>Text: </span><span>{post.text}</span>
            <br/>
            <span>votesCount: </span><span>{post.votesCount}</span>
            <br/>
            <span>userVoteDirection: </span><span>{post.userVoteDirection}</span>
            <br/>
            <span>commentsCount: </span><span>{post.commentsCount}</span>
          </div>
        ))}
      </div>
    );
  }

  // useStyles = makeStyles((theme) => ({
  //   root: {
  //     maxWidth: 345,
  //   },
  //   media: {
  //     height: 0,
  //     paddingTop: '56.25%', // 16:9
  //   },
  //   expand: {
  //     transform: 'rotate(0deg)',
  //     marginLeft: 'auto',
  //     transition: theme.transitions.create('transform', {
  //       duration: theme.transitions.duration.shortest,
  //     }),
  //   },
  //   expandOpen: {
  //     transform: 'rotate(180deg)',
  //   },
  //   avatar: {
  //     backgroundColor: green[500],
  //   },
  // }));
  

  // const classes = useStyles();
  // const [expanded, setExpanded] = React.useState(false);

  // handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  
  //   return (
  //     <div>
  //     <Card className={classes.root}>
  //     <CardHeader
  //       avatar={
  //         <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
  //       }
  //       action={
  //         <IconButton aria-label="settings">
  //           <MoreVertIcon />
  //         </IconButton>
  //       }
  //       title="Nome do Usuário"   
  //       subheader="Título do post"     
  //     />
  //     <CardMedia
  //       className={classes.media}
  //       image={Logo}
  //     />
  //     <CardContent>
  //       <Typography variant="body2" color="textSecondary" component="p">
  //         Colocar o texto do post.
  //       </Typography>
  //     </CardContent>
  //     <CardActions disableSpacing>
  //       <IconButton aria-label="Like Post">
  //         <img src={Like}/>
  //         <Typography>5 </Typography> 
  //       </IconButton>
  //       <IconButton aria-label="">
  //         <img src={UnLike}/>
  //         <Typography>3</Typography> 
  //       </IconButton>
  //       <IconButton
  //         className={clsx(classes.expand, {
  //           [classes.expandOpen]: expanded,
  //         })}
  //         onClick={handleExpandClick}
  //         aria-expanded={expanded}
  //         aria-label="show more"
  //       >
  //         <ExpandMoreIcon />
  //       </IconButton>
  //     </CardActions>
  //     <Collapse in={expanded} timeout="auto" unmountOnExit>
  //       <CardContent>
  //         <Typography>
  //           COLOCAR OS COMENTÀRIOS
  //         </Typography>
  //       </CardContent>
  //     </Collapse>
  //   </Card>
  //     </div>
  //   );
  
}

const mapStateToProps = state => ({
  allPosts: state.posts.allPosts
});

const mapDispatchToProps = dispatch => ({
  //goToHome: () => dispatch(push(routes.root)),
  getAllPosts: () => dispatch(getAllPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post)