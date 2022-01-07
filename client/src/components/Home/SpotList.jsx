import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
// import '../static/List.css'


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
        <div>
            {props.spots.map((spot, idx) => {
                return <div className="grid grid-cols-2 gap-20 p-4 m-8 rounded-xl shadow-lg h-50 transform transition duration-500 hover:scale-95 hover:shadow-xl text-gray-700 hover:opacity-80" key={idx}>
                    <img className="object-contain rounded-xl relative m-1 w-50 h-50" src={spot.imgUrl} alt="img" />
                    <div className="grid grid-cols-1 m-4">
                        <div>
                            <p className='font-bold text-2xl font-Montserrat gap-1 cursor-pointer flex justify-between'>{spot.location}
                                <button className="bg-green-400 text-white hover:bg-green-300 rounded-full p-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-110 hover:shadow-xl" onClick={(e) => history.push(`spots/${spot._id}`)}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </button></p>
                            <p className="font-Quicksand text-xl">{spot.name}</p>
                            <div className='cursor-pointer'>
                                <div className='gap-1'>
                                    <p>_________</p>
                                    <p className="font-Quicksand font-semibold text-xl">About this break:</p>
                                    <div className="font-Quicksand text-md">
                                        <p> {spot.level} . {spot.board} . {spot.breakType} </p>
                                    </div>
                                </div>
                                <div>
                                    <button className="bg-green-200 rounded-full p-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:shadow-xl" onClick={(e) => { deleteSpot(spot._id) }}>
                                        <svg className="w-6 text-white h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}
export default SpotList;