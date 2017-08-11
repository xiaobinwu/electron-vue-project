<template>
    <section class="wrapper" @scroll="wrapperScroll($event)">
        <content-header :title="$t('form.title')" :sub-title="$tc('form.subTitle', 0)" :is-add-shortcut="isAddShortcut" @fastmenuchange="fastMenuChange"></content-header>
        <section class="pre-expired-list">
            <el-row :gutter="15" class="search-el-row">
                <el-col :span="20">
                    <el-form :inline="true" :model="formData" ref="form">
                        <el-row class="search-container">
                            <el-col :span="24">
                                <div class="search-item">
                                    <el-form-item :label="$t('form.producedDateLabel')" prop="producedDate">
                                        <el-date-picker
                                          v-model="formData.producedDate"
                                          type="datetimerange"
                                          :picker-options="pickerOptions"
                                          :placeholder="$t('form.producedDatePlaceholder')"
                                          align="right" class="m-date-picker" format="yyyy-MM-dd">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="search-item">
                                    <el-form-item :label="$t('form.overdueDateLabel')" prop="overdueDate">
                                        <el-date-picker
                                          v-model="formData.overdueDate"
                                          type="datetimerange"
                                          :picker-options="pickerOptions"
                                          :placeholder="$t('form.overdueDatePlaceholder')"
                                          align="right" class="m-date-picker" format="yyyy-MM-dd">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="search-item">
                                    <el-form-item :label="$t('form.curNum')" prop="numCompare">
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
                                    <el-form-item :label="$t('form.shelfLifeLabel')" prop="shelfLife">
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
                                        <label class="control-label">{{$t('customTime.day')}}</label>
                                    </el-form-item>
                                </div>
                                <div class="search-item">
                                    <el-form-item :label="$t('form.barcodeLabel')" prop="barcode">
                                        <el-input v-model="formData.barcode" class="barcode"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="search-item">
                                    <el-form-item :label="$t('form.skuLabel')" prop="sku">
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
                            <el-button class="list-btn" type="primary" @click="inquire()">{{$t('btn.inquire')}}</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="reset()">{{$t('btn.reset')}}</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="dataExport()">{{$t('btn.export')}}</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="15" class="list-table">
                <el-col :span="20">
                     <el-table
                        ref="multipleTable"
                        :data="tableData"
                        v-loading="loading"
                        element-loading-text="loading..."
                        border
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange"
                        style="width: 100%;"
                        highlight-current-row
                        :empty-text = "$t('table.noData')"
                        row-class-name="table-row">

                        <el-table-column
                          type="selection">
                        </el-table-column>

                        <el-table-column
                            label="id">
                            <template scope="scope">
                                {{scope.row.id}}
                            </template>
                        </el-table-column>

                        <el-table-column
                            :label="$t('table.barcode')"
                            prop="barcode">
                        </el-table-column>
                        <el-table-column
                            :label="$t('table.goodsName')"
                            prop="goods_name">
                        </el-table-column>
                        <el-table-column
                            :label="$t('table.hdShopCode')"
                            prop="hd_shop_code">
                        </el-table-column>
                        <el-table-column
                            :label="$t('table.validPeriod')">
                            <template scope="scope">
                                {{scope.row.produce_date}} -- {{scope.row.expiry_date}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :label="$t('table.shelfLife')"
                            prop="shelf_life">
                        </el-table-column>
                        <el-table-column
                            :label="$t('table.remainingShelfLife')"
                            prop="last_shelf_life">
                        </el-table-column>
                        <el-table-column
                            :label="$t('table.currentNumber')"
                            prop="stock">
                        </el-table-column>
                        <el-table-column
                            :label="$t('table.updateDate')">
                            <template scope="scope">{{ scope.row.updated_at }}</template>
                        </el-table-column>
                      </el-table>
                </el-col>
                <el-col :span="4" class="btn-container right-btn-aside">
                    <el-row :gutter="4" class="right-menu-side" :style="{top: scrollTop}">
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="tplDownload()">{{$t('btn.tplDownload')}}</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="dataImport()">{{$t('btn.import')}}</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="add()">{{$t('btn.add')}}</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="edit()">{{$t('btn.edit')}}</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="deleteData()">{{$t('btn.delete')}}</el-button>
                        </el-col>
                        <el-col :span="24">
                            <div class="line"></div>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="goPrePage()">{{$t('btn.prePage')}}</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button class="list-btn" type="primary" @click="goNextPage()">{{$t('btn.nextPage')}}</el-button>
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

        <el-dialog :title="$t('temporaryImport')" :visible.sync="dialogImportVisible" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">

            <el-upload
              class="import-data-uploader"
              ref="importUploader"
              :action="uploadAction"
              :multiple="false"
              :auto-upload="false"
              :disabled="uploadDisabled"
              :accept="accept"
              :on-success="uploadSuccess"
              :on-change="uploadChange"
              :on-remove="uploadRemove"
              :on-error="uploadError">
                <el-button size="small" type="primary">{{$t('selectFileText')}}</el-button>
                <div slot="tip" class="el-upload__tip">{{$t('selectFileTip')}}</div>
            </el-upload>

            <div slot="footer" class="dialog-footer">
                <el-button @click="uploadCancel">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="submitUpload">{{$t('upload')}}</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { remote, ipcRenderer } from 'electron'
import Vue from 'vue'
import { Button, Row, Col, DatePicker, Select, Option, Input, Table, TableColumn, Pagination, Message, Form, FormItem, Dialog, Upload, Loading } from 'element-ui'
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Loading)
import { getStore, setFastMenuStore } from 'common/js/storage'
import shortcut from 'common/js/shortcut'
import { getNowFormatDate } from 'common/js/time'
import { exportTableToExcel } from 'common/js/excel'
import ajaxUrl, { commonAjax } from 'common/js/api'
import ContentHeader from 'components/ContentHeader'
import ContentFooter from 'components/ContentFooter'

