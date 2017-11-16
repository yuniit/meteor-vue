<template>
    <div>
        <h1 align="center">Add Customer</h1>
        <!-- Start Customer Form -->
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-form :model="cusForm" ref="cusForm" :rules="cusRule" label-width="120px">
                    <el-form-item label="Customer Name:" prop="name">
                        <el-input type="text" v-model="cusForm.name"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Customer Gender:" prop="gender">
                                <el-select v-model="cusForm.gender">
                                    <el-option v-for="item in cusGenderOption" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Customer Telephone:" prop="tel">
                                <el-input type="text" v-model="cusForm.tel"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-button type="primary" v-loading="loadAddCus" @click="handleAddCustomer()" style="margin-left:120px;">Add</el-button>
                    <el-button type="warning" :plain="true" @click="resetCusForm" style="float:right;">Reset</el-button>
                </el-form>
            </el-col>
        </el-row>
        <!-- End  Customer Form -->

        <!-- Start Customer Table -->
        <el-row :gutter="20" style="margin-top:30px;">
            <el-col :span="13" :offset="6">
                <el-table :data="cusData" v-loading="loadingCusTable" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" border style="width: 100%;">
                    <el-table-column label="Customer name" sortable prop="name" width="200">
                    </el-table-column>
                    <el-table-column label="Customer gender" prop="gender" width="180">
                    </el-table-column>
                    <el-table-column label="Customer tel" prop="tel" width="200">
                    </el-table-column>
                    <el-table-column label="Remove" width="106">
                        <template scope="scope">
                            <el-button type="danger" :plain="true" size="small" @click="removeCus(scope.row)">Remove</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!-- End Customer Table -->
        <hr>

        <!-- Start Item Form -->
        <el-row :gutter="20">
            <h1 style="text-align:center;">Add Item</h1>
            <el-col :span="12" :offset="6">
                <el-form :model="itemForm" ref="itemForm" :rules="itemRule" label-width="120px">
                    <el-form-item label="Item Name:" prop="name">
                        <el-input type="text" v-model="itemForm.name"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-form-item label="Item Price:" prop="price">
                                <el-input type="text" v-model="itemForm.price"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-button type="primary" v-loading="loadAddItem" @click="handleAddItem()" style="margin-left:120px;">Add</el-button>
                    <el-button type="warning" :plain="true" @click="resetItemForm()" style="float:right;">Reset</el-button>
                </el-form>
            </el-col>
        </el-row>
        <!-- End Item Form -->

        <!-- Start Item Table -->
        <el-row :gutter="20" style="margin-bottom:20px;">
            <el-col :span="9" :offset="7">
                <el-table :data="itemData" v-loading="loadingItemTable" border style="width:100%;margin-top:30px">
                    <el-table-column label="Item Name" prop="name" sortable width="190"></el-table-column>
                    <el-table-column label="Item Price" prop="price" width="172" align="center"></el-table-column>
                    <el-table-column label="Remove" width="107">
                        <template scope="scope">
                            <el-button type="danger" @click="removeItem(scope.row)" :plain="true" size="small">Remove</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <hr>

        <h1 style="text-align:center">Sale Form</h1>
        <el-row :gutter="20" style="margin-bottom:20px">
            <el-col :span="12" :offset="6">
                <el-form :model="saleForm" ref="saleForm" :rules="saleRule" label-width="120px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Date:" prop="saleDate">
                                <el-date-picker v-model="saleForm.saleDate" type="date" placeholder="Pick date"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Customer name:" prop="cusName">
                                <el-select v-model="saleForm.cusName">
                                    <el-option v-for="item in saleCusNameOpt" :key="item._id" :label="item.name" :value="item._id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Item Name:" prop="itemName">
                                <el-select v-model="saleForm.itemName" filterable @change="handleChangeSaleItem">
                                    <el-option v-for="item in saleItemNameOpt" :key="item._id" :label="item.name" :value="item._id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Item Price:" prop="itemPrice">
                                <el-input type="text" v-model="saleForm.itemPrice" :readonly="readOnly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Quantity:" prop="itemQuantity">
                                <el-input-number v-model="saleForm.itemQuantity" @change="handleChangeQuantity" :min="1" :max="60"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Item Amount:" prop="itemAmount">
                                <el-input type="text" v-model="saleForm.itemAmount" :readonly="readOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-button type="primary" @click="handleAddSale()" v-loading="loadAddSale" style="margin-left:120px;">Add</el-button>
                    <el-button type="warning" :plain="true" @click="resetSaleForm" style="float:right;">Reset</el-button>
                </el-form>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom:30px;">
            <el-col :span="18" :offset="3">
                <el-table :data="saleData" border v-loading="loadingSaleTable">
                    <el-table-column label="Date" prop="date" sortable :formatter="dateFormat" width="150">
                    </el-table-column>
                    <el-table-column label="Customer Name" prop="cusName" width="150">
                    </el-table-column>
                    <el-table-column label="Item Name" prop="itemName" width="168">
                    </el-table-column>
                    <el-table-column label="Item Price" prop="itemPrice" width="130">
                    </el-table-column>
                    <el-table-column label="Quantity" prop="itemQuantity" width="121" align="center">
                    </el-table-column>
                    <el-table-column label="Amount" prop="amount" width="135" align="center">
                    </el-table-column>
                    <el-table-column label="Remove" width="105">
                        <template scope="scope">
                            <el-button type="danger" :plain="true" @click="removeSale(scope.row)" size="small">Remove</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Customer from '../../api/customers/customers';
