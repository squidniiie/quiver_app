import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import Sidebar from './Sidebar'
import SpotList from './SpotList'
import Forecast from './Forecast';

function Main() {
    const [spots, setSpots] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [users, setUsers] = useState([]);


    const changeSubmitted = () => {
        setSubmitted(!submitted)
    }
    const removeFromDom = (userId, id) => {
        setUsers(users.filter(user => user._id !== userId));
        setSpots(spots.filter(spot => id !== id));
    }
    useEffect(() => {
        axios.get('http://localhost:9000/api/spots')
            .then(res => {
                setSpots(res.data);
                setSubmitted(true);
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div className=' pt-4 ml-8 w-2/3'>
            <Forecast />
            {submitted && <SpotList spots={spots} removeFromDom={removeFromDom} />}

        </div>
    )
}

export default Main
