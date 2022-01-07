import Box from "@mui/material/Box";
import React, { useReducer, useState } from "react";
import "../App.css";
import axios from "axios";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";

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

const Login = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [errors, setErrors] = useState("");
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
        axios.post("http://localhost:8000/api/users/login",
            { email, password, },
            { withCredentials: true, }
        )
            .then((res) => {
                //send this message to server directly
                console.log(res);
                localStorage.user = JSON.stringify(res.data.userLoggedIn);
                navigate(`/user/home`);
            })
            .catch((err) => {
                console.log(err.response);
                if (err.response.data.hasOwnProperty("errors")) {
                    dispatch({
                        type: "errors",
                        payload: err.response.data.errors,
                    });
                    //setErrors(err.response.data.errors);
                } else {
                    setErrors("Invalid Login Attempt");
                }
                /* dispatch({
                  type: "errors",
                  payload: err.response.data.errors,
                }); */
                //setErrors(err.response.data.errors);
            });
    };
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <div className="registerForm">
                <div>Welcome to Dojo Public Library, and happy reading!</div>
                <p className="error-text">{errors}</p>
                <p className="error-text">
                    {state.errors !== "" && state.errors.email}
                </p>
                <div>
                    <TextField
                        /*                 error={
                              state.errors !== "" &&
                              state.errors.firstName &&
                              state.errors.firstName.message
                                ? "error"
                                : ""
                            } */
                        value={state.email}
                        id="email"
                        label="E-mail*"
                        variant="outlined"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <p className="error-text">
                        {state.errors !== "" && state.errors.password}
                    </p>
                    <TextField
                        /*               error={
                              state.errors !== "" &&
                              state.errors.lastName &&
                              state.errors.lastName.message
                                ? "error"
                                : ""
                            } */
                        value={state.password}
                        id="password"
                        label="Password*"
                        variant="outlined"
                        type="password"
                        onChange={handleChange}
                    />
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button onClick={onSubmitHandler} variant="contained">
                        Login
                    </Button>
                    <div>
                        <Link to="/user/register">New user?</Link>
                    </div>
                </div>
            </div>
        </Box>
    );
}
export default Login;