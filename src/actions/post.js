import axios from 'axios';


//FUNÇÕES SINCRONAS


export const setAllPosts = (allPosts) => ({
    type: 'SET_ALL_POSTS',
    payload: {
        allPosts,
    }
})


export const setPostDetails = (postDetails) => ({
    type: 'SET_POST_DETAILS',
    payload: {
        postDetails,
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



export const getPostDetail = (postId) => async (dispatch) => {
    const config = {
        headers:{
            'auth': window.localStorage.getItem("token")
        }
    }
    try{
        const response = await axios.get(`https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts/${postId}`,
        config)

    dispatch(setPostDetails(response.data.post))
    }catch (error) {
        console.error(error)
    }
}


export const getPostVotes = ( direction, postId) => async (dispatch, geState) =>{
    
    const body = {
        direction:  direction
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
        dispatch(getAllPosts())
        console.log(response)
    } catch (error) {
        console.log("erro ao curtir o post")
        
    }
}


