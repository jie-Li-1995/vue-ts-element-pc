<template>
  <div class='email_setting'>
    <div class='batch filterDiv clear-fix'>
      <el-button class='SignUpBtn' @click='openAdd'>Add New</el-button>
      <el-button class='SignUpBtn' @click='deleteItems'>Delete</el-button>
      <el-tooltip content='Search' placement='top'>
                <span class='filterIcon' @click='searchDialog = true' title='filter'>
                       <i class='fa el-icon-search' aria-hidden='true'></i>
                </span>
      </el-tooltip>
    </div>
    <el-table :data='tableData' stripe border tooltip-effect='dark' style='width: 100%'
              @selection-change='handleSelectionChange'>
      <el-table-column type='selection' width='55'></el-table-column>
      <el-table-column align='center' width='100' label='Operation'>
        <template slot-scope='scope'>
          <el-tooltip content='Edit' placement='top'>
            <el-button type='text' size='small' class='button1' icon='icon-edit'
                       @click='handleClickEdit(scope.row)'></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop='LEG' label='FM' show-overflow-tooltip></el-table-column>
      <el-table-column prop='ATL' label='ATL' show-overflow-tooltip></el-table-column>
      <el-table-column prop='SQE' label='SQE' show-overflow-tooltip></el-table-column>
      <el-table-column prop='Buyer' label='Buyer' show-overflow-tooltip></el-table-column>
      <el-table-column prop='consumer' label='Info' show-overflow-tooltip></el-table-column>
    </el-table>

    <el-pagination
      @size-change='handleSizeChange'
      @current-change='handleCurrentChange'
      :current-page='page.PageIndex'
      :page-sizes='pageSizes'
      :page-size='page.PageSize'
      layout='total, sizes, prev, pager, next, jumper'
      :total='page.DataTotalCount'
    ></el-pagination>

    <el-dialog :visible.sync='editDialog' width='30%'>
      <h3 class='EditTitle'>{{editStats ? 'Edit' : 'Add'}}</h3>
      <div class='createMessage'>
        <el-form label-width='50px' label-position='left'>
          <el-form-item label='FM'>
            <el-input v-model='addData.LEG' placeholder='Please Enter FM'></el-input>
          </el-form-item>
          <el-form-item label='ATL'>
            <el-select v-model='addData.ATL' collapse-tags multiple placeholder='Please Select ATL'>
              <el-option
                v-for='item in ALLOption.ATL'
                :key='item.ApprovalId'
                :label='item.Name'
                :value='item.ApprovalId'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='SQE'>
            <el-select v-model='addData.SQE' collapse-tags multiple placeholder='Please Select SQE'>
              <el-option
                v-for='item in ALLOption.SQE'
                :key='item.ApprovalId'
                :label='item.Name'
                :value='item.ApprovalId'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='Buyer'>
            <el-select v-model='addData.Buyer' collapse-tags multiple placeholder='Please Select Buyer'>
              <el-option
                v-for='item in ALLOption.Buyer'
                :key='item.ApprovalId'
                :label='item.Name'
                :value='item.ApprovalId'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='Info'>
            <el-select v-model='addData.consumer' collapse-tags multiple placeholder='Please Select Info'>
              <el-option
                v-for='item in ALLOption.consumer'
                :key='item.ApprovalId'
                :label='item.Name'
                :value='item.ApprovalId'>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer borderFooter'>
          <el-button @click='editDialog = false'>Cancel</el-button>
          <el-button type='primary' @click='save'>Save</el-button>
        </div>
      </div>
    </el-dialog>
    <!--search-->
    <el-dialog :visible.sync='searchDialog' width='30%'>
      <h3 class='EditTitle'>Search</h3>
      <div class='CommentForm'>
        <el-form label-width='80px'>
          <el-form-item label='FM:'>
            <el-input v-model='searchData.FM' placeholder='Please enter FM'>
              <template slot='prepend'>
                <el-tooltip
                  class='item'
                  effect='dark'
                  content='Exact search'
                  placement='top'
                  v-if="searchTypeStyle('FM') === 'el-icon-star-on'"
                >
                  <i :class="searchTypeStyle('FM')" @click="searchType('FM')"/>
                </el-tooltip>
                <el-tooltip
                  class='item'
                  effect='dark'
                  content='Fuzzy search'
                  placement='top'
                  v-else
                >
                  <i :class="searchTypeStyle('FM')"
                     @click="searchType('FM')"></i>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label='ATL:'>
            <el-select v-model='searchData.ATL' clearable placeholder='Please select ATL'>
              <el-option
                v-for='item in ALLOption.ATL'
                :key='item.ApprovalId'
                :label='item.Name'
                :value='item.ApprovalId'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='SQE:'>
            <el-select v-model='searchData.SQE' clearable placeholder='Please select SQE'>
              <el-option
                v-for='item in ALLOption.SQE'
                :key='item.ApprovalId'
                :label='item.Name'
                :value='item.ApprovalId'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='Buyer:'>
            <el-select v-model='searchData.Buyer' clearable placeholder='Please select Buyer'>
              <el-option
                v-for='item in ALLOption.Buyer'
                :key='item.ApprovalId'
                :label='item.Name'
                :value='item.ApprovalId'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='Info:'>
            <el-select v-model='searchData.consumer' clearable placeholder='Please select Info'>
              <el-option
                v-for='item in ALLOption.consumer'
                :key='item.ApprovalId'
                :label='item.Name'
                :value='item.ApprovalId'>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer borderFooter'>
          <el-button @click='clearSearchData'>Clear</el-button>
          <el-button type='primary' @click='tableList'>Search</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { EmailSettingApi } from '@/api'
