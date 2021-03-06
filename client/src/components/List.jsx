import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import '../static/List.css'

const List = (props) => {
    // const { removeFromDom } = props;
    const { submitted } = props;
    const [users, setUsers] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:9000/api/users')
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.error(err));
    }, [submitted])

    // const deleteUser = (userId) => {
    //     axios.delete('http://localhost:9000/api/users/' + userId)
    //         .then(res => {
    //             removeFromDom(userId)
    //         })
    //         .catch(err => console.error(err));
    // }

    return (
        <div className="">
            <div>
                <p className="text-2xl text-center text-gray-800 font-bold">Meet the Party Wave</p>
                {props.users.map((user, idx) => {
                    return <div className="border-2 rounded-full m-4 pointer" key={idx}>
                        <p className="font-bold font-Quicksand text-center">{user.userName}</p>
                        {/* <div className="card-img">
                            <img className="card-img" src={user.imgUrl} alt="img" style={{ width: "200px", height: "180px" }} />
                        </div> */}
                        {/* <div className="btn-group">
                            <button className="btn btn-success" onClick={(e) => { deleteUser(user._id) }}>
                                Delete User
                            </button>
                            <button className="btn btn-primary" onClick={(e) => history.push(`users/${user._id}`)}>
                                View User
                            </button>
                        </div> */}
                    </div>
                })}
            </div>
        </div>
    )
}

export default List;