import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../../ui/pages/Home";
import About from "../../ui/pages/About";
import NotFound from "../../ui/pages/NotFound";
import Register from "../../ui/pages/Register";
import VerifyEmail from "../../ui/pages/VerifyEmail";
import ForgotPassword from "../../ui/pages/ForgotPassword";
import ResetPassword from "../../ui/pages/ResetPassword";

const Routes = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route path="/verify-email/:token" component={VerifyEmail} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route component={NotFound} />
        </Switch>
    </main>
);

export default Routes;