import { NormalObject, pageSize } from '@/utils'

@Component
export default class EmailSetting extends Vue {
  pageSizes: number[] = pageSize
  editDialog = false
  searchDialog = false
  editStats = false
  multipleSelection: string[] = []
  options = []
  tableData: NormalObject[] = []
  searchData: NormalObject = {
    FM: '',
    FMType: 1,
    ATL: '',
    SQE: '',
    Buyer: '',
    consumer: ''
  }

  ALLOption: NormalObject = {
    Buyer: [],
    ATL: [],
    SQE: [],
    consumer: []
  }

  page: NormalObject = {
    PageIndex: 1,
    PageSize: 25,
    DataTotalCount: 0
  }

  addData: NormalObject = {
    LEG: '',
    Buyer: [],
    ATL: [],
    SQE: [],
    consumer: []
  }

  mounted () {
    this.tableList()
    this.GetMailboxConfiguration()
  }

  searchType (item: string) {
    this.searchData[item + 'Type'] = this.searchData[item + 'Type'] ? 0 : 1
  }

  searchTypeStyle (item: string) {
    return !this.searchData[item + 'Type'] ? 'el-icon-star-on' : 'el-icon-star-off'
  }

  clearSearchData () {
    for (const key in this.searchData) {
      this.searchData[key] = ''
    }
    this.searchData.FMType = 1
  }

  async GetMailboxConfiguration () {
    const res = await EmailSettingApi.GetMailboxConfiguration({ LEG: '' })
    if (res.data.Success) {
      this.ALLOption.Buyer = res.data.Data.All.Buyer || []
      this.ALLOption.ATL = res.data.Data.All.ATL || []
      this.ALLOption.SQE = res.data.Data.All.SQE || []
      this.ALLOption.consumer = res.data.Data.All.consumer || []
    }
  }

  handleSelectionChange (arr: []) {
    this.multipleSelection = (arr as []).map((item: { LEG: string }) => item.LEG)
  }

  openAdd () {
    this.editStats = false
    this.addData = {
      LEG: '',
      Buyer: [],
      ATL: [],
      SQE: [],
      consumer: []
    }
    this.editDialog = true
  }

  handleClickEdit (item: NormalObject) {
    this.editStats = true
    this.addData = {
      LEG: item.LEG,
      LEGEnd: item.LEG,
      Buyer: item.BuyerIds,
      ATL: item.ATLIds,
      SQE: item.SQEIds,
      consumer: item.consumerIds
    }
    this.editDialog = true
  }

