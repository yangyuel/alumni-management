<template lang="pug">
.user.app-container(style="display:flex;flex:1")
  .content(style="width:100%;")
    el-form(
      style="width:60%;"
      :model="filterForm"
      ref="filterForm"
      :inline="true"
      label-width="120px"
      label-position="right"
      )
      .layout-row(style="margin-bottom: 15px")
        el-button(type="primary" icon="el-icon-circle-plus-outline" @click="apply") 申请捐赠
    .table-warp
      simple-table(
        :listLoading="tableLoading"
        :columns="columns"
        :list="tableData"
        :hasSelection='false'
        :hasPopover="false"
        :totalCount="totalCount"
        :listQuery="listQuery"
        @onGetList="onGetTableList"
        @onModify="onModify"
        @onDelete="onDelete"
        @onSelectionChange="onSelectionChange"
      )
  modify-dialog(
    :show="showDialog"
    @onClose="showDialog = false"
    @onConfirm="onConfirm"
    :formData="formData"
    :items="formItems"
    :rules="diaLogformRules"
  )
</template>

<script>
import { tableList, deleteDonate, modifyDonate, addDonate } from '@/api/donate'
import ModifyDialog from '@/components/SimpleDialog'
import SimpleTable from '@/components/Table/SimpleTable'
export default {
  name: 'User',
  components: {
    SimpleTable,
    ModifyDialog
  },
  data() {
    return {
      deleteDisable: true,
      tableLoading: false,
      totalCount: 50,
      // 列表查询参数
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        management: undefined
      },
      columns: [
        {
          prop: 'stuname',
          label: '捐赠人姓名',
          align: 'center',
          width: 100
        },
        {
          prop: 'actdate',
          label: '捐赠项目',
          align: 'center'
        },
        {
          prop: 'state',
          label: '捐赠金额',
          align: 'center'
        },
        {
          prop: 'actImage',
          label: '捐赠人联系方式',
          align: 'center'
        },
        {
          prop: 'www',
          label: '捐赠人院系/单位',
          align: 'center'
        }
      ],
      tableData: [],
      operationWidth: '300',

      // 表单
      filterForm: {
        actName: ''
      },

      // 弹窗
      showDialog: false,
      formData: {
        stuname: '',
        actdate: '',
        state: '',
        actImage: '',
        www: ''
      },
      formItems: [
        { label: '捐赠人', prop: 'stuname', input: true },
        { label: '项目', prop: 'actdate', input: true },
        { label: '金额', prop: 'state', input: true },
        { label: '联系方式', prop: 'actImage', input: true },
        { label: '单位', prop: 'www', input: true }
      ],
      diaLogformRules: {
        stuname: [{ required: true, message: '请输入捐赠人', trigger: 'blur' }],
        actdate: [{ required: true, message: '请输入捐赠项目', trigger: 'blur' }],
        state: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        actImage: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        www: [{ required: true, message: '请输入单位', trigger: 'blur' }]
      },

      // 表格
      selectIds: [],
      isModify: false
    }
  },
  created() {
    this.onGetTableList()
  },
  mounted() {

  },
  methods: {
    /**
     * @description onGetTableList 获取表格列表
     */
    onGetTableList() {
      this.listLoading = true
      tableList(this.listQuery).then(res => {
        this.tableData = res.data.data.records
        this.totalCount = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    apply() {
      this.showDialog = true
    },
    /**
     * @description onConfirm 表单提交
     * @param {Object} [formData] 表单数据
     */
    onConfirm(formData) {
      addDonate(formData).then(res => {
        this.$message.success('添加成功')
        this.onGetTableList()
        this.showDialog = false
        this.isModify = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user{
  .content{
    display: flex;
    flex: 1;
    flex-direction: column;
    /deep/ .el-form-item{
      margin-bottom: 10px
    }
    .table-warp{
      display: flex;
      flex: 1;
      flex-direction: column;
    }
  }
}
</style>
