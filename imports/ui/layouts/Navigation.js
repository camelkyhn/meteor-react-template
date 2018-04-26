import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import LoginForm from "./LoginForm";

class Navigation extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();

        Meteor.logout();
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Dungeons&Dragons</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            {
                                this.props.currentUser ? 
                                <ul className="navbar-nav mr-auto text-right">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/" onClick={this.handleLogout}>Logout</Link>
                                    </li>
                                </ul> 
                                : 
                                <ul className="navbar-nav mr-auto text-right">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </ul> 
                            }
                        </ul>
                        {
                            !this.props.currentUser ?
                            <LoginForm /> : ''
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user()
    };
})(Navigation);