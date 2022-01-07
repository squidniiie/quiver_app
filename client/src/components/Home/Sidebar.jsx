import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SpotForm from './SpotForm'
import List from '../List';

function Sidebar() {
    const [showSpotForm, setSpotForm] = useState(false);
    // const [user, setUser] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [users, setUsers] = useState([]);

    const removeFromDom = (userId, id) => {
        setUsers(users.filter(user => user._id !== userId));
    }

    useEffect(() => {
        axios.get('http://localhost:9000/api/users')
            .then(res => {
                setUsers(res.data);
                setSubmitted(true);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <div className='absolute right-0 w-1/4 border-2 border-gray-50 rounded-xl shadow-lg m-4 mr-16'>
            <br />
            <h1 className='text-center text-gray-800 font-semibold text-2xl font-Quicksand'>Your Activities</h1>
            <div className='grid grid-cols-1 text-center m-4'>
                <p className='text-sm mb-2 font-semibold font-Quicksand'>Not finding what you're looking for?</p>
                {showSpotForm && <SpotForm />}
                <button onClick={() => setSpotForm(!showSpotForm)}
                    className=" bg-green-300 rounded-full p-2 px-4 text-white font-semibold font-Montserrat focus-within:cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:shadow-xl hover:bg-green-400">
                    {showSpotForm ? "minimize" : "add your favorite surf spot"}
                </button>
            </div>
            {submitted && <List users={users} removeFromDom={removeFromDom} />}

        </div>
    )
}

export default Sidebar
