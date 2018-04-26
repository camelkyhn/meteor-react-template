import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isFailed: false,
            isEmailVerified: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
            if (!err) {
                this.setState({ isFailed: false });
                this.setState({ isEmailVerified: false });
            } 
            else {
                this.setState({ isFailed: true, email: '', password: '' });
                if (err.message === '[email-not-verified]') {
                    this.setState({ isEmailVerified: false });
                }
                else {
                    this.setState({ isEmailVerified: true });
                }
            }
        });
    }

    forgotPassword() {
        this.setState({ isFailed: false });
    }

    render() {
        return(
            <div>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <input 
                        className="form-control mr-sm-2"
                        required
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={this.state.email} 
                        onChange={this.handleChange} />            
                    <input 
                        className="form-control mr-sm-2"
                        required
                        type="password"
                        name="password"
                        placeholder="Password *" 
                        value={this.state.password} 
                        onChange={this.handleChange} />
                    <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Sign In</button>
                </form>
                { 
                    this.state.isFailed ? 
                    <div> 
                        { 
                            this.state.isEmailVerified ? 
                            <p className="text-danger">
                                Login failed, or <Link to="/forgotPassword" onClick={this.forgotPassword}>Forgot Password</Link>?
                            </p> 
                            : 
                            <p className="text-danger">
                                Email has not been verified!
                            </p>
                        }
                    </div> : ''
                }
            </div>
        );
    }
}

export default LoginForm;