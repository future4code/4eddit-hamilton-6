import axios from 'axios';


//FUNÇÕES SINCRONAS


export const setAllPosts = (allPosts) => ({
    type: 'SET_ALL_POSTS',
    payload: {
        allPosts,
    }
})

export const setSelectedPostId = (selectedPostId) => ({
    type: 'SET_SELECTED_POST',
    payload: {
        selectedPostId,
    }
})

export const setPostDetails = (postDetails) => ({
    type: 'SET_POST_DETAILS',
    payload: {
        postDetails,
    }
})

export const increment = (increment) => ({
    type: 'INCREMENT',
    payload: {
        increment,
    }
})

export const decrement = (decrement) => ({
    type: 'DECREMENT',
    payload: {
        decrement,
    }
})


//FUNÇÕES ASSINCRONAS

export const getAllPosts = () => async (dispatch, getState) => {
    const config = {
        headers:{
            'auth': window.localStorage.getItem("token")
        }
    }
    
    const response = await axios.get('https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts', config)

    dispatch(setAllPosts(response.data.posts))
} 



export const createPost = (text, title) => async (dispatch) => {
    const body = {
        text: text,
        title: title,
    }

    const config = {
        headers: {
            'auth': window.localStorage.getItem("token")
        }
    }

    try {
        await axios.post(`https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts`, 
        body, config)
        dispatch(getAllPosts());
        console.log("RESPONSE ", body)
    } catch(error) {
        alert("Ocorreu um erro ao criar o post. Tente novamente.")
    }
}



export const getPostDetail = (PostId) => async (dispatch) => {
    const config = {
        headers:{
            'auth': window.localStorage.getItem("token")
        }
    }

    const response = await axios.get(``, config)

    dispatch(setPostDetails(response.data.post))
}


export const getPostVotes = (reaction, postId) => async (dispatch, geState) =>{
    
    const body = {
        direction: reaction
    }
    
    const config = {
        headers:{
            'auth': window.localStorage.getItem("token")
        }
    }

    try{
        const response = await axios.get(`https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts/${postId}/vote`, 
        config,
        body)
        dispatch(getPostDetail(postId))
        console.log(response.data.direction)//APAGAR AO FINAL DO TRABALHO
    } catch (error) {
        console.log(body, config)
        console.error(error)
    }
}


