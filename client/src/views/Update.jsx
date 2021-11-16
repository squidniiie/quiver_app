import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useHistory } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [pirateName, setPirateName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [numOfTreasure, setNumOfTreasure] = useState(0);
    const [catchPhrase, setCatchPhrase] = useState("");
    const [position, setPosition] = useState("");
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                setPirateName(res.data.pirateName);
                setCatchPhrase(res.data.catchPhrase);
                setImgUrl(res.data.imgUrl);
            })
    }, []);

    const updateUser = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/${id}`, {
            pirateName,
            imgUrl,
            numOfTreasure,
            catchPhrase,
            position,
            pegLeg,
            eyePatch,
            hookHand
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
            <p className="h1">Edit this Pirate:</p>
            <div className="container">
                <form className="col-3 card bg-light" onSubmit={updateUser}>
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                    <p className="edit-form">
                        <label className="h5">Edit Pirate Name</label><br />
                        <input className="col" type="text"
                            name="pirateName"
                            value={pirateName}
                            onChange={(e) => { setPirateName(e.target.value) }} />
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
                        <label className="h5">Edit Catch Phrase</label><br />
                        <input type="text"
                            name="catchPhrase"
                            value={catchPhrase}
                            onChange={(e) => { setCatchPhrase(e.target.value) }} />
                    </p>
                    <p className="edit-form">
                        <label className="h5">Edit Number of Treasure Chests:</label><br />
                        <input type="number"
                            name="numOfTreasure"
                            value={numOfTreasure}
                            onChange={(e) => { setNumOfTreasure(e.target.value) }} />
                    </p>
                    <p className="edit-form">
                        <label className="h5">Edit Crew Position</label><br />
                        <select name="position" id="position" onChange={(e) => setPosition(e.target.value)} >
                            <option value={position}></option>
                            <option value="Captain">Captain</option>
                            <option value="First Mate">First Mate</option>
                            <option value="Quarter Master">Quarter Master</option>
                            <option value="Boatswain">Boatswain</option>
                            <option value="Powder Monkey">Powder Monkey</option>
                        </select>
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