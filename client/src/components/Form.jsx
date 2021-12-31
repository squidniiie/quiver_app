import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const Form = () => {
    const [userName, setUserName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/new_user', {
            userName,
            imgUrl,
            email,
            password,
            confirmPassword
        })
            .then(res => {
                history.push("/dashboard")
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
            <button className="btn btn-info" onClick={(e) => history.push('/dashboard')}>
                Back to Dashboard
            </button>
            <div className="container">
                <div className="card col-3 bg-light">
                    <h1 className="h1">Add User</h1>
                    <form className="col" onSubmit={onSubmitHandler}>
                        {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
                        <p>
                            <label>Username:</label><br />
                            <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
                        </p>
                        <p>
                            <label>Image Url:</label><br />
                            <input type="text" onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
                        </p>
                        <p>
                            <label>Email:</label><br />
                            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </p>
                        <p>
                            <label>Password:</label><br />
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </p>
                        <p>
                            <label>Confirm Password:</label><br />
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        </p>
                        <input className="btn btn-info" type="submit" value="Add New User" onSubmit={(e) => history.push("/")} />
                    </form>
                </div>
            </div>

        </div>
    )
};
export default Form;