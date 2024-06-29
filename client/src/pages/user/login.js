import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";

export default function Login() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
      });
      const [err, setErr] = useState(null);
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      const { login } = useContext(AuthContext);
    
      const handleClick = async (e) => {
        e.preventDefault();
        try {
          await login(inputs);
          navigate("/")
        } catch (error) {
            setErr(error.response ? error.response.data : "Login failed. Please try again.");
        }
      };

  return (
    <div className="position-absolute w-100 h-100 text-center" style={{ overflow: "hidden" }}>
      <Header type="register"/>
      <div className="row justify-content-center h-100">
        <div className="d-flex flex-column justify-content-center" style={{ width: '400px', overflow: "hidden" }}>
          <form autoComplete="new-password" onSubmit={handleClick} className="bg-primary-subtle border border-dark px-5 py-5 mb-5 d-flex flex-column justify-content-center" style={{ height: '500px', borderRadius: '20px' }}>
            <h1 className="h3 mb-3 ms-2 d-flex align-items-start">Login</h1>
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
            <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
            {err && <p>{err}</p>}
            <div>create an account: <Link to="/register">register</Link></div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
