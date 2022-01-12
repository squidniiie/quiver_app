import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SpotForm = () => {
    const [imgUrl, setImgUrl] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [level, setLevel] = useState('');
    const [board, setBoard] = useState('');
    const [breakType, setBreakType] = useState('');
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newSpot = {
            imgUrl,
            name,
            location,
            level,
            board,
            breakType
        };
        axios.post('http://localhost:9000/api/new_spot', newSpot, { withCredentials: true })
            .then(res => {
                console.log(res)
                history.push("/dashboard")
            })
            .catch(err => {
                console.log(err)
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div className="shadow-xl bg-gray-50 rounded-lg p-4 m-4" >
            <h1 className='text-2xl font-bold text-center'>Add Surf Spot</h1>
            <br />
            <form onSubmit={onSubmitHandler} className='font-Quicksand text-center'>
                {errors.map((err, index) => <p className='text-red-500' key={index}>{err}</p>)}
                <label>Spot Name:</label>
                <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white" >
                    <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </p>
                <label>Img URL:</label>
                <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white" >
                    <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="text" onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
                </p>
                <label>Location:</label>
                <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white" >
                    <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="text" onChange={(e) => setLocation(e.target.value)} value={location} />
                </p>
                <label>Level:</label>
                <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white" >
                    <select className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" name="level" id="level" onChange={(e) => setLevel(e.target.value)} value={level}>
                        <option></option>
                        <option value="Beginner">Beginner</option>
                        <option value="Newbie">Newbie</option>
                        <option value="Weekend Warrior">Weekend Warrior</option>
                        <option value="Skilled">Skilled</option>
                        <option value="Blessed">Blessed</option>
                    </select>
                </p>
                <label>Board Type:</label>
                <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white" >
                    <select className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" name="board" id="board" onChange={(e) => setBoard(e.target.value)} value={board}>
                        <option></option>
                        <option value="shortboard">shortboard</option>
                        <option value="longboard">longboard</option>
                    </select>
                </p>
                <label>What kind of break:</label>
                <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white" >
                    <select className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" name="breakType" id="breakType" onChange={(e) => setBreakType(e.target.value)} value={breakType}>
                        <option></option>
                        <option value="beachbreak">beachbreak</option>
                        <option value="pointbreak">pointbreak</option>
                        <option value="reefbreak">reefbreak</option>
                    </select>
                </p>
                <input onSubmit={(e) => history.push("/dashboard")} className="bg-green-300 font-Montserrat text-lg font-bold text-white rounded-full mt-4 p-1 px-3 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-green-400 hover:shadow-xl" type="submit" value="add to quiver" />
            </form>
        </div>
    )
};
export default SpotForm;