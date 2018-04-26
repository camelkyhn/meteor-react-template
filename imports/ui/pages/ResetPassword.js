import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resetPassword: '',
            resetConfirmPassword: '',
            isSent: false,
            confirmed: true,
            token: props.match.params.token
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.confirmed) {
            Accounts.resetPassword(this.state.token, this.state.resetPassword, (error) => {
                if (!error) {
                    console.log('success');
                    this.setState({ isSent: true });
                }
                else {
                    console.log(error.message);
                    this.setState({ isSent: false });
                }
            });

        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    handleConfirmation() {
        if (this.state.resetPassword === this.state.resetConfirmPassword) {
            this.setState({ confirmed: true, });
        }
        else {
            this.setState({ confirmed: false });
        }
    }

    render() {
        return(
            <div className="container">
                {
                    !this.state.isSent ? 
                    <form onSubmit={this.handleSubmit}>
                        <h1>Reset your password</h1>
                        <p>Here you can use this form to reset password!</p>

                        <div className="form-group">
                            <label htmlFor="resetPassword">Password *</label>
                            <input 
                                className="form-control col-md-6 col-sm-12"
                                required
                                type="password"
                                name="resetPassword"
                                id="resetPassword"
                                placeholder="Make it strong." 
                                value={this.state.password} 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="resetConfirmPassword">Confirm Password *</label>
                            <input 
                                className="form-control col-md-6 col-sm-12"
                                required
                                type="password"
                                name="resetConfirmPassword"
                                id="resetConfirmPassword"
                                placeholder="Type same to confirm." 
                                value={this.state.confirmPassword} 
                                onKeyUp={this.handleConfirmation}
                                onChange={this.handleChange} 
                            />
                        </div>

                        { !this.state.confirmed ? <p className="text-danger">Doesn't match!</p> : ''}
                        <button className="btn btn-outline-info" type="submit">Register</button>
                    </form> 
                    : 
                    <div className="alert alert-success text-center" role="alert">
                        Your password has been set up! You can now play!
                    </div>
                }
            </div>
        );
    }
}

export default ResetPassword;