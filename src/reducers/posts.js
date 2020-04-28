const initialState = {
    allPosts: [],
    selectedPostId: "",
    PostDetails: {},
}
//RESPOSTA DA API
// "posts": [
//     {
//       "votesCount": 1,
//       "userVoteDirection": 1,
//       "commentsCount": 2,
//       "id": "XFM8JtoESiWKqCml3Rjz",
//       "username": "darvas",
//       "text": "Oi gente! Bem vindos ao 4eddit :)"
//     }
//   ]

const posts = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_ALL_POSTS':
            const postList = action.payload.allPosts;
            return {allPosts: postList, ...state};
        case 'SET_POST_DETAILS':
            const postDetails = action.payload.postDetails;
            return {...state, postDetails: postDetails}
        default:
            return state;
    }
}


export default posts;