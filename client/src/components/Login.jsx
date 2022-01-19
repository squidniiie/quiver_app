import React, { useState, useReducer } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

const initialState = {
    email: "",
    password: "",
    errors: { email: "", password: "" },
};

function reducer(state, action) {
    switch (action.type) {
        case "emailError":
            return {
                ...state,
                errors: { ...state.errors, email: action.payload },
            };
        case "passwordError":
            return {
                ...state,
                errors: { ...state.errors, password: action.payload },
            };
        default:
            return {
                ...state,
                [action.type]: action.payload,
            };
    }
}


function Login(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [errors, setErrors] = useState("");
    const history = useHistory();
    console.log("hello" + props)

    function handleChange(e) {
        const { id, value } = e.target;
        if (id === "email") {
            if (value === "") {
                dispatch({
                    type: "emailError",
                    payload: "E-mail should be valid",
                });
            } else {
                dispatch({
                    type: "emailError",
                    payload: "",
                });
            }
        }
        if (id === "password") {
            if (value === "") {
                dispatch({
                    type: "passwordError",
                    payload: "password should be valid",
                });
            } else {
                dispatch({
                    type: "passwordError",
                    payload: "",
                });
            }
        }
        dispatch({
            type: id,
            payload: value,
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const { email, password } = state;
        axios.post("http://localhost:9000/api/users/login",
            { email, password }, { withCredentials: true }
        )
            .then((res) => {
                //send this message to server directly
                console.log(res);
                localStorage.user = JSON.stringify(res.data.userLoggedIn);
                history.push("/dashboard");
            })
            .catch((err) => {
                console.log(err.response);
                if (err.response.data.hasOwnProperty("errors")) {
                    dispatch({
                        type: "errors",
                        payload: err.response.data.errors,
                    });
                } else {
                    setErrors("Invalid Login Attempt");
                }
                setErrors(err.response.data.errors);
            });
    };
    return (
        <div>
            <div className="shadow-xl bg-gray-50 rounded-lg p-4 m-4">
                <form onClick={onSubmitHandler}>
                    <p className="error-text">{errors}</p>
                    <p className="error-text">
                        {state.errors !== "" && state.errors.email}
                    </p>
                    <label>Email:</label>
                    <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                        <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" onChange={handleChange} type="email" name='email' value={state.email} />
                    </p>
                    <p className="error-text">
                        {state.errors !== "" && state.errors.password}
                    </p>
                    <label>Password:</label>
                    <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                        <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" onChange={handleChange} type="password" name='password' value={state.password} />
                    </p>
                    <input className="bg-green-300 font-Montserrat text-lg font-bold text-white rounded-full mt-4 p-1 px-3 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-green-400 hover:shadow-xl" type="submit" value="Add New User" onSubmit={(e) => history.push("/")}
                    />
                </form>
            </div>
        </div>
    )
}

export default Login
