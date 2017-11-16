import { Meteor } from 'meteor/meteor';

/* ___________ Import fields from Collections ________________ */
import Customer from './customers.js';
import Item from './items.js';
import Sale from './sales.js';

/* _____________  Meteor Methods goes here _____________________*/
Meteor.methods({
    checkCusNameInDb(name) {
        return Customer.findOne({ name: name })
    },
    checkItemNameInDb(name) {
        return Item.findOne({ name: name })
    },
    findCustomers() {
        return Customer.find().fetch();
    },
    findOneCustomer(_id) {
        return Item.findOne({ _id: _id });
    },
    findItems() {
        return Item.find().fetch();
    },
    findOneItem(_id) {
        return Item.findOne({ _id: _id });
    },
    findSaleItemSelect(_id) {
        return Item.findOne({ _id: _id });
    },
    findSales() {
        let saleDoc = Sale.aggregate([
            {
                $lookup: {
                    from: "sale",
                    localField: "_id",
                    foreignField: "_id",
                    as: "saleDoc"
                }
            },
            {
                $unwind: { path: "$saleDoc", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "costumer",
                    localField: "cusName",
                    foreignField: "_id",
                    as: "cusDoc"
                }
            },
            {
                $unwind: { path: "$cusDoc", preserveNullAndEmptyArrays: true }
            },
            {
                $lookup: {
                    from: "item",
                    localField: "itemName",
                    foreignField: "_id",
                    as: "itemDoc"
                }
            },
            {
                $unwind: { path: '$itemDoc', preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: "$_id",
                    date: { $last: "$saleDoc.saleDate" },
                    cusName: { $last: "$cusDoc.name" },
                    itemName:{$last:"$itemDoc.name"},
                    itemPrice:{$last:"$saleDoc.itemPrice"},
                    itemQuantity:{$last:"$saleDoc.itemQuantity"}, 
                    amount:{$last:"$saleDoc.itemAmount"}
            
                }
            }
        ])
        return saleDoc;
    },
    findOneSale(_id) {
        return Sale.findOne({ _id: _id });
    },
    insertCustomer(data) {
        Meteor._sleepForMs(1000)
        return Customer.insert(data);
    },
    insertItem(data) {
        Meteor._sleepForMs(1000)
        return Item.insert(data);
    },
    insertSale(data) {
        Meteor._sleepForMs(1000)
        return Sale.insert(data);
    },
    updateCustomer(data) {
        return Customer.update(data);
    },
    updateItem(data) {
        return Item.update(data);
    },
    updateSale(data) {
        return Sale.update(data);
    },
    removeCustomer(_id) {
        Meteor._sleepForMs(1000);
        return Customer.remove({ _id: _id });
    },
    removeItem(_id) {
        Meteor._sleepForMs(1000);
        return Item.remove({ _id: _id });
    },
    removeSale(_id) {
        Meteor._sleepForMs(1000);
        return Sale.remove({ _id: _id });
    }
})