  deleteItems () {
    this.$confirm('Are you sure to delete?', 'Notice', {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning'
    }).then(async () => {
      const res = await EmailSettingApi.DeleteMc({
        LEG: this.multipleSelection.join()
      })
      if (res.data.Success) {
        this.$message.success('Success')
        this.tableList()
      } else {
        this.$message.error(res.data.Message)
      }
    })
  }

  async save () {
    if (!this.addData.LEG) {
      this.$message.warning('Please Enter FM')
    } else if ((this.addData.ATL as []).length === 0) {
      this.$message.warning('Please Choice a ATL at least')
    } else {
      const addData: NormalObject[] = []
      for (const key in this.addData) {
        if (typeof (this.addData[key]) === 'object') {
          (this.addData[key] as []).forEach((item: string) => {
            const obj: NormalObject = {}
            obj.LEG = this.addData.LEG
            obj.LEGEnd = this.addData.LEGEnd
            obj.MCType = key
            obj.ApprovalId = item
            addData.push(obj)
          })
        }
      }
      const res = await EmailSettingApi.AddMailboxConfiguration({
        addData
      })
      if (res.data.Success) {
        this.tableList()
        this.editDialog = false
      } else {
        this.$message.error(res.data.Message)
      }
    }
  }

  async tableList () {
    this.searchDialog = false
    const res = await EmailSettingApi.GetMailboxConfigurationList({
      ...this.searchData,
      ...this.page
    })
    if (res.data.Success) {
      this.tableData = res.data.Data || []
      this.page.DataTotalCount = res.data.DataTotalCount || 0
      this.tableData = this.tableData.map(item => {
        const obj: NormalObject = {}
        obj.BuyerIds = (item.Buyer as []).map((el: { ApprovalId: string }) => el.ApprovalId)
        obj.Buyer = (item.Buyer as []).map((el: { Name: string }) => el.Name).join(',')
        obj.ATLIds = (item.ATL as []).map((el: { ApprovalId: string }) => el.ApprovalId)
        obj.ATL = (item.ATL as []).map((el: { Name: string }) => el.Name).join(',')
        obj.SQEIds = (item.SQE as []).map((el: { ApprovalId: string }) => el.ApprovalId)
        obj.SQE = (item.SQE as []).map((el: { Name: string }) => el.Name).join(',')
        obj.consumerIds = (item.consumer as []).map((el: { ApprovalId: string }) => el.ApprovalId)
        obj.consumer = (item.consumer as []).map((el: { Name: string }) => el.Name).join(',')
        return obj
      })
    }
  }

  handleSizeChange (val: number) {
    this.page.PageSize = val
    this.tableList()
  }

  handleCurrentChange (val: number) {
    this.page.PageIndex = val
    this.tableList()
  }
}
</script>

<style lang='less' scoped>
  .email_setting {
    .freeze {
      border-radius: 4px;
      height: 30px !important;
    }

    .el-button--default.unlockBtn {
      background: #fff;
      border: 2px solid #E6E6E6;
      border-radius: 4px;
    }

    .el-button--default.unlockBtn:hover {
      border: 2px solid #FF3535;

      i {
        color: #000;
      }
    }

    .SettingHost {
      position: relative;
    }

    .Settingeyes {
      position: absolute;
      right: 0;
      top: 2px;
      height: 36px;
      padding: 0 20px;
      background: #ddd;
      cursor: pointer;
    }

    .Settingeyes.active {
      color: #00adef;
    }

    .BtnS {
      border-top: 2px solid #E6E6E6;
      padding-top: 20px;
      margin-top: 20px;
      margin-bottom: 0;

      div {
        text-align: right;
      }
    }

    .el-form-item__label {
      width: 140px !important;
      text-align: left;
    }

    .el-form-item__content {
      margin-left: 140px !important;

      .el-select {
        width: 100%;
      }

    }

    .SystemForm {
      width: 600px;
      background: #fff;
      padding: 20px 20px;
      box-shadow: 1px 1px 5px 2px #ddd;
      margin: 0 auto;

      .el-form {
        width: 100%;
      }
    }

    .flex {
      display: flex;

      > div {
        height: 40px;
        line-height: 40px;
        margin-right: 10px;
        margin-bottom: 16px;
      }

      > div:first-child {
        width: 160px;
        text-align: left;
      }
    }
  }
</style>
