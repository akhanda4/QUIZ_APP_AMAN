import React from 'react';
import "./css/login.css";
import { Button, Navbar, Nav } from 'react-bootstrap';

const login = () => {
    return (
        <div className="main-content">
            <form id="form" action="login" method="POST">
                <input className="inputs" type="text" name="email" placeholder="example@gmail.com" required id="email" />
                <input className="inputs" type="password" name="password" placeholder="****************" required id="pwd" />
                <Button size="lg" variant="outline-info" className="custom_btn" type="submit" id="submit_login_form">Login</Button>
            </form>
        </div>
    )
}

export default login;