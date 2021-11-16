import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'

export default () => {

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


    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/new_user', {
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
            <button className="btn btn-info" onClick={(e) => history.push('/')}>
                Crew Board
            </button>
            <div className="container">
                <div className="card col-3 bg-light">
                    <h1 className="h1">Add Pirate</h1>
                    <form className="col" onSubmit={onSubmitHandler}>
                        {errors.map((err, index) => <p key={index}>{err}</p>)}
                        <p>
                            <label>Pirate Name:</label><br />
                            <input type="text" onChange={(e) => setPirateName(e.target.value)} value={pirateName} />
                        </p>
                        <p>
                            <label>Image Url:</label><br />
                            <input type="text" onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
                        </p>
                        <p>
                            <label>Number of Treasure Chests:</label><br />
                            <input type="number" onChange={(e) => setNumOfTreasure(e.target.value)} value={numOfTreasure} />
                        </p>
                        <p>
                            <label>Pirate Catch Phrase</label><br />
                            <input type="text" onChange={(e) => setCatchPhrase(e.target.value)} value={catchPhrase} />
                        </p>
                        <p>
                            <label>Crew Position</label><br />
                            <select name="position" id="position" onChange={(e) => setPosition(e.target.value)} value={position}>
                                <option></option>
                                <option value="Captain">Captain</option>
                                <option value="First Mate">First Mate</option>
                                <option value="Quarter Master">Quarter Master</option>
                                <option value="Boatswain">Boatswain</option>
                                <option value="Powder Monkey">Powder Monkey</option>
                            </select>
                        </p>
                        <p>
                            <label>Peg Leg</label><br />
                            <input type="checkbox" onChange={(e) => setPegLeg(e.target.checked)} checked={pegLeg} />
                        </p>
                        <p>
                            <label>Eye Patch</label><br />
                            <input type="checkbox" onChange={(e) => setEyePatch(e.target.checked)} checked={eyePatch} />
                        </p>
                        <p>
                            <label>Hook Hand</label><br />
                            <input type="checkbox" onChange={(e) => setHookHand(e.target.checked)} checked={hookHand} />
                        </p>
                        <input className="btn btn-info" type="submit" value="Add Pirate" onSubmit={(e) => history.push("/")} />
                    </form>
                </div>
            </div>
        </div>
    )
}