<template>
    <section class="wrapper" @scroll="wrapperScroll($event)">
        <content-header :title="$t('billDetails.temporaryTreatment')" :sub-title="$t('billDetails.commodityDetails')" :is-ordinary-header="true"></content-header>
        <section class="bill-detail">
            <el-row :gutter="15" class="list-table">
                <el-col :span="20">
                    <el-table
                        ref="singleTable"
                        :data="tableData"
                        v-loading="loading"
                        element-loading-text="loading..."
                        border
                        tooltip-effect="dark"
                        style="width: 100%;"
                        highlight-current-row
                        :empty-text = "$t('table.noData')"
                        row-class-name="table-row">

                        <el-table-column
                            label="id"
                            prop="id">
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.sku')"
                            prop="barcode">
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.goodName')"
                            prop="goods_name">
                        </el-table-column>


                        <el-table-column
                            :label="$t('billDetails.warrantyTime')">
                            <template scope="scope">{{ scope.row.produce_date }} - {{ scope.row.expiry_date }}</template>
                        </el-table-column>


                        <el-table-column
                            :label="$t('billDetails.durabilityDays')"
                            prop="durability_days">
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.shelfLifeDays')"
                            prop="remain_durability_days">
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.applyStock')"
                            prop="cur_stock">
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.applyNum')"
                            prop="apply_num">
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.storePrice')"
                            prop="shop_stock_price">
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.salePrice')"
                            prop="shop_sale_price">
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.provisionalPrice')"
                            prop="pre_price">
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.auditsNum')">
                            <template scope="scope">{{ scope.row.check_num ? scope.row.check_num : scope.row.apply_num }}</template>
                        </el-table-column>

                        <el-table-column
                            :label="$t('billDetails.auditPrice')">
                            <template scope="scope">{{ scope.row.check_price ? scope.row.check_price : scope.row.pre_price }}</template>
                        </el-table-column>
                    </el-table>
                    <el-row class="statistics">
                        {{$t('total')}}：{{$t('billDetails.applyNum')}}：{{totalNum}} &nbsp; {{$t('billDetails.applyStockAmount')}}：{{totalStockMoney}} &nbsp; {{$t('billDetails.applyPriceAmount')}}：{{totalSaleMoney}} &nbsp; {{$t('billDetails.provisionalPriceAmount')}}：{{totalPreMoney}}
                    </el-row>
                </el-col>
                <el-col :span="4" class="btn-container right-btn-aside">
                    <el-row :gutter="4" class="right-menu-side" :style="{top: scrollTop}">
                        <el-col :span="24">
                            <el-button class="list-btn" type="primary" @click="goBack()">{{$t('btn.mainMenu')}}</el-button>
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
        <content-footer ref="contentFooter" :codes="codeArr"></content-footer>
    </section>
</template>

<script>
import Vue from 'vue'
import { Button, Row, Col, Table, TableColumn, Pagination, Loading } from 'element-ui'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Loading)
import shortcut from 'common/js/shortcut'
import ajaxUrl, { commonAjax } from 'common/js/api'
import ContentHeader from 'components/ContentHeader'
import ContentFooter from 'components/ContentFooter'
export default {
    data () {
        return {
            loading: true,
            scrollTop: 0,
            currentPage: 1,
            pageSize: 50,
            totalCount: 0,
            totalPage: 0,
            tableData: [],
            totalNum: 0,
            totalStockMoney: 0,
            totalSaleMoney: 0,
            totalPreMoney: 0,
            codeArr: []
        }
    },
    created () {
        this.getBillDetails()
    },
    mounted () {
        const _self = this
        shortcut.init({
            keyCodeArr: [
                { key: 'ESC', keyCode: 27, keyDec: 'btn.mainMenu', callback: () => { _self.goBack() } }
            ]
        })
        this.codeArr = shortcut.getBindCodes()
    },
    methods: {
        handleSizeChange (val) {
            this.currentPage = 1
            this.pageSize = val
            this.getBillDetails()
        },
        handleCurrentPageChange (val) {
            this.currentPage = val
            this.getBillDetails()
        },
        getBillDetails () {
            commonAjax({
                method: 'post',
                url: ajaxUrl.getBillDetails,
                data: {
                    page: this.currentPage,
                    size: this.pageSize
                },
                responseType: 'json'
            })
            .then((res) => {
                if (res.status === 0) {
                    this.loading = false
                    this.tableData = res.data.detail
                    this.currentPage = res.data.current_page
                    this.pageSize = res.data.page_size
                    this.totalCount = res.data.total_count
                    this.totalPage = res.data.total_page
                    this.totalNum = res.data.total_num
                    this.totalStockMoney = res.data.total_stock_money
                    this.totalSaleMoney = res.data.total_sale_money
                    this.totalPreMoney = res.data.total_pre_money
                }
            })
        },
        wrapperScroll (e) {
            this.scrollTop = `${e.target.scrollTop}px`
        },
        goBack () {
            this.$router.go(-1)
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
.bill-detail{
    padding: 15px;
    padding-bottom: 50px;
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
    .statistics{
        line-height: 40px;
        padding: 0 10px;
        border: 1px solid rgb(236, 223, 227);
        border-top: 0;
    }
}
</style>