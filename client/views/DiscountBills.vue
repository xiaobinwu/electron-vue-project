<template>
    <section class="wrapper">
        <content-header title="临期品处理" sub-title="临保商品特价单申请列表" :is-add-shortcut="true"></content-header>
        <section class="discount-bill">
            <el-row :gutter="15" class="search-el-row">
                <el-col :span="20">
                    <el-row class="search-container">
                        <el-col :span="24">
                            <div class="search-item">
                                <label class="control-label">生产日期：</label>
                                <el-date-picker
                                  v-model="producedDate"
                                  type="datetimerange"
                                  :picker-options="pickerOptions"
                                  placeholder="选择生产日期"
                                  align="right" class="m-date-picker" format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div class="search-item">
                                <label class="control-label">过期日期：</label>
                                <el-date-picker
                                  v-model="overdueDate"
                                  type="datetimerange"
                                  :picker-options="pickerOptions"
                                  placeholder="选择过期日期"
                                  align="right" class="m-date-picker" format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div class="search-item">
                                <label class="control-label">当前数量：</label>
                                <el-select v-model="numCompare" class="num-compare">
                                    <el-option
                                        v-for="item in numOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input v-model="curNum" type="number" class="cur-num"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="search-item">
                                <label class="control-label">剩余保质期天数：</label>
                                <el-select v-model="shelfLife" class="num-compare">
                                    <el-option
                                        v-for="item in numOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input v-model="lastShelfLife" type="number" class="last-shelf-life"></el-input>
                                <label class="control-label">天</label>
                            </div>
                            <div class="search-item">
                                <label class="control-label">商业条码：</label>
                                <el-input v-model="barcode" class="barcode"></el-input>
                            </div>
                            <div class="search-item">
                                <label class="control-label">商业代码：</label>
                                <el-input v-model="sku" class="sku"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4" class="btn-container">
                    <el-row :gutter="4">
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary">查询</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary">重置</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary">导出</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="15" class="list-table">
                <el-col :span="20">
                     <el-table
                        ref="singleTable"
                        :data="tableData"
                        border
                        tooltip-effect="dark"
                        style="width: 100%;"
                        highlight-current-row
                        @current-change = "handleCurrentChange"
                        @row-click = "rowClick"
                        empty-text = "暂无数据"
                        row-class-name="table-row">
                        <el-table-column
                            label="id"
                            width="40">
                            <template scope="scope">
                                <el-radio class="radio" v-model="scope.row.isChecked" :label="true">&nbsp;</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="申请单编号"
                            prop="apply_no"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            label="门店"
                            prop="hd_shop_code"
                            width="60">
                        </el-table-column>
                        <el-table-column
                            label="数量"
                            prop="apply_num"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            label="金额"
                            prop="amount">
                        </el-table-column>
                        <el-table-column
                            label="开始日期">
                            <template scope="scope">{{ scope.row.begin_date }}</template>
                        </el-table-column>
                        <el-table-column
                            label="结束日期">
                            <template scope="scope">{{ scope.row.end_date }}</template>
                        </el-table-column>
                        <el-table-column
                            label="申请日期">
                            <template scope="scope">{{ scope.row.created_at }}</template>
                        </el-table-column>
                        <el-table-column
                            label="修改人"
                            prop="realname"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            label="修改时间">
                            <template scope="scope">{{ scope.row.updated_at }}</template>
                        </el-table-column>
                        <el-table-column
                            label="单据状态"
                            prop="audit_status"
                            width="80">
                        </el-table-column>
                      </el-table>
                </el-col>
                <el-col :span="4" class="btn-container">
                    <el-row :gutter="4">
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary">查看</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary">上一页</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary">下一页</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </section>
        <content-footer ref="contentFooter"></content-footer>
    </section>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, DatePicker, Select, Option, Input, Table, TableColumn, Radio } from 'element-ui'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Radio)
