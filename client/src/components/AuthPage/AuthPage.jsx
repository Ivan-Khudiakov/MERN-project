import React, {useContext, useState} from "react"
import {LoginPage} from "./LoginPage/LoginPage"
import {RegistrationPage} from "./RegistrationPage/RegistrationPage"
import "./AuthPage.css"
import axios from "axios"
import {AuthContext} from "../../context/AuthContext"
import {NavLink, Route, useHistory} from "react-router-dom"


export const AuthPage = () => {
    const [form, setForm] = useState ({
        email: '',
        password: ''
    })

    const history = useHistory()

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
        console.log(form)
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => console.log('user is registered'))
        } catch(error) {
            console.log(error)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    history.push('/contacts')
                    login(response.data.token, response.data.userId)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="auth-page">
            <div className="btn-container">
                <NavLink to={'/'}>
                    <button className="btn waves-effect blue" name="action">Log in</button>
                </NavLink>
                <NavLink to={'/registration'}>
                    <button className="btn waves-effect blue" name="action">Registration</button>
                </NavLink>
            </div>
            <Route exact path={'/'}
                   render={() => <LoginPage changeHandler={changeHandler} loginHandler={loginHandler}/>}/>
            <Route path={'/registration'}
                   render={() => <RegistrationPage changeHandler={changeHandler} registerHandler={registerHandler}/>}/>
        </div>
    )
}