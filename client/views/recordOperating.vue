<template>
    <div>
        <el-dialog title="新增临期品记录" :visible.sync="addVisible" size="full">

            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    label="Id">
                </el-table-column>
                <el-table-column
                    label="商品条码">
                </el-table-column>
                <el-table-column
                    label="商品代码">
                </el-table-column>
                <el-table-column
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    label="生产日期">
                </el-table-column>
                <el-table-column
                    label="过期日期">
                </el-table-column>
                <el-table-column
                    label="保质天数">
                </el-table-column>
                <el-table-column
                    label="剩余保质天数">
                </el-table-column>
                <el-table-column
                    label="当前数量">
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="addRecord">保存</el-button>
                <el-button type="primary" @click="addVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
    },
    data () {
        return {
        }
    },
    methods: {
    }
}
</script>
<style lang="scss">
@import "../common/css/_variables.scss";
@import "../common/css/_mixins.scss";

</style>
