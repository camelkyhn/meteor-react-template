import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";

import SecurityService from "../Services/SecurityService";

Accounts.config({ sendVerificationEmail: true });
Accounts.emailTemplates.from = 'My Website <yourEmail@example.com>';
Accounts.emailTemplates.siteName = 'My Website';

// Verify Email
Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "MyWebsite Verify Your Email Address";
    },
    text(user, url) {
        let email = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ), // By default there is a '#/' caharacters in urls
        supportEmail = "support@email.com",
        emailBody = `To verify your email address (${email}) visit the following link: \n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`

        return emailBody;
    }
};

// Reset Password
Accounts.emailTemplates.resetPassword = {
    subject() {
        return "MyWebsite Reset Your Password";
    },
    text(user, url) {
        let email = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail = "support@email.com",
        emailBody = `To reset password of this email address (${email}) visit the following link: \n\n${urlWithoutHash}\n\n If you did not request this resetting, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`
        
        return emailBody;
    }
};

// OnLoginAttempt => Never lets user to login if email is not verified
Accounts.validateLoginAttempt(function(attempt) {
    if (!attempt.allowed) {
        return false;
    }

    if (attempt.user.emails[0].verified === true) {
        return true;
    }
    else {
        throw new Meteor.Error('email-not-verified');
    }
});

Meteor.methods({
    'user.register'(email, password){
        const userId = Accounts.createUser({
            username: email,
            email: email,
            password: password
        });

        return Accounts.sendVerificationEmail(userId, email);
    },

    'user.findUserByUsername'(username) {
        return Accounts.findUserByUsername(username);
    },

    'user.findUserByEmail'(email) {
        return Accounts.findUserByEmail(email);
    },

    'user.addRolesToUser'(userId, roles) {
        roles.forEach(role => {
            if (!SecurityService.hasRole(userId, role)) {
                SecurityService.addRolesToUser(userId, [role]);
            } 
        });
    }
});