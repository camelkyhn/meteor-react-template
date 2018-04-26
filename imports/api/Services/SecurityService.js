import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";

class SecurityService {
    static checkRole(userId, role) {
        if (!this.hasRole(userId, role)) {
            throw new Meteor.Error('not-authorized');   
        }
    }

    static hasRole(userId, role) {
        return Roles.userIsInRole(userId, role);
    }

    static checkLoggedIn(userId) {
        if (!userId) {
            throw new Meteor.Error('not-authorized');
        }
    }

    static addRolesToUser(userId, roles) {
        Roles.addUsersToRoles(userId, roles);
    }
}

export default SecurityService;