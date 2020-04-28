<template lang="pug">
.regulations.app-container(style="display:flex;flex:1")
  .content(style="width:100%;")
    el-form(
      style="width:100%;"
      :model="filterForm"
      ref="filterForm"
      :inline="true"
      label-width="120px"
      label-position="right"
      )
      el-form-item(label="姓名:" prop="name")
        el-input.filter-item(
            placeholder="请输入姓名"
            v-model="filterForm.name"
            @keyup.enter.native="search"
            clearable
            )
      el-form-item(label="学号:" prop="code")
        el-input.filter-item(
          v-model="filterForm.code"
            placeholder="请输入学号"
            @keyup.enter.native="search"
            clearable
            )
      el-form-item
          el-button.filter-item(
            type="primary"
            icon="el-icon-search"
            style="margin-left: 10px;"
            @click="search") 搜索
    .layout-row(style="margin-bottom: 15px")
      el-button.filter-item(
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="add") 新增
      el-button(
        type="danger"
        icon="el-icon-delete"
        style="margin-left: 10px;"
        @click="onDelete"
        :disabled="deleteDisable") 批量删除
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
/* import {
  getRegulations,
  deleteRegulations,
  modifyRegulations,
  addRegulations
} from '@/api/user' */
import ModifyDialog from '@/components/SimpleDialog'
import SimpleTable from '@/components/Table/SimpleTable'
export default {
  name: 'Regulations',
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
        limit: 20,
        name: '',
        code: ''
      },
      columns: [
        {
          prop: 'stuName',
          label: '姓名',
          align: 'center',
          fixed: 'fixed',
          width: 200
        },
        {
          prop: 'stuSex',
          label: '性别',
          align: 'center'
        },
        {
          prop: 'stuNum',
          label: '学号',
          align: 'center'
        },
        {
          prop: 'phone',
          label: '联系电话',
          align: 'center'
        },
        {
          prop: 'mailbox',
          label: '邮箱',
          align: 'center'
        }
        // },
        // {
        //   prop: 'phone',
        //   label: '联系电话',
        //   align: 'center'
        // },
        // {
        //   prop: 'createdTime',
        //   label: '创建时间',
        //   align: 'center'
        // },
        // {
        //   prop: 'modifyTime',
        //   label: '更新时间',
        //   align: 'center'
        // }
      ],
      tableData: [],
      operationWidth: '300',
      operation: [
        {
          type: 'primary',
          size: 'mini',
          icon: 'el-icon-edit',
          title: '编辑',
          id: 1,
          fn: 'onModify'
        },
        {
          type: 'danger',
          size: 'mini',
          icon: 'el-icon-delete',
          title: '删除',
          id: 2,
          fn: 'onDelete'
        }
      ],
      // 表单
      filterForm: {
        name: '',
        code: ''
      },
      // 弹窗
      showDialog: false,
      formData: {
        stuName: '',
        stuSex: '',
        stuNum: '',
        phone: '',
        mailbox: ''
      },
      formItems: [
        { label: '姓名', prop: 'stuName', input: true, type: 'text' },
        { label: '性别', prop: 'stuSex', input: true, type: 'text' },
        { label: '学号', prop: 'stuNum', input: true, type: 'text' },
        { label: '联系电话', prop: 'phone', input: true, type: 'text' },
        { label: '邮箱', prop: 'mailbox', input: true, type: 'text' }
      ],
      diaLogformRules: {
        stuName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        stuSex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        stuNum: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        mailbox: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      },

      // 表格
      selectIds: [],
      isModify: false
    }
  },
  created() {
    this.onGetTableList()
  },
  mounted() {},
  methods: {
    /**
     * @description onGetTableList 获取表格列表
     */
    onGetTableList() {
      this.tableLoading = true
      getRegulations(this.listQuery).then(res => {
        this.tableData = res.data.items
        this.totalCount = res.data.total
        setTimeout(() => {
          this.tableLoading = false
        }, 0.5 * 1000)
      })
    },
    // 搜索
    search() {
      // !this.filterForm.keyword && this.$message.error('请输入需要搜索的内容！')
      this.listQuery.name = this.filterForm.name
      this.listQuery.code = this.filterForm.code
      this.onGetTableList()
    },
    /**
     * @description onSelectionChange 表格勾选时
     * @param {Array} [val] 被勾选的数据行
     */
    onSelectionChange(val) {
      val.length > 0
        ? (this.deleteDisable = false)
        : (this.deleteDisable = true)
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
          stuName: '',
          stuSex: '',
          stuNum: '',
          phone: '',
          mailbox: ''
        }
      }
      this.showDialog = true
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
      })
        .then(() => {
          let id = []
          row ? id.push(row.id) : (id = this.selectIds)
          deleteRegulations({ ids: JSON.stringify(id) }).then(res => {
            // console.log(res)
            this.onGetTableList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
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
        modifyRegulations(formData).then(res => {
          this.$message.success('修改成功')
          this.onGetTableList()
          this.showDialog = false
          this.isModify = false
        })
      } else {
        addRegulations(formData).then(res => {
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
.regulations {
  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    /deep/ .el-form-item {
      margin-bottom: 10px;
    }
    .table-warp {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
  }
}
</style>
