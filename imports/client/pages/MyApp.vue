<template>
    <div>
        <el-button type="primary" @click="handleAddNew">Add New</el-button>
        <h2>Customer List</h2>
    </div>
</template>

<script>
import Customer from '../../api/customers/customers';

export default {
    name: 'app',
    data() {
        return {

        }
    },
    methods: {
        handleAddNew() {
            // do
        },

    },
}
</script>
<style>

</style>
