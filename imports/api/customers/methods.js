import { Meteor } from 'meteor/meteor';

/* ___________ Import fields from Collections ________________ */
import Customer from './customers.js';

/* _____________  Meteor Methods goes here _____________________*/
Meteor.methods({
    findCustomers() {
        return Customer.find().fetch();
    },
    findOneCustomer(_id) {
        return Customer.findOne({ _id: _id });
    },
    insertCustomer(data) {
        return Customer.insert(data);
    },
    updateCustomer(data) {
        return Customer.update(data);
    },
    removeCustomer(_id) {
        return Customer.remove({ _id: _id });
    },
})






