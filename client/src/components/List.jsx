import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../static/List.css'

const List = (props) => {
    const { removeFromDom } = props;
    const { submitted } = props;
    const [users, setUsers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.error(err));
    }, [submitted])

    const deleteUser = (userId) => {
        axios.delete('http://localhost:8000/api/users/' + userId)
            .then(res => {
                removeFromDom(userId)
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="container">
            <div className="row">
                {props.users.map((user, idx) => {
                    return <div className="border bg-light col" key={idx}>
                        <p className="h2">{user.pirateName}</p>
                        <div className="card-img"><img className="card-img" src={user.imgUrl} alt="img" style={{ width: "200px", height: "180px" }} /></div>
                        <div className="btn-group">
                            <button className="btn btn-success" onClick={(e) => { deleteUser(user._id) }}>
                                Walk the Plank
                            </button>
                            <button className="btn btn-primary" onClick={(e) => history.push(`users/${user._id}`)}>
                                View Pirate
                            </button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default List;