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
      el-form-item(label="标题:" prop="actname")
        el-input.filter-item( placeholder="请输入标题" v-model="filterForm.actname" style="width: 200px; margin-right: 20px")
      el-form-item
          el-button.filter-item(
            type="primary"
            icon="el-icon-search"
            style="margin-left: 10px;"
            @click="search") 查询
    .layout-row(style="margin-bottom: 15px")
      el-button.filter-item(
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="add") 添加活动
      el-button(
        type="primary"
        icon="el-icon-delete"
        style="margin-left: 10px;"
        @click="onDelete"
        :disabled="deleteDisable") 批量更新
    .table-warp
      simple-table(
        :listLoading="tableLoading"
        :columns="columns"
        :list="tableData"
        :hasSelection='true'
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
import { tableList, deleteAct, modifyAct, addAct, batchSet } from '@/api/activity'
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
        actname: undefined
      },
      columns: [
        {
          prop: 'actname',
          label: '标题',
          align: 'center',
          width: 200
        },
        {
          prop: 'stuname',
          label: '发起人',
          align: 'center',
          width: 100
        },
        {
          prop: 'actdate',
          label: '活动时间',
          align: 'center'
        },
        {
          prop: 'actsite',
          label: '活动地点',
          align: 'center'
        },
        {
          prop: 'state',
          label: '状态',
          align: 'center',
          status: true
        },
        {
          prop: 'actimage',
          label: '图片',
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
        actname: ''
      },

      // 弹窗
      showDialog: false,
      formData: {
        actname: '',
        stuname: '',
        actdate: '',
        actsite: '',
        actimage: '',
        state: '1'
      },
      formItems: [
        { label: '标题', prop: 'actname', input: true },
        { label: '发起人', prop: 'stuname', input: true },
        { label: '时间', prop: 'actdate', time: true },
        { label: '地点', prop: 'actsite', input: true },
        { label: '状态', prop: 'state', radio: true, options: [{ label: '已通过', value: '1' }, { value: '0', label: '未通过' }] },
        { label: '图片', prop: 'actimage', upload: true, action: 'action="https://jsonplaceholder.typicode.com/posts/' }
      ],
      diaLogformRules: {
        actname: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        stuname: [{ required: true, message: '请输入发起人姓名', trigger: 'blur' }],
        actdate: [{ required: true, message: '请输入时间', trigger: 'blur' }],
        actsite: [{ required: true, message: '请输入地点', trigger: 'blur' }],
        actimage: [{ required: false, message: '请上传图片', trigger: 'change' }]
      },

      // 表格
      selectIds: [],
      isModify: false
    }
  },
  created() {},
  mounted() {
    this.onGetTableList()
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
      })
    },
    // 搜索
    search() {
      this.listQuery.actname = this.filterForm.actname
      this.onGetTableList()
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
        this.formData = Object.assign(this.formData, row)
      } else {
        this.formData = {
          actname: '',
          stuname: '',
          actdate: '',
          actsite: '',
          actimage: '',
          state: ''
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
        deleteAct({ ids: id }).then((res) => {
          debugger
          if (res.data.code === 0) {
            this.onGetTableList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加
    add() {
      this.isModify = false
      this.onModify()
    },
    /**
     * @description onConfirm 表单提交
     * @param {Object} [formData] 表单数据
     */
    onConfirm(formData) {
      if (this.isModify) {
        modifyAct(formData).then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.message)
            this.onGetTableList()
            this.showDialog = false
            this.isModify = false
          }
        })
      } else {
        addAct(formData).then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.message)
            this.onGetTableList()
            this.showDialog = false
            this.isModify = false
          }
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
