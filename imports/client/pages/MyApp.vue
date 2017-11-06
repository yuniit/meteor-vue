<template>
    <div>
        <h1 align="center">Add Customer</h1>
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
                    <el-button type="primary" v-loading="loadAddButton" @click="handleAddCustomer()" style="margin-left:120px;">Add</el-button>
                </el-form>
            </el-col>
        </el-row>
        <!-- End Form -->

        <el-row :gutter="20" style="margin-top:30px;">
            <el-col :span="13" :offset="5">
                <el-table v-loading="loadingTable" element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" :data="cusData" border style="width: 100%;">
                    <el-table-column label="Customer name" prop="name" width="200">
                    </el-table-column>
                    <el-table-column label="Customer gender" prop="gender" width="190">
                    </el-table-column>
                    <el-table-column label="Customer tel" prop="tel" width="200">
                    </el-table-column>
                    <el-table-column label="Remove" width="105">
                        <template scope="scope">
                            <el-button type="danger" :plain="true" size="small" @click="removeCus(scope.row)">Remove</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Customer from '../../api/customers/customers';

export default {
    name: 'app',
    data() {
        return {
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
            loadAddButton: false,
            loadingTable: false,
        }
    },
    created() {
        this.callCustomer();
    },
    methods: {
        handleAddCustomer() {
            let data = {
                name: this.cusForm.name,
                gender: this.cusForm.gender,
                tel: this.cusForm.tel
            }
            this.$refs.cusForm.validate((val) => {
                if (val) {
                    this.loadAddButton = true;
                    Meteor.call('insertCustomer', data, (err, res) => {
                        if (!err) {
                            this.$message.success({ message: 'Customer add complete !' });
                            this.loadAddButton = false;
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
        callCustomer() {
            Meteor.call('findCustomers', (err, res) => {
                if (!err) {
                    return this.cusData = res;
                }
            })
        },
        removeCus(row) {
            this.$confirm('Are you sure to delete this one ?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
                .then(() => {
                    this.loadingTable = true;
                    Meteor.call('removeCustomer', row._id, (err, res) => {
                        if (!err) {
                            this.callCustomer();
                            this.loadingTable = false;
                            this.$message.success({ message: 'Remove done !!' })
                        }
                    })
                })
                .catch(() => {
                    this.$message.warning({ message: 'Remove cancel !!', duration: '1800' })
                })
        },
        resetCusForm() {
            this.$refs.cusForm.resetFields();
        }
    },
}
</script>
<style scope="scope">

</style>
