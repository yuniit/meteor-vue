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
                    <el-button type="primary" v-loading="loadButton" @click="handleAddCustomer()" style="margin-left:120px;">Add</el-button>
                </el-form>
            </el-col>
        </el-row>
        <!-- End Form -->

        <el-row :gutter="20">
            <el-col :span="20" :offset="2">
                <el-card class="box-card" style="margin-top :30px;max-height:350px;overflow-y:scroll">
                    <div slot="header" class="clearfix">
                        <p style="text-align:center;margin:0;font-size:23px;text-decoration:underline">Customers List</p>
                    </div>
                    <div v-for="item in cusListOption" :key="item._id" :value="item._id" class="text item">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <p>
                                    <u style="color:#616161">Customer Name:</u> &nbsp&nbsp;&nbsp;&nbsp;{{ item.name }}
                                </p>
                            </el-col>
                            <el-col :span="8">
                                <p>
                                    <u style="color:#616161">Customer Gender:</u> &nbsp;&nbsp;&nbsp;&nbsp;{{ item.gender }}
                                </p>
                            </el-col>
                            <el-col :span="8">
                                <p>
                                    <u style="color:#616161">Customer Telephone:</u> &nbsp;&nbsp;&nbsp;&nbsp;{{ item.tel }}
                                </p>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
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
            cusListOption: [],
            loadButton: false,
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
                    this.loadButton = true;
                    Meteor.call('insertCustomer', data, (err, res) => {
                        if (!err) {
                            this.$message.success({ message: 'Customer add complete !' });
                            this.loadButton = false;
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
                    return this.cusListOption = res;
                }
            })
        },
        resetCusForm() {
            this.$refs.cusForm.resetFields();
        }
    },
}
</script>
<style scope="scope">
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}


.el-card__body {
    padding-top: 0px;
    padding-bottom: 0px;
}
</style>
