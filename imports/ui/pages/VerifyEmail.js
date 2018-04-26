import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: false
        };
    }

    componentDidMount() {
        const Token = this.props.match.params.token;
        Accounts.verifyEmail(Token, (error) => {
            if (!error) {
                Meteor.call('user.addRolesToUser', Meteor.userId(), ["User"]);
                this.setState({ verified: true });
            }
            else {
                console.log(error.message);
            }
        });
    }

    render() {
        if (this.state.verified) {
            return <Redirect to="/" />;
        }
        else {
            return(
                <div className="text-center">
                    <h1>Failed on verifying!</h1>
                    <p>The page you have entered is not a valid route!</p>
                    <Link className="btn btn-info" to="/">Back to Home</Link>
                </div>
            );
        }
    }
}

export default VerifyEmail;