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
    .table-warp
      simple-table(
        :listLoading="tableLoading"
        :columns="columns"
        :list="tableData"
        :hasSelection='false'
        :hasPopover="false"
        :operation="operation"
        :operationWidth="operationWidth"
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
      operation: [
        { type: 'primary', size: 'mini', icon: 'el-icon-edit', title: '编辑', id: 1, fn: 'onModify' },
        { type: 'danger', size: 'mini', icon: 'el-icon-delete', title: '删除', id: 2, fn: 'onDelete' }
      ],

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
    /**
     * @description onSelectionChange 表格勾选时
     * @param {Array} [val] 被勾选的数据行
     */
    onSelectionChange(val) {
      val.length > 0 ? this.deleteDisable = false : this.deleteDisable = true
      this.selectIds = []
      val.map(user => {
        this.selectIds.push(user.id)
      })
    },
    /**
     * @description onModify 编辑行
     * @param {Object} [row] 点击修改按钮的行的数据
     */
    onModify(index, row) {
      // console.log(row)
      if (row) {
        this.isModify = true
        debugger
        this.formData = Object.assign(this.formData, row)
      } else {
        this.formData = {
          stuname: '',
          actdate: '',
          state: '',
          actImage: '',
          www: ''
        }
      }
      /* var indexs = this.formItems.findIndex(item => {
        return item.prop === 'role'
      })
      this.formItems[indexs].options = []
      this.$store.dispatch('GetUserInfo').then((res) => {
        const roles = res.data.controlRoles
        roles.map(item => {
          this.formItems[indexs].options.push({
            label: item,
            value: item
          })
        }) */
      this.showDialog = true
      // })
    },
    /**
     * @description onDelete 删除行
     * @param {Object} [row] 点击删除按钮的行的数据
     */
    onDelete(index, row) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = []
        row ? id.push(row.id) : id = this.selectIds
        const idData = id.join(',')
        deleteDonate({ ids: idData }).then((res) => {
          // console.log(res)
          this.onGetTableList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * @description onConfirm 表单提交
     * @param {Object} [formData] 表单数据
     */
    onConfirm(formData) {
      if (this.isModify) {
        modifyDonate(formData).then(res => {
          this.$message.success('修改成功')
          this.onGetTableList()
          this.showDialog = false
          this.isModify = false
        })
      } else {
        addDonate(formData).then(res => {
          this.$message.success('添加成功')
          this.onGetTableList()
          this.showDialog = false
          this.isModify = false
        })
      }
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
