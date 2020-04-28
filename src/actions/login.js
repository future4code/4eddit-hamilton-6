import axios from 'axios'
import { push } from "connected-react-router";
import { routes } from '../containers/Router';

const token = localStorage.getItem('token')

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit"



export const toSignUp = (email, password, username) => async (dispatch) => {
    const body =
        {
            email: email,
            password: password,
            username: username,
        }
        try {
            const response = await axios.post(`${baseUrl}/signup`, 
            body)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", response.data.user.username)
            localStorage.setItem("email", response.data.user.email)
            dispatch(push(routes.feedPage))
            window.location.reload(true)
        } catch (error) {
            console.error(error)
            console.log(body)
        }
    }


export const toLogin = (email, password) => async (dispatch) => {
    const body = {
        email: email,
        password: password,
    }

    try{
        const response = await axios.post( `${baseUrl}/login`, 
        body)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", response.data.user.username)
        localStorage.setItem("email", response.data.user.email)
        dispatch(push(routes.feedPage))
        window.location.reload(true)
    } catch (error){
        console.error(error)
        console.log(body)
    }

}