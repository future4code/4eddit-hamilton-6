const initialState = {
    allPosts: [],
    selectedPostId: "",
    postDetails: {},
    like: 0,
    disLike: 0,
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
    console.log(action.payload)
    switch(action.type) {
        case 'SET_ALL_POSTS':
            const postList = action.payload.allPosts;
            return {...state, allPosts: postList};
        case 'SET_POST_DETAILS':
            const postDetails = action.payload.postDetails;
            return {...state, postDetails: postDetails};
        case 'SET_SELECTED_POST':
            const postId = action.payload.selectedPostId;
            return {...state, selectedPostId: postId};
        default:
            return state;
    }
}


export default posts;