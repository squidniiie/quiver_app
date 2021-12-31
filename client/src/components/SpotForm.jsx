import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SpotForm = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [level, setLevel] = useState('');
    const [board, setBoard] = useState(true);
    const [breakType, setBreakType] = useState('');
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:9000/api/new_spot', {
            name,
            location,
            level,
            board,
            breakType
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
        <div className="card" >
            <h1>Add Spot</h1>
            {/* <button onClick={(e) => history.push('/')}>
                Surf Spots
            </button> */}
            <form onSubmit={onSubmitHandler}>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                <p>
                    <label>Spot Name:</label><br />
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </p>
                <p>
                    <label>Location:</label><br />
                    <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} />
                </p>
                <p>
                    <label>Level:</label><br />
                    <select name="level" id="level" onChange={(e) => setLevel(e.target.value)} value={level}>
                        <option></option>
                        <option value="Beginner">Beginner</option>
                        <option value="Newbie">Newbie</option>
                        <option value="Weekend Warrior">Weekend Warrior</option>
                        <option value="Skilled">Skilled</option>
                        <option value="Blessed">Blessed</option>
                    </select>
                </p>
                <p>
                    <label>Board Type:</label><br />
                    <select name="board" id="board" onChange={(e) => setBoard(e.target.value)} value={board}>
                        <option></option>
                        <option value="shortboard">shortboard</option>
                        <option value="longboard">longboard</option>
                    </select>
                </p>
                <p>
                    <label>What kind of break:</label><br />
                    <select name="breakType" id="breakType" onChange={(e) => setBreakType(e.target.value)} value={breakType}>
                        <option></option>
                        <option value="breakbreak">breakbreak</option>
                        <option value="pointbreak">pointbreak</option>
                        <option value="reefbreak">reefbreak</option>
                    </select>
                </p>
                <input type="submit" value="Add Spot" onSubmit={(e) => history.push("/")} />
            </form>
        </div>
    )
};
export default SpotForm;