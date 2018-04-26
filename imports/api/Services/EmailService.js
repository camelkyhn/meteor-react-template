import { Email } from "meteor/email";

class EmailService {
    static sendEmail(To, From, Subject, Html) {
        Email.send({
            to: To,
            from: From,
            subject: Subject,
            html: Html
        });
    }
}

export default EmailService;