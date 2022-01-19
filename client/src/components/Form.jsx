import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const Form = () => {
    const [userName, setUserName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newUser = {
            userName,
            imgUrl,
            email,
            password,
            confirmPassword
        }
        axios.post('http://localhost:9000/api/new_user', newUser, { withCredentials: true })
            .then(res => {
                history.push("/dashboard")
                console.log(res)
                console.log(res.data)
            })

            .catch(err => {
                // console.log(err)
                // console.log("Didn't work")
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <button className="btn btn-info" onClick={(e) => history.push('/dashboard')}>
                Back to Dashboard
            </button>
            <div className="shadow-xl bg-gray-50 rounded-lg p-4 m-4">
                <div className="font-Quicksand text-center">
                    <h1 className="text-2xl font-bold text-center">Add User</h1>
                    <form className="col" onSubmit={onSubmitHandler}>
                        {errors.map((err, index) => <p className="text-danger" key={index}>{err}</p>)}
                        <label>Username:</label>
                        <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white" >
                            <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="text" onChange={(e) => setUserName(e.target.value)} value={userName} />
                        </p>
                        <label>Image Url:</label>
                        <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                            <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="text" onChange={(e) => setImgUrl(e.target.value)} value={imgUrl} />
                        </p>
                        <label>Email:</label>
                        <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                            <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </p>
                        <label>Password:</label>
                        <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                            <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </p>
                        <label>Confirm Password:</label>
                        <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                            <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        </p>
                        <input className="bg-green-300 font-Montserrat text-lg font-bold text-white rounded-full mt-4 p-1 px-3 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-green-400 hover:shadow-xl" type="submit" value="Add New User" onSubmit={(e) => history.push("/")} />
                    </form>
                </div>
            </div>
        </div>
    )
};
export default Form;