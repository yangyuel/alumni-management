<template lang="pug">
.app-container.layout-row.flex
  .content.layout-column.flex
    .filter-container
      el-form.filter-form(
        :model="filterForm"
        ref="filterForm"
        inline
        )
        .form-inline.filter-item.form-label
          el-form-item(label="标题:" prop="name")
            el-input( placeholder="请输入标题名称" v-model="filterForm.name")
          el-form-item.search-btn-group
            el-button.filter-item(type="primary" icon="el-icon-search" @click="searchNew") 查询
            el-button.filter-item(type="warning" icon="el-icon-refresh" @click="resetFields") 重置
      .layout-row
        el-button(type="primary" icon="el-icon-circle-plus-outline" @click="addNew") 新增
        el-button(type="danger" icon="el-icon-delete" @click="deleteNew" :disabled="deleteDisable") 批量删除
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
      @onGetList="getTableList"
      @onModify="onModify"
      @onDelete="deleteNew"
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
import { tableList, addNews, deleteNews } from '@/api/news'
import ModifyDialog from '@/components/SimpleDialog'
import SimpleTable from '@/components/Table/SimpleTable'
export default {
  name: 'News',
  components: {
    SimpleTable,
    ModifyDialog
  },
  data() {
    return {
      deleteDisable: true,
      tableLoading: false,
      totalCount: 50,
      listQuery: {
        current: 1,
        size: 10,
        name: undefined
      },
      columns: [
        {
          prop: 'name',
          label: '模块',
          align: 'center',
          width: 200
        },
        {
          prop: 'describe',
          label: '标题',
          align: 'center'
        },
        {
          prop: 'createdTime',
          label: '图片',
          align: 'center'
        }
      ],
      tableData: [],
      operationWidth: '300',
      // 角色操作按钮
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

      // 搜索条件
      filterForm: {
        name: ''
        // permission: ''
      },
      options: [],
      // 弹窗
      showDialog: false,
      // 角色参数
      formData: {
        name: '',
        describe: '',
        content: '',
        img: ''
      },
      // 弹窗表单配置项
      formItems: [
        { label: '标题', prop: 'name', input: true },
        { label: '模块', prop: 'describe', input: true },
        { label: '内容', prop: 'content', input: true },
        { label: '图片', prop: 'img', upload: true }
      ],
      diaLogformRules: {
        name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        describe: [
          { required: true, message: '请输入模块内容', trigger: 'blur' }
        ],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      // 选中行的ID数组
      selectIds: [],
      isModify: false
    }
  },
  created() {
    this.getTableList()
  },
  mounted() {
    // 通知消息测试
    this.$showNotice('123', '1234')
  },
  methods: {
    /**
     * @auther
     * @description  getTableList 获取表格数据（获取
     */
    getTableList() {
      this.listLoading = true
      tableList(this.listQuery).then(res => {
        this.tableData = res.data.data.records
        this.totalCount = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    /*
     * @auther
     * @description getPermissionList 获取权限列表（获取)
    getPermissionList() {
      var indexs = this.formItems.findIndex(item => {
        return item.prop === 'permission'
      })
      this.formItems[indexs].options = []
      this.options = this.formItems[indexs].options
      this.$store.dispatch('GetUserInfo').then(res => {
        const permission = res.data.permission
        this.formItems[indexs].options = permission
      })
    }, */
    /**
     * @auther
     * @description searchNew 搜索角色（搜索）
     * @param {String} [listQuery] 传给后台的筛选条件
     */
    searchNew() {
      this.listQuery.name = this.filterForm.name
      // this.listQuery.permission = this.filterForm.permission
      this.getTableList()
    },
    /**
     * @auther
     * @description onModify 编辑表格 (编辑)
     * @param {Number} [index] 表格操作栏按钮的索引
     * @param {Object} [row] 当前行数据
     */
    onModify(index, row) {
      if (row) {
        this.isModify = true
        this.formData = Object.assign(this.formData, row)
        this.getPermissionList()
      } else {
        this.formData = {
          name: '',
          describe: '',
          content: '',
          img: ''
        }
      }
      this.showDialog = true
    },
    /**
     * @auther
     * @description deleteNew 删除表格数据 (删除)
     * @param {Number} [index] 表格操作栏按钮的索引
     * @param {Object} [row] 当前行数据
     */
    deleteNew(index, row) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let id = []
          row ? id.push(row.id) : (id = this.selectIds)
          deleteNews({ ids: JSON.stringify(id) }).then(res => {
            // console.log(res)
            this.getTableList()
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
    /**
     * @auther
     * @description addNew 添加表格数据 (添加)
     * @params
     */
    addNew() {
      this.isModify = false
      this.onModify()
    },
    /**
     * @auther
     * @description  onConfirm 提交添加/修改表单数据 (提交)
     * @param {Object} [formData] 角色参数
     */
    onConfirm(formData) {
      if (this.isModify) {
        modifyNews(formData).then(res => {
          this.$message.success('修改成功')
          this.getTableList()
          this.showDialog = false
          this.isModify = false
        })
      } else {
        addNews(formData).then(res => {
          this.$message.success('添加成功')
          this.getTableList()
          this.showDialog = false
          this.isModify = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
