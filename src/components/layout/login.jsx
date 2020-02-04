import React from 'react';
import "../../public/css/login.css";
import { Button, Navbar, Nav } from 'react-bootstrap';
import $ from "jquery";
const login = () => {
    const validate = () => {
        let data = {};
        data.email = document.getElementById("email").value;
        data.password = document.getElementById("pwd").value;
        $.ajax({
            url: "http://localhost:8000/login",
            type: "POST",
            success: (response) => {
                if (response) {
                    this.data(response.data);
                }
            },
            error: (response) => {
                console.log(response);
            }
        });
    }
    return (
        <div className="main-content">
            <form onSubmit={validate} id="form" action="login" method="POST">
                <input className="inputs" type="text" name="email" placeholder="example@gmail.com" required id="email" />
                <input className="inputs" type="password" name="password" placeholder="****************" required id="pwd" />
                <Button size="lg" variant="outline-info" className="custom_btn" type="submit" id="submit_login_form">Login</Button>
            </form>
        </div>
    )
}

export default login;