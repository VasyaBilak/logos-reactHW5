import axios from "axios";
import { Endpoints } from "../api/endpoints";
const { REACT_APP_BASEURL } = process.env;

const instance = axios.create({
    baseURL: REACT_APP_BASEURL,  
});

export const UserServices = {
    postUsers: (data) => {
        instance.post(Endpoints.USERS, {data})
            .then((response) => console.log(response))
    }
}

export const CommentServices = {
    postComment: (data) => {
        instance.post(Endpoints.COMMENTS, {data})
            .then((response) => console.log(response))
    }
}