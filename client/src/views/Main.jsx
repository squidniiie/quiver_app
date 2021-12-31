import React, { useEffect, useState } from 'react'
import axios from 'axios';
import List from '../components/List';
import SpotList from '../components/SpotList'
import SpotForm from '../components/SpotForm';
import { useHistory } from 'react-router-dom';
import '../static/List.css'



const Main = () => {
    // this.state = { username: Cookies.get('userName') };
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [spots, setSpots] = useState([]);
    const history = useHistory();

    // const [loading, setLoading] = useState(true);
    // const [user, setUser] = useState(null);

    const changeSubmitted = () => {
        setSubmitted(!submitted)
    }
    const removeFromDom = (userId, id) => {
        setUsers(users.filter(user => user._id !== userId));
        setSpots(spots.filter(spot => id !== id));
    }

    useEffect(() => {
        axios.get('http://localhost:9000/api/users')
            .then(res => {
                setUsers(res.data);
                setSubmitted(true);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:9000/api/spots')
            .then(res => {
                setSpots(res.data);
                setSubmitted(true);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1 className="h1">Welcome,*username* </h1>
            <button className="btn btn-danger" style={{ display: "flex", justifyContent: "center" }} onClick={(e) => history.push('/new_user')}>
                Add User
            </button>
            <button className="btn btn-danger" style={{ display: "flex", justifyContent: "center" }} onClick={(e) => history.push('/logout')}>
                Logout
            </button>
            <button className="btn btn-danger" style={{ display: "flex", justifyContent: "center" }} onClick={(e) => history.push('/')}>
                Login/Register
            </button>
            <hr />
            {submitted && <List users={users} removeFromDom={removeFromDom} />}
            <hr />
            <button className="btn btn-danger" style={{ display: "flex", justifyContent: "center" }} onClick={(e) => history.push('/new_spot')}>
                Add Spot
            </button>
            {submitted && <SpotList spots={spots} removeFromDom={removeFromDom} />}
            <SpotForm />
        </div>
    );
}

export default Main;