import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <span className="copyright text-muted"> &copy; My Website 2018. Designed by <Link to="https://github.com/camelkyhn">CamelKyhn</Link></span>
        </div>
    </footer>
);

export default Footer;