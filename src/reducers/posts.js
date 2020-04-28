const initialState = {
    allPosts: [],
    selectedPostId: "",
    PostDetails: {},
}

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