import Item from '../../api/customers/items';
import Sale from '../../api/customers/sales';

export default {
    name: 'app',
    watch: {
        'cusForm.name'(val) {
            if (!!val) {
                this.checkCusNameInDb();
            }
        },
        'itemForm.name'(val) {
            if (!!val) {
                this.checkItemNameInDb();
            }
        },
    },
    data() {
        return {
            readOnly: true,
            loadAddCus: false,
            loadingCusTable: false,
            loadAddItem: false,
            loadingItemTable: false,
            loadAddSale: false,
            loadingSaleTable: false,
            cusData: [],
            cusForm: {
                name: '',
                gender: '',
                tel: ''
            },
            cusRule: {
                name: [
                    { required: true, message: 'Customer name require !' }
                ],
                gender: [
                    { required: true, message: 'Customer gender require !' }
                ],
                tel: [
                    { required: true, message: 'Customer telephone require !' }
                ]
            },
            cusGenderOption: [
                {
                    label: 'Male',
                    value: 'Male'
                },
                {
                    label: 'Female',
                    value: 'Female'
                }
            ],
            itemData: [],
            itemForm: {
                name: '',
                price: '',
            },
            itemRule: {
                name: [
                    { required: 'true', message: 'Item name require !! ' },
                ],
                price: [
                    { required: 'true', message: 'Item price require !! ' },
                ],
            },
            saleData: [],
            saleForm: {
                saleDate: '',
                cusName: '',
                itemName: '',
                itemPrice: '',
                itemQuantity: '',
                itemAmount: '',
            },
            saleRule: {
                saleDate: [
                    { required: 'true', message: 'Sale date require !! ' }
                ],
                cusName: [
                    { required: 'true', message: 'Customer name require !! ' }
                ],
                itemName: [
                    { required: 'true', message: 'Item name require !! ' }
                ],
                itemPrice: [
                    { required: 'true', message: 'Item price require !! ' }
                ],
                itemQuantity: [
                    { required: 'true', message: 'Item quantity require !! ' }
                ],
                itemAmount: [
                    { required: 'true', message: 'Item amount require !! ' }
                ],
            },
            saleCusNameOpt: [],
            saleItemNameOpt: [],
        }
    },
    created() {
        this.callCustomer();
        this.callItem();
        this.callSale();
    },
    methods: {
        // Check same name
        checkCusNameInDb: _.debounce(function() {
            const h = this.$createElement;
            Meteor.call('checkCusNameInDb', this.cusForm.name, (err, res) => {
                if (!err) {
                    if (res) {
                        this.$message({
                            message: h('p', null, [
                                h('span', null, 'This name already'),
                                h('span', { style: 'color:#FFA726' }, ' Exist')
                            ])
                            ,
                            type: 'warning'
                        })
                        this.cusForm.name = '';
                    }
                }
            });
        }, 1000),
        checkItemNameInDb: _.debounce(function() {
            const h = this.$createElement;
            Meteor.call('checkItemNameInDb', this.itemForm.name, (err, res) => {
                if (!err) {
                    if (res) {
                        this.$message({
                            message: h('p', null, [
                                h('span', null, 'This name already'),
                                h('span', { style: 'color:#FFA726' }, ' Exist')
                            ])
                            ,
                            type: 'warning'
                        })
                        this.itemForm.name = '';
                    }
                }
            });
        }, 1000),

        // find methode
        callCustomer() {
            Meteor.call('findCustomers', (err, res) => {
                if (!err) {
                    this.cusData = res;
                    this.saleCusNameOpt = res;
                }
            })
        },
        callItem() {
            Meteor.call('findItems', (err, res) => {
                if (!err) {
                    this.itemData = res;
                    this.saleItemNameOpt = res;
                }
            })
        },
        callSale() {
            Meteor.call('findSales', (err, res) => {
                if (!err) {
                    this.saleData = res;
                }
            })
        },
        // select change
        handleChangeSaleItem(_id) {
            Meteor.call('findSaleItemSelect', _id, (err, res) => {
                if (!err) {
                    this.saleForm.itemPrice = res.price;
                    this.saleForm.itemAmount = res.amount;
                }
            })
        },
        handleChangeQuantity(val) {
            return this.saleForm.itemAmount = val * this.saleForm.itemPrice;
        },
        // insert methode
        handleAddCustomer() {
            let data = {
                name: this.cusForm.name,
                gender: this.cusForm.gender,
                tel: this.cusForm.tel
            }
            this.$refs.cusForm.validate((val) => {
                if (val) {
                    this.loadAddCus = true;
                    Meteor.call('insertCustomer', data, (err, res) => {
                        if (!err) {
                            this.$message.success({ message: 'Customer add complete !' });
                            this.loadAddCus = false;
                            this.callCustomer();
                            this.resetCusForm();
                        }
                    })
                }
                else {
                    this.$message.warning({ message: 'Customer add incomplete !' });
                    setTimeout(() => {
                        this.resetCusForm();
                    }, 2000);
                }
            })
        },
        handleAddItem() {
            let data = {
                name: this.itemForm.name,
                price: this.itemForm.price,
            }
            this.$refs.itemForm.validate((val) => {
                if (val) {
                    this.loadAddItem = true;
                    Meteor.call('insertItem', data, (err, res) => {
                        if (!err) {
                            this.$message.success({ message: 'Item add complete !' });
                            this.loadAddItem = false;
                            this.resetItemForm();
                            this.callItem();
                        }
                    })
                }
                else {
                    this.$message.warning({ message: 'Item add incomplete !' });
                    setTimeout(() => {
                        this.resetItemForm();
                    }, 2000);
                }
            })
        },
        handleAddSale() {
            let data = {
                saleDate: this.saleForm.saleDate,
                cusName: this.saleForm.cusName,
                itemName: this.saleForm.itemName,
                itemPrice: this.saleForm.itemPrice,
                itemQuantity: this.saleForm.itemQuantity,
                itemAmount: this.saleForm.itemAmount
            }
            this.$refs.saleForm.validate((val) => {
                if (val) {
                    this.loadAddSale = true;
                    Meteor.call('insertSale', data, (err, res) => {
                        this.loadAddSale = false;
                        this.resetSaleForm();
                        this.$message.success({ message: 'Sale add complete !' });
                        this.callSale();
                    })
                }
                else {
                    this.$message.warning({ message: 'Sale add incomplete !' });
                    setTimeout(() => {
                        this.resetItemForm();
                    }, 2000);
                }
            })
        },
        // remove methode
        removeCus(row) {
            this.$confirm('Are you sure to delete this one ?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
                .then(() => {
                    this.loadingCusTable = true;
                    Meteor.call('removeCustomer', row._id, (err, res) => {
                        if (!err) {
                            this.callCustomer();
                            this.loadingCusTable = false;
                            this.$message.success({ message: 'Remove done !!' })
                        }
                    })
                })
                .catch(() => {
                    this.$message.warning({ message: 'Remove cancel !!', duration: '1800' })
                })
        },
        removeItem(row) {
            this.$confirm('Are you sure to delete this one ?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
                .then(() => {
                    this.loadingItemTable = true;
                    Meteor.call('removeItem', row._id, (err, res) => {
                        if (!err) {
                            this.callItem();
                            this.loadingItemTable = false;
                            this.$message.success({ message: 'Remove done !!' })
                        }
                    })
                })
                .catch(() => {
                    this.$message.warning({ message: 'Remove cancel !!', duration: '1800' })
                })
        },
        removeSale(row) {
            this.$confirm('Are you sure to delete this one ?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            })
                .then(() => {
                    this.loadingSaleTable = true;
                    Meteor.call('removeSale', row._id, (err, res) => {
                        this.loadingSaleTable = false;
                        this.callSale();
                        this.$message.success({ message: 'Remove done !!' })
                    })
                })
                .catch(() => {
                    this.$message.warning({ message: 'Remove cancel !!', duration: '1800' })
                })
        },
        // reset Form
        resetCusForm() {
            this.$refs.cusForm.resetFields();
        },
        resetItemForm() {
            this.$refs.itemForm.resetFields();
        },
        resetSaleForm() {
            this.$refs.saleForm.resetFields();
        },
        dateFormat: (row, column) => {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("DD/MM/YYYY");
        },
    },
}
</script>
<style scope="scope">

</style>