// accept类型
const SheetJSFT = [
    'xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv', 'txt', 'ods', 'fods', 'uos', 'sylk', 'dif', 'dbf', 'prn', 'qpw', '123', 'wb*', 'wq*'
].map((x) => { return '.' + x }).join(',')

const getPickerOptions = (_this) => {
    return {
        shortcuts: [{
            text: _this.$t('customTime.nowadays'),
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                picker.$emit('pick', [start, end])
            }
        }, {
            text: _this.$t('customTime.yesterday'),
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: _this.$t('customTime.lastWeek'),
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: _this.$t('customTime.lastMonth'),
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: _this.$t('customTime.lastTreeMonth'),
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
            }
        }]
    }
}

export default {
    data () {
        return {
            loading: true,
            isAddShortcut: false,
            scrollTop: 0,
            currentPage: 1,
            pageSize: 50,
            totalCount: 0,
            totalPage: 0,
            addVisible: false,
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
            codeArr: [],
            pickerOptions: getPickerOptions(this),
            tableData: [],
            multipleSelection: [],
            accept: SheetJSFT,
            dialogImportVisible: false,
            uploadDisabled: false,
            uploadAction: ajaxUrl.preExpiredImportUrl
        }
    },
    created () {
        this.getPreExpiredList()
        this.getFastMenuStatus()
    },
    mounted () {
        const _self = this
        shortcut.init({
            keyCodeArr: [
                { key: 'ESC', keyCode: 27, keyDec: 'btn.mainMenu', callback: () => { _self.goBack() } },
                { key: 'F1', keyCode: 112, keyDec: 'btn.inquire', callback: () => { _self.inquire() } },
                { key: 'F2', keyCode: 113, keyDec: 'btn.reset', callback: () => { _self.reset() } },

                { key: 'F5', keyCode: 116, keyDec: 'btn.add', callback: () => { _self.add() } },
                { key: 'F6', keyCode: 117, keyDec: 'btn.edit', callback: () => { _self.edit() } },
                { key: 'F7', keyCode: 118, keyDec: 'btn.delete', callback: () => { _self.deleteData() } },
                { key: 'F8', keyCode: 119, keyDec: 'btn.import', callback: () => { _self.dataExport() } },
                { key: 'F9', keyCode: 120, keyDec: 'btn.import', callback: () => { _self.tplDownload() } },
                { key: 'F10', keyCode: 121, keyDec: 'btn.import', callback: () => { _self.dataImport() } },

                { key: 'F11', keyCode: 122, keyDec: 'btn.prePage', callback: () => { _self.goPrePage() } },
                { key: 'F12', keyCode: 123, keyDec: 'btn.nextPage', callback: () => { _self.goNextPage() } }
            ]
        })
        this.codeArr = shortcut.getBindCodes()
        this.$watch('$i18n.locale', (newVal, oldVal) => {
            // element 自定义datePicker时使用il18n
            this.pickerOptions = getPickerOptions(this)
        })
        // 监听electron应用下载文件状态信息
        ipcRenderer.on('downloads-msg', (event, status, msg) => {
            if (status === 1) {
                Message({
                    message: msg,
                    type: 'success',
                    duration: 1000
                })
            } else {
                Message({
                    message: msg,
                    type: 'error',
                    duration: 1000
                })
            }
        })
    },
    methods: {
        submitUpload () {
            this.$refs.importUploader.submit()
        },
        uploadChange (file, fileList) {
            if (fileList.length === 1) {
                this.uploadDisabled = true
            }
        },
        uploadRemove (file, fileList) {
            if (fileList.length < 1) {
                this.uploadDisabled = false
            }
        },
        uploadSuccess (response, file, fileList) {
            // console.log(response)
            // console.log(file)
            // console.log(fileList)
            this.loading = true
            this.getPreExpiredList()
            this.uploadCancel()
        },
        uploadError (err, file, fileList) {
            // console.log(err)
            // console.log(file)
            // console.log(fileList)
            Message({
                message: file.name + this.$t('uploadFailed'),
                type: 'error',
                duration: 1000
            })
            this.uploadDisabled = false
            this.$refs.importUploader.clearFiles()
        },
        uploadCancel () {
            this.dialogImportVisible = false
            this.uploadDisabled = false
            this.$refs.importUploader.clearFiles()
        },
        getFastMenuStatus () {
            let fastMenus = JSON.parse(getStore('fastMenus')) || {}
            this.isAddShortcut = !!fastMenus[this.$route.fullPath]
        },
        fastMenuChange (hasShortcut) {
            // 第二个参数，保存的是对应语言包字符串标志
            setFastMenuStore(hasShortcut, 'form.subTitle|0', this)
        },
        inquire () {
            this.currentPage = 1
            this.pageSize = 50
            this.loading = true
            this.getPreExpiredList()
        },
        goPrePage () {
            if (this.currentPage !== 1) {
                this.currentPage--
                this.loading = true
                this.getPreExpiredList()
            } else {
                Message({
                    message: this.$t('message.msg2'),
                    type: 'error',
                    duration: 1000
                })
            }
        },
        goNextPage () {
            if (this.currentPage !== this.totalPage) {
                this.currentPage++
                this.loading = true
                this.getPreExpiredList()
            } else {
                Message({
                    message: this.$t('message.msg3'),
                    type: 'error',
                    duration: 1000
                })
            }
        },
        reset () {
            this.$refs.form.resetFields()
        },
        tplDownload () {
            remote.getCurrentWebContents().downloadURL(ajaxUrl.preExpiredListTpl)
        },
        dataImport () {
            this.dialogImportVisible = this.dialogImportVisible ? false : true
        },
        add () {
            this.addVisible = true
        },
        addRecord () {

        },
        deleteData () {
            alert('删除')
        },
        edit () {
            alert('编辑')
        },
        dataExport () {
            exportTableToExcel(this.$refs.multipleTable.$el, this.$t('form.title') + getNowFormatDate(false))
        },
        handleSizeChange (val) {
            this.currentPage = 1
            this.pageSize = val
            this.loading = true
            this.getPreExpiredList()
        },
        handleCurrentPageChange (val) {
            this.currentPage = val
            this.loading = true
            this.getPreExpiredList()
        },
        getPreExpiredList () {
            commonAjax({
                method: 'post',
                url: ajaxUrl.getPreExpiredList,
                data: Object.assign({}, {
                    page: this.currentPage,
                    size: this.pageSize
                }, this.formData),
                responseType: 'json'
            })
            .then((res) => {
                if (res.status === 0) {
                    this.loading = false
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
        handleSelectionChange (val) {
            this.multipleSelection = val
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
.pre-expired-list{
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