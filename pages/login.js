import React, { useState } from 'react';
import axios from 'axios';
import Router from "next/router";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mess, setMess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('login', {
            username: username,
            password: password
        }).then(res => {
            setMess(res.data);
            Router.replace("/employees");
        }).catch(rej => {
            setMess('Wrong username or password, please check again!')
        });
    }

    return (
        <div>
            <label>Username</label>
            <br />
            <input type="text" placeholder="Enter username" value={username} onChange={event => setUsername(event.target.value)} />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter password" />
            <br />
            <br />
            <p style={{ color: "red" }}>{mess}</p>
            <button type="submit" onClick={handleSubmit}>Register</button>
        </div>
    )
}