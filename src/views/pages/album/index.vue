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
      el-button.filter-item(
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="add") 添加
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
import { tableList, addPhoto, downloadPhoto } from '@/api/photo'
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
          prop: 'module',
          label: '模块',
          align: 'center'
        },
        {
          prop: 'photo',
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

      // 弹窗
      showDialog: false,
      formData: {
        module: '',
        photo: ''
      },
      formItems: [
        { label: '模块', prop: 'module', input: true },
        { label: '图片', prop: 'photo', upload: true, action: '/common/fileUpload', success: function() {

        } }
      ],
      diaLogformRules: {
        module: [{ required: true, message: '请输入序号', trigger: 'blur' }],
        photo: [{ required: false, message: '请输入名称', trigger: 'blur' }]
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
        res.data.data.records.forEach(item => {
          downloadPhoto({ filePath: item.photo }).then(pho => {
            item.photo = pho.data
          })
        })
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
        this.formData = Object.assign(this.formData, row)
      } else {
        this.formData = {
          module: '',
          photo: ''
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
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = []
        row ? id.push(row.id) : id = this.selectIds
        deleteUser({ ids: JSON.stringify(id) }).then((res) => {
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
        modifyUser(formData).then(res => {
          this.$message.success('修改成功')
          this.onGetTableList()
          this.showDialog = false
          this.isModify = false
        })
      } else {
        addPhoto(formData).then(res => {
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
