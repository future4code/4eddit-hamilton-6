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



export const createPost = (form) => async (dispatch) => {
    const formData = {
        text: form.text,
        title: form.title,
    }

    const config = {
        headers: {
            'auth': window.localStorage.getItem("token")
        }
    }

    try {
        await axios.post(`https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts`, formData, config)

    } catch(error) {
        window.alert("Ocorreu um erro ao criar o post.")
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


export const getPostVotes = (postId) => async (dispatch, geState) =>{
    const config = {
        headers:{
            'auth': window.localStorage.getItem("token")
        }
    }

    //PRECISO SALVAR O ID DO POST 

    const response = await axios.get(`https://us-central1-future-apis.cloudfunctions.net/fourEddit/posts/${postId}/vote`, config)

    dispatch(increment(response.data))
    console.log(response.data.direction)//APAGAR AO FINAL DO TRABALHO
}


