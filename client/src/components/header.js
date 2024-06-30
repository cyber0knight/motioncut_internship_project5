import React from 'react'
import './styles.css'
import storeLogo from '../images/store.png'
import logoutLogo from '../images/logout.png'
import profileLogo from '../images/profileLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import makeRequest from '../axios.js'; // Assuming makeRequest is a custom Axios instance

export default function Header({ type }) {
    const navigate = useNavigate();

    let linkText;
    let linkPath;
    if (type === 'register') {
        linkText = 'Register';
        linkPath = '/register';
    } else if (type === 'login') {
        linkText = 'Login';
        linkPath = '/login';
    } else if (type === 'logout') {
        linkText = '';
        linkPath = '';
    }

    const leave = async (e) => {
        e.preventDefault();
        console.log("logout");
        try {
            // Send request with credentials
            const res = await makeRequest.post("http://localhost:8800/api/auth/userLogout");
            console.log(res.data);
            localStorage.removeItem('user');
            // Redirect or handle logout success here
            navigate("/");
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
    };

    if(type === "logout"){
        return(
            <header>
            <Link to="/" style={{textDecoration:"none", color:"white"}}><h1><span>AM</span>BITES</h1></Link>
            <div className='nav_links' >
                <Link to="/cart"><img src={storeLogo} alt={linkText} /></Link>
                <Link onClick={leave}><img id='logout' src={logoutLogo} alt={linkText} /></Link>
            </div>
            </header>
        )
        
    }
    else{
    return (
        <header>
            <Link to="/" style={{textDecoration:"none", color:"white"}}><h1><span>AM</span>BITES</h1></Link>
            {
                type === 'profile' ?
                    <div className='nav_links' >
                        <Link to="/cart"><img src={storeLogo} alt={linkText} /></Link>
                        <Link to="/profile"><img id='profileLogo' src={profileLogo} alt={linkText} /></Link>
                    </div>
                    :
                    <div>
                        <Link to={linkPath} className='link_bt'>
                            <h4>{linkText}</h4>
                        </Link>
                    </div>
            }
        </header>
    );
}
}
