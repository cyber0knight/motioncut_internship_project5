import React, { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";

export default function Register({type}) {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState(null);
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8800/api/auth/userRegister";
            const response = await axios.post(url, inputs);
            // Success message
            setMessage({ text: response.data, type: "success" });
             
        } catch (error) {
            setMessage({ text: error.response.data, type: "error" }); // Error message
        }
    };

    return (
        <div  className="position-absolute continaer text-center w-100 h-100 m-auto" style={{ overflow: "hidden" }}>
            <Header type="login"/>
            <div className="row justify-content-center h-100">
                <div className="d-flex flex-column justify-content-center" style={{width:'400px'}}>
                <form autoComplete="new-password" onSubmit={ handleClick} className="bg-primary-subtle border border-dark px-5 py-5 mb-5 d-flex flex-column justify-content-center" style={{height:'500px', borderRadius:'20px'}}>
                        <h1 className="h3 mb-3 ms-2 d-flex align-items-start">Register</h1>
                        <div className="form-floating mb-1 border border-dark rounded">
                            <input
                                type="email"
                                className="form-control"
                                autoComplete="new-password"
                                id="floatingInput"
                                name="email"
                                placeholder="name@example.com"
                                value={inputs.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-2 border border-dark rounded">
                            <input
                                type="password"
                                className="form-control"
                                autoComplete="new-password"
                                id="floatingPassword"
                                name="password"
                                placeholder="Password"
                                value={inputs.password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
                        <div>Access your account: <Link to="/login">login</Link></div>
                        {message && (
                            <p className={`mt-2 ${message.type === "error" ? "text-danger" : "text-success"}`}>
                                {message.text}
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
