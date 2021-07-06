import React from "react"

export const LoginPage = (props) => {
    return (
        <div className="container">
            <div className="login-page">
                <h3>Log In</h3>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input type="email" name="email" className="validate" onChange={props.changeHandler}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input type="password" name="password" className="validate" onChange={props.changeHandler}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="wawes-effect wawes-light btn blue" onClick={props.loginHandler} >Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}