import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isSent: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const Email = this.state.email;
        Accounts.forgotPassword({ email: Email }, (error) => {
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

    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return(
            <div className="container">
                <h1>Forgot your password?</h1>
                <p>Here you can use this form to send reset password request!</p>
                {
                    !this.state.isSent ? 
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group" onSubmit={this.handleSubmit}>
                            <label htmlFor="forgotPasswordEmail">Email *</label>
                            <input 
                                className="form-control col-md-6 col-sm-12"
                                required
                                type="email"
                                name="email"
                                id="forgotPasswordEmail"
                                placeholder="example@example.com"
                                value={this.state.email} 
                                onChange={this.handleChange} 
                            />
                        </div>

                        <button className="btn btn-outline-info" type="submit">Send Mail</button>
                    </form>
                    : 
                    <div className="alert alert-success text-center" role="alert">
                        An email has been sent to your email!
                    </div>
                }
            </div>
        );
    }
}

export default ForgotPassword;