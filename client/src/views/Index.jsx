import React, { useState } from 'react'
import Form from '../components/Form'
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";

function Index() {
    const { id } = useParams();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post(`http://localhost:9000/api/users/${id}`, {
            data
        })
            .then(res => {
                localStorage.setItem("UserToken", res.data);
                history.push("/dashboard")
                console.log(res.message)
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                console.log(errorResponse)
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <Form />
            <p className="h1">Login:</p>
            <div className="container">
                <form onSubmit={onSubmitHandler}>
                    {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
                    <p>
                        <label>Email:</label><br />
                        <input onChange={handleChange} type="email" name='email' value={data.email} />
                    </p>
                    <p>
                        <label>Password:</label><br />
                        <input onChange={handleChange} type="password" name='password' value={data.password} />
                    </p>
                    <input className="btn btn-info" type="submit" value="Sign in" />
                </form>
            </div>
        </div>
    )
}

export default Index;
