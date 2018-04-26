import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            confirmed: true,
            isSent: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleConfirmation = this.handleConfirmation.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = { email: this.state.email, password: this.state.password};
        Meteor.call('user.register', data.email, data.password, (err, result) => {
            if (!err) {
                // Success, clear inputs
                this.setState({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    isSent: true
                });
            }
            else {
                console.log('Error: ' + err.message);
                this.setState({ isSent: false });
            }
        });
    }

    handleConfirmation() {
        if (this.state.password === this.state.confirmPassword) {
            this.setState({ confirmed: true, });
        }
        else {
            this.setState({ confirmed: false });
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return(
            <div className="container">
                <h1>Create an Account</h1>
                <p>Here you can use this form to start quickly!</p>
                {
                    !this.state.isSent ?
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group" onSubmit={this.handleSubmit}>
                            <label htmlFor="registerEmail">Email *</label>
                            <input 
                                className="form-control col-md-6 col-sm-12"
                                required
                                type="email"
                                name="email"
                                id="registerEmail"
                                placeholder="example@example.com"
                                value={this.state.email} 
                                onChange={this.handleChange} 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="registerPassword">Password *</label>
                            <input 
                                className="form-control col-md-6 col-sm-12"
                                required
                                type="password"
                                name="password"
                                id="registerPassword"
                                placeholder="Make it strong." 
                                value={this.state.password} 
                                onChange={this.handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="registerConfirmPassword">Confirm Password *</label>
                            <input 
                                className="form-control col-md-6 col-sm-12"
                                required
                                type="password"
                                name="confirmPassword"
                                id="registerConfirmPassword"
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
                        Your confirmation link has been sent to your email address!
                    </div>
                }
            </div>
        );
    }
}

export default Register;