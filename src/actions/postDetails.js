import axios from 'axios';

const token = localStorage.getItem('token')

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit"




//FUNÇÕES SINCRONAS


export const setPostDetails = (postDetails) => ({
    type: 'SET_POST_DETAILS',
    payload: {
        postDetails,
    }
})


//FUNÇÕES ASSINCRONAS


export const getPostDetails = (PostId) => async (dispatch) => {
    const config = {
        headers:{
            'auth': token
        }
    }
    try{
        const response = await axios.get(`${baseUrl}/posts/${PostId}`, config)
        dispatch(setPostDetails(response.data.post))
    } catch (error) {
        console.error(error)
    }

}


export const postComment = (comment, postId) => async (dispatch) => {
    const body = {
        text: comment,
    }

    const config = {
        headers: {
            'auth': token
        }
    }

    try {
        await axios.post(`${baseUrl}/posts/${postId}/comment`, 
        body, 
        config)
    } catch(error) {
        console.log(body)
        window.alert("Ocorreu um erro ao criar o comentário.")
    }}

