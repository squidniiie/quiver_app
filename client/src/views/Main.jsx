import React, { useEffect, useState } from 'react'
import axios from 'axios';
import List from '../components/List';
import { useHistory } from 'react-router-dom';
import '../static/List.css'


const Main = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();

    const changeSubmitted = () => {
        setSubmitted(!submitted)
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                setUsers(res.data);
                setSubmitted(true);
            })
            .catch(err => console.error(err));
    }, []);

    const removeFromDom = userId => {
        setUsers(users.filter(user => user._id !== userId));
    }

    return (
        <div>
            <h1 className="h1">Pirate Crew</h1>
            <button className="btn btn-danger" style={{ display: "flex", justifyContent: "center" }} onClick={(e) => history.push('/new_user')}>
                Add Pirate
            </button>
            <hr />
            {submitted && <List users={users} removeFromDom={removeFromDom} />}
        </div>
    );
}

export default Main;