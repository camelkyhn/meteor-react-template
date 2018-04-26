import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="text-center">
        <h1>404 Not Found!</h1>
        <p>The page you have entered is not a valid route!</p>
        <Link className="btn btn-info" to="/">Back to Home</Link>
    </div>
);

export default NotFound;