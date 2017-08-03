<template>
    <section class="wrapper" @scroll="wrapperScroll($event)">
        <content-header title="临期品处理" sub-title="临保商品特价单申请列表" :is-add-shortcut="isAddShortcut" @shortcutchange="shortCutChange"></content-header>
        <section class="discount-bill">
            <el-row :gutter="15" class="search-el-row">

                <el-col :span="20">
                    <el-form :inline="true" :model="formData" ref="form">
                        <el-row class="search-container">
                            <el-col :span="24">
                                <div class="search-item">
                                    <el-form-item label="生产日期：" prop="producedDate">
                                        <el-date-picker
                                          v-model="formData.producedDate"
                                          type="datetimerange"
                                          :picker-options="pickerOptions"
                                          placeholder="选择生产日期"
                                          align="right" class="m-date-picker" format="yyyy-MM-dd">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="search-item">
                                    <el-form-item label="过期日期：" prop="overdueDate">
                                        <el-date-picker
                                          v-model="formData.overdueDate"
                                          type="datetimerange"
                                          :picker-options="pickerOptions"
                                          placeholder="选择过期日期"
                                          align="right" class="m-date-picker" format="yyyy-MM-dd">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="search-item">
                                    <el-form-item label="当前数量：" prop="numCompare">
                                        <el-select v-model="formData.numCompare" class="num-compare">
                                            <el-option
                                                v-for="item in numOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="curNum">
                                            <el-input v-model="formData.curNum" type="number" class="cur-num"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="search-item">
                                    <el-form-item label="剩余保质期天数：" prop="shelfLife">
                                        <el-select v-model="formData.shelfLife" class="num-compare">
                                            <el-option
                                                v-for="item in numOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="lastShelfLife">
                                        <el-input v-model="formData.lastShelfLife" type="number" class="last-shelf-life"></el-input>
                                        <label class="control-label">天</label>
                                    </el-form-item>
                                </div>
                                <div class="search-item">
                                    <el-form-item label="商业条码：" prop="barcode">
                                        <el-input v-model="formData.barcode" class="barcode"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="search-item">
                                    <el-form-item label="商业代码：" prop="sku">
                                        <el-input v-model="formData.sku" class="sku"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
                <el-col :span="4" class="btn-container">
                    <el-row :gutter="4">
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="inquire()">查询</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="reset()">重置</el-button>
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
                <el-col :span="4" class="btn-container right-btn-aside">
                    <el-row :gutter="4" class="right-menu-side" :style="{top: scrollTop}">
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="toView()">查看</el-button>
                        </el-col>
                        <el-col :span="24">
                            <div class="line"></div>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="goPrePage()">上一页</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="goNextPage()">下一页</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="20">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentPageChange"
                        :current-page="currentPage"
                        :page-sizes="pageSizes"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                    </el-pagination>
                </el-col>
            </el-row>
        </section>
        <content-footer ref="contentFooter"></content-footer>
    </section>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, DatePicker, Select, Option, Input, Table, TableColumn, Radio, Pagination, Message, Form, FormItem } from 'element-ui'
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
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
import shortcut from 'common/js/shortcut'
import ajaxUrl, { commonAjax } from 'common/js/api'
import ContentHeader from 'components/ContentHeader'
import ContentFooter from 'components/ContentFooter'
export default {
    data () {
        return {
            isAddShortcut: false,
            scrollTop: 0,
            currentPage: 1,
            pageSize: 50,
            totalCount: 0,
            totalPage: 0,
            formData: {
                producedDate: '',
                overdueDate: '',
                curNum: '',
                numCompare: 1,
                shelfLife: 1,
                lastShelfLife: '',
                barcode: '',
                sku: ''
            },
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
            tableData: [],
            currentRow: null // 当前选中行
        }
    },
    created () {
        this.getdiscountBillsData()
        this.getShortCut()
    },
    mounted () {
        // console.log(this.$refs.contentFooter.$el)
        const _self = this
        shortcut.init({
            keyCodeArr: [
                { key: 'ESC', keyCode: 27, keyDec: '主菜单', callback: () => { _self.goBack() } },
                { key: 'F1', keyCode: 112, keyDec: '查询', callback: () => { _self.inquire() } },
                { key: 'F2', keyCode: 113, keyDec: '重置', callback: () => { _self.reset() } },
                { key: 'F4', keyCode: 115, keyDec: '查看', callback: () => { _self.toView() } },
                { key: 'F11', keyCode: 122, keyDec: '上一页', callback: () => { _self.goPrePage() } },
                { key: 'F12', keyCode: 123, keyDec: '下一页', callback: () => { _self.goNextPage() } }
            ],
            wrapEle: _self.$refs.contentFooter.$el
        })
    },
    methods: {
        getShortCut () {
            console.log(this.$route.fullPath)
        },
        shortCutChange (hasShortcut) {
            console.log(hasShortcut)
        },
        inquire () {
            this.currentPage = 1
            this.pageSize = 50
            this.getdiscountBillsData()
        },
        toView () {
            if (this.currentRow) {
                this.$router.push({ path: '/bill-details', query: { id: this.currentRow.id }})
            } else {
                Message({
                    message: '请先选中查看的一行',
                    type: 'error',
                    duration: 1000
                })
            }
        },
        goPrePage () {
            if (this.currentPage !== 1) {
                this.currentPage--
                this.getdiscountBillsData()
            } else {
                Message({
                    message: '当前页为第一页',
                    type: 'error',
                    duration: 1000
                })
            }
        },
        goNextPage () {
            if (this.currentPage !== this.totalPage) {
                this.currentPage++
                this.getdiscountBillsData()
            } else {
                Message({
                    message: '当前页为最后一页',
                    type: 'error',
                    duration: 1000
                })
            }
        },
        reset () {
            this.$refs.form.resetFields()
        },
        handleSizeChange (val) {
            this.currentPage = 1
            this.pageSize = val
            this.getdiscountBillsData()
        },
        handleCurrentPageChange (val) {
            this.currentPage = val
            this.getdiscountBillsData()
        },
        getdiscountBillsData () {
            commonAjax({
                method: 'post',
                url: ajaxUrl.getDiscountBillsData,
                data: Object.assign({}, {
                    page: this.currentPage,
                    size: this.pageSize
                }, this.formData),
                responseType: 'json'
            })
            .then((res) => {
                if (res.status === 0) {
                    this.tableData = res.data
                    this.currentPage = res.current_page
                    this.pageSize = res.page_size
                    this.totalCount = res.total_count
                    this.totalPage = res.total_page
                }
            })
        },
        wrapperScroll (e) {
            this.scrollTop = `${e.target.scrollTop}px`
        },
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
    computed: {
        pageSizes () {
            return [this.pageSize, this.pageSize * 2, this.pageSize * 3, this.pageSize * 4]
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
    .el-form-item{
        margin-bottom: 0;
    }
    .line{
        margin-top: 10px;
        margin-bottom: 20px;
        border: 0;
        border-top: 1px solid #eee;
    }
}
</style>