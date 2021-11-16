import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import '../static/List.css'
const Detail = () => {
    const { id } = useParams();
    const [userState, setUserState] = useState({})
    const history = useHistory();
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                console.log(res.data)
                setUserState(res.data)
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div>
            <button className="btn btn-warning" onClick={(e) => history.push('/')}>
                Aboard Ship
            </button>
            <div className="container">
                <div className="card col-4 bg-light">
                    {
                        (userState) ?
                            <div className="row">
                                <h1 className="h1">{userState.pirateName}</h1>
                            </div> : <h1>Loading...</h1>
                    }
                    <div className="detail-img"><img className="detail-img" src={userState.imgUrl} alt="img" style={{ width: "200px" }} /></div>
                    <h1 className="h2">"{userState.catchPhrase}"</h1>
                    <table className="col">
                        <thead>
                            <th className="h4">About</th>
                        </thead>
                        <tbody className="col">
                            <tr>Position!: {userState.position}</tr>
                            <tr>Treasures: {userState.numOfTreasure}</tr>
                            <tr>Peg Leg: {pegLeg ? "Yes" : "No"}
                                <button className="switch btn btn-primary" onClick={() => setPegLeg(!pegLeg)}>{pegLeg ? "No" : "Yes"}</button>
                            </tr>
                            <tr>Eye Patch: {eyePatch ? "Yes" : "No"}
                                <button className="switch btn btn-primary" onClick={() => setEyePatch(!eyePatch)}>{eyePatch ? "No" : "Yes"}</button>
                            </tr>
                            <tr>Hook Hand: {hookHand ? "Yes" : "No"}
                                <button className="switch btn btn-primary" onClick={() => setHookHand(!hookHand)}>{hookHand ? "No" : "Yes"}</button>
                            </tr>
                            <button className="btn btn-danger" onClick={(e) => history.push(`/users/${id}/edit`)}>Edit</button>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Detail;