import React, { useState } from 'react'
import axios from 'axios'

const Forecast = () => {
    const [waves, setWaves] = useState(false);
    const lat = 21.664019;
    const lng = -158.053852;
    const params = 'waveHeight,airTemperature';
    const fetchApi = async () => {
        try {
            const { data } = await axios.get(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=2022-01-06&end=2022-01-07`, {
                withCredentials: false,
                headers: {
                    'Authorization': 'e2e08fb0-311e-11ec-8e07-0242ac130002-e2e090e6-311e-11ec-8e07-0242ac130002',
                    'Access-Control-Allow-Origin': '*',
                }
            })
            console.log(data.hours)
            setWaves(data.hours)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='mx-8 border-2 border-gray-50 rounded-lg shadow-lg'>
            <div className='flex justify-center items-center'>
                <h1 className='bg-green-200 px-1 mt-2 text-center text-gray-600 text-3xl font-semibold font-Montserrat'>Your Favorite Spot</h1>
            </div>
            <div>
                <table className='flex justify-center'>
                    <tbody className="flex text-center">
                        {waves ?
                            waves.slice(15, 18).map((item) => (<tr className='m-1 p-4 mt-2 mb-4 rounded-xl border-2 border-gray-50' key={item.id}>
                                <tr className='font-Quicksand'>Wave Height: {item.waveHeight.noaa} ft</tr>
                                <tr className='font-Quicksand'>Air Temperature: {item.airTemperature.noaa}°</tr>
                            </tr>))
                            : <div className="grid grid-cols-2 gap-20 p-4 m-8 rounded-xl shadow-lg h-50 transform transition duration-500 hover:scale-95 hover:shadow-xl text-gray-700 hover:opacity-80">
                                <img className="object-contain rounded-xl relative m-1 w-50 h-50" src='https://images.squarespace-cdn.com/content/v1/527c03e4e4b03247a686bb74/1463104387626-4T0DR5451QPF2MLKR41U/Kelly+Slater+Pipeline.JPG?format=1000w' alt="img"></img>
                                <div className="grid grid-cols-1 m-4">
                                    <div>
                                        <p className='font-bold text-2xl font-Montserrat gap-1 cursor-pointer'>Hale'iwa
                                        </p>
                                        <p className="font-Quicksand text-xl">Pipeline</p>
                                        <div className='cursor-pointer'>
                                            <div className='gap-1'>
                                                <p>_________</p>
                                                <p className="font-Quicksand font-semibold text-xl">About this break:</p>
                                                <div className="font-Quicksand text-md">
                                                    <p> Skilled . shortboard . reefbreak </p>
                                                </div>
                                                <button className='bg-green-300 font-Quicksand text-lg text-white rounded-full m-3 p-1 px-3 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-green-400 hover:shadow-xl' onClick={fetchApi}>Today's Forecast</button>
                                            </div>
                                            <div>
                                                {/* <button className="bg-green-200 rounded-full p-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:shadow-xl" onClick={(e) => { deleteSpot(spot._id) }}>
                                                <svg className="w-6 text-white h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};
export default Forecast;