import shortcut from 'common/plugin/shortcut'
import ContentHeader from 'components/ContentHeader'
import ContentFooter from 'components/ContentFooter'
export default {
    data () {
        return {
            producedDate: '',
            overdueDate: '',
            curNum: '',
            numCompare: 1,
            shelfLife: 1,
            lastShelfLife: '',
            barcode: '',
            sku: '',
            numOptions: [{
                value: 1,
                label: '>'
            }, {
                value: 2,
                label: '<'
            }, {
                value: 3,
                label: '='
            }],
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '昨天',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        picker.$emit('pick', [start, end])
                    }
                }]
            },
            // 待获取数据（ajax）
            tableData: [{
                id: 32,
                apply_no: 'LT170616888801',
                hd_shop_code: 'L8888',
                apply_num: 12,
                amount: '1207.80',
                begin_date: '2017-06-17',
                end_date: '2017-06-28',
                created_at: '2017-06-16 16:14:32',
                realname: 'xiaobin',
                updated_at: '2017-06-16 17:13:11',
                audit_status: '审核通过',
                isChecked: false
            }, {
                id: 33,
                apply_no: 'LT170616888801',
                hd_shop_code: '8888',
                apply_num: 12,
                amount: '1207.80',
                begin_date: '2017-06-17',
                end_date: '2017-06-28',
                created_at: '2017-06-16 16:14:32',
                realname: 'xiaobin',
                updated_at: '2017-06-16 17:13:11',
                audit_status: '审核通过',
                isChecked: false
            }, {
                id: 34,
                apply_no: 'LT170616888801',
                hd_shop_code: '8888',
                apply_num: 12,
                amount: '1207.80',
                begin_date: '2017-06-17',
                end_date: '2017-06-28',
                created_at: '2017-06-16 16:14:32',
                realname: 'xiaobin',
                updated_at: '2017-06-16 17:13:11',
                audit_status: '审核通过',
                isChecked: false
            },{
                id: 32,
                apply_no: 'LT170616888801',
                hd_shop_code: 'L8888',
                apply_num: 12,
                amount: '1207.80',
                begin_date: '2017-06-17',
                end_date: '2017-06-28',
                created_at: '2017-06-16 16:14:32',
                realname: 'xiaobin',
                updated_at: '2017-06-16 17:13:11',
                audit_status: '审核通过',
                isChecked: false
            }, {
                id: 33,
                apply_no: 'LT170616888801',
                hd_shop_code: '8888',
                apply_num: 12,
                amount: '1207.80',
                begin_date: '2017-06-17',
                end_date: '2017-06-28',
                created_at: '2017-06-16 16:14:32',
                realname: 'xiaobin',
                updated_at: '2017-06-16 17:13:11',
                audit_status: '审核通过',
                isChecked: false
            }, {
                id: 34,
                apply_no: 'LT170616888801',
                hd_shop_code: '8888',
                apply_num: 12,
                amount: '1207.80',
                begin_date: '2017-06-17',
                end_date: '2017-06-28',
                created_at: '2017-06-16 16:14:32',
                realname: 'xiaobin',
                updated_at: '2017-06-16 17:13:11',
                audit_status: '审核通过',
                isChecked: false
            },{
                id: 32,
                apply_no: 'LT170616888801',
                hd_shop_code: 'L8888',
                apply_num: 12,
                amount: '1207.80',
                begin_date: '2017-06-17',
                end_date: '2017-06-28',
                created_at: '2017-06-16 16:14:32',
                realname: 'xiaobin',
                updated_at: '2017-06-16 17:13:11',
                audit_status: '审核通过',
                isChecked: false
            }, {
                id: 33,
                apply_no: 'LT170616888801',
                hd_shop_code: '8888',
                apply_num: 12,
                amount: '1207.80',
                begin_date: '2017-06-17',
                end_date: '2017-06-28',
                created_at: '2017-06-16 16:14:32',
                realname: 'xiaobin',
                updated_at: '2017-06-16 17:13:11',
                audit_status: '审核通过',
                isChecked: false
            }, {
                id: 34,
                apply_no: 'LT170616888801',
                hd_shop_code: '8888',
                apply_num: 12,
                amount: '1207.80',
                begin_date: '2017-06-17',
                end_date: '2017-06-28',
                created_at: '2017-06-16 16:14:32',
                realname: 'xiaobin',
                updated_at: '2017-06-16 17:13:11',
                audit_status: '审核通过',
                isChecked: false
            }],
            currentRow: null // 当前选中行
        }
    },
    mounted () {
        // console.log(this.$refs.contentFooter.$el)
        const _self = this
        shortcut.init({
            keyCodeArr: [
                { key: 'ESC', keyCode: 27, keyDec: '主菜单', callback: () => { _self.goBack() } },
                { key: 'F1', keyCode: 112, keyDec: '查询', callback: () => {  alert('查询')  } },
                { key: 'F2', keyCode: 113, keyDec: '重置', callback: () => { alert('重置')  } },
                { key: 'F4', keyCode: 115, keyDec: '查看', callback: () => { alert('查看')  } },
                { key: 'F11', keyCode: 122, keyDec: '上一页', callback: () => { alert('上一页')  } },
                { key: 'F12', keyCode: 123, keyDec: '下一页', callback: () => { alert('下一页')  } }
            ],
            wrapEle: _self.$refs.contentFooter.$el
        })
    },
    methods: {
        goBack () {
            this.$router.replace({ path: '/' })
        },
        rowClick (row, event, column) {
            this.$refs.singleTable.setCurrentRow(row)
        },
        handleCurrentChange (currentRow, oldCurrentRow) {
            this.currentRow = currentRow
            // radio选中特效
            currentRow.isChecked = true
            oldCurrentRow && (oldCurrentRow.isChecked = false)
        }
    },
    components: {
        contentHeader: ContentHeader,
        contentFooter: ContentFooter
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";
.discount-bill{
    padding: 15px;
    padding-bottom: 50px;
    .search-container{
        padding: 0 8px;
    }
    .search-el-row{
        background-color: #f9f9f9;
    }
    .search-item{
        display: inline-block;
        margin-right: 15px;
        margin-bottom: 10px;
        .m-date-picker{
            width: 138px;
        }
        .control-label{
            vertical-align: middle;
        }
        .num-compare{
            width: 60px;
        }
        .cur-num,
        .last-shelf-life,
        .barcode,
        .sku{
            width: 100px;
        }
    }
    .btn-container{
        padding-left: 4.5px!important;
        padding-right: 15.5px!important;
    }
    .list-btn{
        width: 100%;
        height: 30px;
        line-height: 15px;
        padding: 0;
        margin-bottom: 10px;
    }
    .list-table{
        margin-top: 20px;
    }
}
</style>