import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useHistory } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [userName, setUserName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9000/api/users/${id}`)
            .then(res => {
                console.log(res.data);
                setUserName(res.data.userName);
                setImgUrl(res.data.imgUrl);
                setEmail(res.data.email);
                setPassword(res.data.password);
            })
    }, []);

    const updateUser = e => {
        e.preventDefault();
        axios.put(`http://localhost:9000/api/users/${id}`, {
            userName,
            imgUrl,
            email,
            password
        })
            .then(res => {
                console.log(res)
                history.push("/")
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
            <Link to={"/"}>
                Home
            </Link>
            <p className="h1">Edit this User:</p>
            <div className="container">
                <form className="col-3 card bg-light" onSubmit={updateUser}>
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                    <p className="edit-form">
                        <label className="h5">Edit User Name</label><br />
                        <input className="col" type="text"
                            name="userName"
                            value={userName}
                            onChange={(e) => { setUserName(e.target.value) }} />
                    </p>
                    <div className="detail-img"><img className="detail-img" src={imgUrl} alt="img" style={{ width: "200px" }} /></div>
                    <p className="edit-form">
                        <label className="h5">Edit Image Url</label><br />
                        <input type="text"
                            name="imgUrl"
                            value={imgUrl}
                            onChange={(e) => { setImgUrl(e.target.value) }} />
                    </p>
                    <p className="edit-form">
                        <label className="h5">Edit Email</label><br />
                        <input type="text"
                            name="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </p>
                    <p className="edit-form">
                        <label className="h5">Edit Number of Treasure Chests:</label><br />
                        <input type="number"
                            name="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }} />
                    </p>
                    <div className="btn btn-group">
                        <input className="btn btn-warning" type="submit" value="Update" onSubmit={(e) => history.push("/")} />
                        <button className="btn btn-danger" onClick={(e) => history.push("/")}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update;