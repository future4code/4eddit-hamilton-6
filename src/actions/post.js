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
    console.log(response.data.posts)
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



export const getPostpDetail = (PostId) => async (dispatch) => {
    const config = {
        headers:{
            'auth': window.localStorage.getItem("token")
        }
    }

    const response = await axios.get(``, config)

    dispatch(setPostDetails(response.data.post))
}


