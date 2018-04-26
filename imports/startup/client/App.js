import React, { Component } from "react";
import Navigation from "../../ui/layouts/Navigation";
import Footer from "../../ui/layouts/Footer";
import Routes from "./routes";


class App extends Component {
    render() {
        return(
            <div>
                <Navigation />
                <Routes />
                <Footer />
            </div>
        );
    }
}

export default App;