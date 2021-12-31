import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../static/List.css'

const SpotList = (props) => {
    const { removeFromDom } = props;
    const { submitted } = props;
    const [spots, setSpots] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:9000/api/spots')
            .then(res => {
                console.log(res.data)
                setSpots(res.data)
            })
            .catch(err => console.error(err));
    }, [submitted])

    const deleteSpot = (id) => {
        axios.delete('http://localhost:9000/api/spots/' + id)
            .then(res => {
                removeFromDom(id)
            })
            .catch(err => console.error(err));
    }
    return (
        <div className="container">
            <div className="row">
                {props.spots.map((spot, idx) => {
                    return <div className="border bg-light col" key={idx}>
                        <p className="h2">{spot.name}</p>
                        <p className="h4">{spot.location}</p>
                        <p className="h4">{spot.level}</p>
                        <p className="h4">{spot.board}</p>
                        <p className="h4">{spot.breakType}</p>
                        <div className="btn-group">
                            <button className="btn btn-success" onClick={(e) => { deleteSpot(spot._id) }}>
                                Delete Spot
                            </button>
                            <button className="btn btn-primary" onClick={(e) => history.push(`spots/${spot._id}`)}>
                                View Spot
                            </button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
export default SpotList;