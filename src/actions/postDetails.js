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


export const getPostpDetail = (PostId) => async (dispatch) => {
    const config = {
        headers:{
            'auth': window.localStorage.getItem("token")
        }
    }

    const response = await axios.get(`${baseUrl}/posts/${PostId}`, config)

    dispatch(setPostDetails(response.data.post))
}


