<template>
    <section>
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
                                  placeholder="选择生产日期"
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
            <el-row :gutter="15">

            </el-row>
        </section>
    </section>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, DatePicker, Select, Option, Input } from 'element-ui'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
import ContentHeader from 'components/ContentHeader'
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
            }
        }
    },
    methods: {
        goBack () {
            this.$router.replace({ path: '/' })
        }
    },
    components: {
        contentHeader: ContentHeader
    }
}
</script>
<style lang="scss" scoped>
@import "../common/css/_variables.scss";
.discount-bill{
    padding: 15px;
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
}
</style>