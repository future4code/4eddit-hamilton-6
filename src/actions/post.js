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

export const getAllPosts = () => async (dispatch) => {
    const response = await axios.get('')

    dispatch(setAllPosts(response.data.posts))
} 



export const createPost = (form) => async (dispatch) => {
    const formData = {
        name: form.name,
        date: form.date,
        description: form.description,
        durationInDays: form.durationInDays,
        planet: form.planet,
    }

    const config = {
        headers: {
            'auth': window.localStorage.getItem("token")
        }
    }

    try {
        await axios.post(``, formData, config)

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

