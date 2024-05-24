import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        };

        console.log(payload);

       
            axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch((err) => {
                const response = err.response

                if(response && response.status === 422) {
                    setErrors(response.data.errors);

                }
            })
    
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <h1 className="title">Sign up for free</h1>
                {
                    errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                <form onSubmit={onSubmit}>
                    <input type="text" ref={nameRef} placeholder="Full name" />
                    <input type="email" ref={emailRef} placeholder="Email" />
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        ref={passwordConfirmationRef}
                        placeholder="Password Confirmation"
                    />
                    <button className="btn btn-block">Sign up</button>
                    <p className="message">
                        Already Rigistered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
