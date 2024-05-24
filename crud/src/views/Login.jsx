import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
    const { token } = useStateContext();

    
    const emailRef = useRef();
    const passwordRef = useRef();

    if (token) {
        return <Navigate to="/" />;
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                localStorage.setItem("ACCESS_TOKEN", data.token);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Login into your account</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" ref={emailRef} placeholder="Email" />
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Rigistered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
