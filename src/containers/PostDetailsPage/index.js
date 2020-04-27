import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router";
import { getPostDetail } from "../../actions/post";
import Button from "@material-ui/core/Button";
import Header from "../Header";


class PostDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createComment: false,
      showComment: false
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem("token")
    if (token === null) {
      this.props.goToLoginPage()
    } else if (this.props.selectedPostId === "") {
      this.props.goToPostList()
    }

    this.props.getPostDetail(this.props.selectedPostId)
  }

  handleCommenty = () => {
    
  }

 
  render() {
    const { postDetails } = this.props
    return (
        <div>
            <Header/>
            <div>
                <div>
                <div>
                    <span>Usuário: </span><span>{postDetails.name}</span>
                </div>
                <div>
                    <span>Comentário: </span><span>{postDetails.text}</span>
                </div>
                <Button color="primary" onClick={() => this.handleCommenty(this.props.selectedPostId)}>Comentar</Button>
                
                { this.state.showComment && postDetails.comments.map( comment => (
                <div>
                    <div>
                    <span>Usuário: </span><p>{comment.name}</p>
                    </div>
                    <div>
                    <span>Comentário: </span><p>{comment.text}</p>
                    </div>
                </div>
                ))}
                </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedPostId: state.posts.selectedPostId,
  postDetails: state.post.postDetails,
});

const mapDispatchToProps = dispatch => ({
  goToHomePage: () => dispatch(push(routes.root)),
  goToFeedPage: () => dispatch(push(routes.feedPage)),
  getPostDetail: (postId) => dispatch(getPostDetail(postId)),
})



export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsPage);