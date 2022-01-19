import React, { useState, useReducer } from 'react'
import Form from '../components/Form'
import Login from '../components/Login';
import axios from 'axios';
import { useHistory } from "react-router-dom";
const Index = () => {
    // // const { id } = useParams();
    // const [data, setData] = useState({
    //     email: "",
    //     password: ""
    // })
    // const history = useHistory();
    // const [errors, setErrors] = useState([]);

    // const handleChange = ({ currentTarget: input }) => {
    //     setData({ ...data, [input.name]: input.value });
    // }

    // const onSubmitHandler = e => {
    //     e.preventDefault();
    //     axios.post("http://localhost:9000/api/users/login", {
    //         data, withCredentials: true
    //     })
    //         .then(res => {
    //             console.log(res)
    //             localStorage.user = JSON.stringify(res.data.userLoggedIn)
    //             // localStorage.setItem("userToken", res.data);
    //             history.push("/dashboard")
    //             // console.log(res.message)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             console.log("Didn't work")
    //             // const errorResponse = err.response.data.errors;
    //             // console.log(errorResponse)
    //             // const errorArr = [];
    //             // for (const key of Object.keys(errorResponse)) {
    //             //     errorArr.push(errorResponse[key].message)
    //             // }
    //             // setErrors(errorArr);
    //         })
    // }

    return (
        <div>
            <Form />
            <Login />
        </div>
    )
}


export default Index;
