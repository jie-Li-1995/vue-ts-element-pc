<template>
  <div class="view_template">
    <div class="batch filterDiv">
      <el-select
        v-model="params.ViewTemplateId"
        placeholder="Choose a template"
        @change="tableList"
        style="width:200px;margin-right:16px;height:32px;"
      >
        <el-option
          v-for="item in templates"
          :key="item.Id"
          :label="item.Name"
          :value="item.Id"
        />
      </el-select>
      <el-button class="SignUpBtn" @click="ConfirmBtn">Save</el-button>
    </div>
    <template>
      <el-button icon="el-icon-plus" class="SignUpBtn" style="margin: 10px 0; float: right;" @click="add">
        Add Property
      </el-button>
      <el-table border ref="table" :data="tableData" style="width: 100%">
        <el-table-column fixed="left" width="80" align="center">
          <template slot-scope="scope">
            <el-button
              class="iconfont icon-Minuswithcircle"
              style="background: transparent; border-color: transparent; color: #00677f"
              @click="removeFromTemplate(scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <el-table-column label="Order" :resizable="false" width="186">
            <template slot-scope="scope">
              <div class="resetInputSpan">
                <el-input v-model.number="scope.row.num" @change="testNumber(scope.$index ,scope.row.num)">
                </el-input>
              </div>
              <div class="arrowIcons"
                   style="display: inline-block">
                <el-tooltip content="Up" placement="top">
                      <span class="btnUp" :class="{disabled:scope.$index===0}" @click="clickUp(scope.$index)">
                        <i aria-hidden="true" class="fa el-icon-top"/>
                      </span>
                </el-tooltip>
                <el-tooltip content="Down" placement="top">
                      <span class="btnDown" :class="{disabled:scope.$index===(tableData.length-1)}"
                            @click="clickDown(scope.$index)">
                        <i aria-hidden="true" class="fa el-icon-bottom"/>
                      </span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="IsChecked" label="Filter" width="120" align="center">
            <template slot-scope="scope">
              <div>
                <el-tooltip :content="scope.row.FilterId===0 ? 'Off' :'On' " placement="top">
                      <span class="btnOff" v-if="scope.row.FilterId===0" @click="toggleSelect(1,scope.$index)">
                        <i aria-hidden="true" class="fa el-icon-message-solid"/>
                      </span>
                  <span class="btnOn" v-if="scope.row.FilterId===1" @click="toggleSelect(0,scope.$index)">
                        <i aria-hidden="true" class="fa el-icon-message-solid"/>
                      </span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="LockId" label="Fixed" width="120" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.IsChecked===1"
                   :class="{disabledToggle:scope.row.IsChecked!==1}">
                <el-tooltip :content="scope.row.LockId===0 ? 'Off' :'On'" placement="top">
                      <span class="btnOff" v-if="scope.row.LockId===0" @click="toggleFixed(1,scope.$index)">
                        <i class="fa el-icon-unlock " aria-hidden="true"/>
                      </span>
                  <span class="btnOn" v-if="scope.row.LockId===1" @click="toggleFixed(0,scope.$index)">
                        <i aria-hidden="true" class="fa el-icon-lock"/>
                      </span>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="Alias" label="DB SN"/>
        <el-table-column prop="DisplayPropertyName" label="Field"/>
        <el-table-column prop="DataSource" label="DataSource"/>
        <el-table-column prop="Width" label="Width">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.Width" @change="testNumber2"/>
          </template>
        </el-table-column>
      </el-table>
      <el-button icon="el-icon-plus" class="btn SignUpBtn" style="margin: 10px 0; float: right;" @click="add">
        Add Property
      </el-button>
    </template>

    <el-dialog :visible.sync="dialogAddTable">
      <h3 class="EditTitle">Add property to template</h3>
      <el-table :data="unCheckedData" height="400">
        <el-table-column width="100" align="center">
          <template slot-scope="scope">
            <el-button
              class="iconfont icon-add"
              style="background: transparent; border-color: transparent; color: #00677f"
              @click="addToTemplate(scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="Alias" label="DB SN"/>
        <el-table-column prop="DisplayPropertyName" label="Field"/>
        <el-table-column prop="DataSource" label="DataSource"/>
      </el-table>
      <div slot="footer" class="dialog-footer borderFooter">
        <el-button class="SignUpBtn" @click="dialogAddTable = false">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NormalObject } from '@/utils'
import { ViewTemplateApi } from '@/api'

@Component
export default class ViewTemplate extends Vue {
  tableData: NormalObject[] = []
  unCheckedData: NormalObject[] = []
  dialogAddTable = false
  numbers = 0
  templates = []
  params: NormalObject = {
    ViewTemplateId: '',
    H6ViewInputList: []
  }

  mounted () {
    this.GetSystemViewTemplates()
  }

  add () {
    this.dialogAddTable = true
  }

  addToTemplate (rowIndex: number) {
    const item = this.unCheckedData[rowIndex]
    item.IsChecked = 1
    this.unCheckedData.splice(rowIndex, 1)
    item.num = this.tableData.length + 1
    this.tableData.push(item)
  }

  removeFromTemplate (rowIndex: number) {
    const item = this.tableData[rowIndex]
    item.IsChecked = 0
    this.tableData.splice(rowIndex, 1)
    this.unCheckedData.push(item)
    this.unCheckedData.sort((a, b) => {
      return (a.Id as number) - (b.Id as number)
    })
    this.unCheckedData.forEach((item) => {
      item.num = 0
    })
    this.tableData.forEach((el, index) => {
      el.num = index + 1
    })
  }

  async GetSystemViewTemplates () {
    const res = await ViewTemplateApi.GetSystemViewTemplates()
    if (res.data.Success) {
      this.templates = res.data.Data
      this.params.ViewTemplateId = res.data.Data[0].Id
      this.tableList()
    }
  }

  clickDown (index: number) {
    if (this.tableData[index].LockId === this.tableData[index + 1].LockId) {
      const nextItem = this.tableData[index + 1]
      const nowItem = this.tableData[index]
      this.tableData.splice(index, 1, nextItem)
      this.tableData.splice(index + 1, 1, nowItem)
      this.tableData.forEach((el, index) => {
        el.num = (index + 1)
      })
    }
  }

  clickUp (index: number) {
    if (this.tableData[index].LockId === this.tableData[index - 1].LockId) {
      const LastItem = this.tableData[index - 1]
      const nowItem = this.tableData[index]
      this.tableData.splice(index, 1, LastItem)
      this.tableData.splice(index - 1, 1, nowItem)
      this.tableData.forEach((el, index) => {
        el.num = (index + 1)
      })
    }
  }

  testNumber (index: number, val: string) {
    this.numbers = /^[1-9]+\d*$/.test(val) ? Number(val) : 0
    const num = Number(val)
    this.changeNumber(index, num)
  }

  testNumber2 (val: string) {
    if (!/^\+?[1-9][0-9]*$/.test(val)) {
      this.$message.error('Please enter a number')
    }
  }

  changeNumber (index: number, val: number) {
    const currData = this.tableData[index]
    if (this.numbers === 0) {
      this.$message.error('Please enter a number')
    } else if (this.numbers > this.tableData.length) {
      this.$message.error('The sorting number must be in the selected range')
    } else if (this.tableData[index].LockId === this.tableData[val - 1].LockId) {
      this.tableData.splice(index, 1)
      this.tableData.splice(this.numbers - 1, 0, currData)
      this.tableData.forEach((el, index) => {
        el.num = index + 1
      })
    } else {
      let currIndex = 0
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].LockId === 0) {
          currIndex = i
          break
        }
      }
      this.tableData.splice(index, 1)
      if (this.tableData[index].LockId === 0) {
        this.tableData.splice(currIndex, 0, currData)
      } else {
        this.tableData.splice(currIndex - 1, 0, currData)
      }
      this.tableData.forEach((el, index) => {
        el.num = index + 1
      })
    }
  }

  async ConfirmBtn () {
    if (this.tableData.length === 0) {
      this.$message.warning('Please Select')
      return
    }
    this.params.H6ViewInputList = this.tableData.map((el: NormalObject): NormalObject => {
      const obj: NormalObject = {}
      obj.FilterId = el.FilterId
      obj.LockId = el.LockId
      obj.PropertyId = el.Id
      obj.Sequence = el.num
      obj.Width = el.Width
      obj.ViewTemplateId = this.params.ViewTemplateId
      return obj
    })
    const res = await ViewTemplateApi.SaveView(this.params)
    if (res.data.Success) {
      this.$message.success('Save Success')
      this.tableList()
    } else {
      this.$message.error(res.data.Message)
    }
  }

  toggleFixed (toggle: number, index: number) {
    let currIndex = 0
    const currData = this.tableData[index]
    this.tableData.splice(index, 1)
    for (let i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].LockId === 0) {
        currIndex = i
        break
      }
    }
    currData.LockId = toggle
    this.tableData.splice(currIndex, 0, currData)
    this.tableData.forEach((el, key) => {
      el.num = (key + 1)
    })
  }

  toggleSelect (toggle: number, index: number) {
    if (this.tableData[index].IsChecked === 1) {
      this.tableData[index].FilterId = toggle
    }
  }

  async tableList () {
    const res = await ViewTemplateApi.GetDataEntityProperty({
      ViewTemplateId: this.params.ViewTemplateId,
      SearchType: 1
    })
    if (res.data.Success) {
      let dataIndex = 1
      this.tableData = []
      this.unCheckedData = []
      res.data.Data.forEach((el: { IsChecked: number; num: number }) => {
        el.num = 0
        if (el.IsChecked === 1) {
          el.num = dataIndex++
          this.tableData.push(el)
        } else {
          this.unCheckedData.push(el)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .view_template {

    .forName {
      position: relative;

      .el-radio {
        position: absolute;
        left: 10px;
        width: 50px;
        z-index: 10;
        height: 30px;
        top: 10px;
      }

      .saveNameInput {
        margin-left: 30px;
      }
    }

    .saveNameInputTemplate .el-radio__label {
      display: none;
    }

    .backText {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      padding-right: 16px;
      margin-right: 16px;
      border-right: 1px solid #CECECE;
    }

    .backBtn {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: #242424;
      text-align: center;
      line-height: 30px;
      border-radius: 4px;
      cursor: pointer;

      i {
        color: #fff;
        font-weight: bold;
        font-size: 16px;
      }
    }

    .el-table--border th {
      border-right: 1px solid #C5C5C5;
    }

    .CommentTable table thead.is-group.has-gutter tr:nth-child(2) th {
      background-image: none;
      color: #000;
    }

    .el-table__fixed-header-wrapper, .el-table__header-wrapper {
      background-image: linear-gradient(-180deg, #DCDCDC 2%, #F7F7F7 99%);
      color: #000;
    }

    .el-table th, .el-table tr {
      background-color: transparent;
    }

    .CommentTable table thead tr th {
      background-image: none;
    }

    .resetInputSpan {
      display: inline-block;
      margin-right: 8px;

      .el-input {
        width: 80px;

        .el-input__inner {
          height: 30px !important;
          line-height: 30px !important;

        }
      }
    }

    .el-table__header tr > th:first-child .cell {
      height: 31px !important;
    }

    .chooseTemplate {
      .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        border-color: transparent;
        cursor: default;
      }
    }

    .selectTemplate {
      .el-input__inner {
        width: 516px;
      }
    }

    .batch.filterDiv {
      .el-input__inner {
        height: 32px !important;
      }
    }

    .el-radio__input.is-checked .el-radio__inner {
      border-color: #00677f;
      background: #00677f;
    }

    .el-radio__input.is-checked + .el-radio__label {
      color: #00677f;
    }

    .el-radio__inner:hover {
      border-color: #00677f;
    }

    .el-radio + .el-radio {
      margin-left: 0;

    }

    .el-radio {
      display: block;
      margin-bottom: 6px;
    }

    .el-table td > div, .el-table th > div {
      text-align: left;
    }

    .el-table td.is-center > div {
      text-align: center;
    }

    .arrowIcons {
      span:first-child {
        margin-right: 8px;
      }

      span {
        display: inline-block;
        border: 2px solid #E6E6E6;
        border-radius: 4px;
        line-height: 20px;
        padding: 3px;
        text-align: center;
        cursor: pointer;

        i {
          color: #00677F;
        }
      }

      span:hover {
        border: 2px solid #5097ab;

        i {
          color: #000;
        }
      }

      span.disabled, span.disabled:hover {
        cursor: not-allowed;
        border: 2px solid #E6E6E6;

        i {
          color: #BDBDBD;
        }
      }

      .disabledToggle span.btnOn:hover, #TemplateSetting .btnOn {
        border: 2px solid #5097ab !important;
      }

      span.disabled {
        i {
          color: #BDBDBD;
        }
      }
    }

    .btnOff, .btnOn {
      display: inline-block;
      border: 2px solid #E6E6E6;
      padding: 0 3px;
      border-radius: 4px;
      text-align: center;
      line-height: 26px;

      i {
        color: #00677F;
        cursor: pointer;
        width: 16px;

        display: inline-block;

      }
    }

    .btnOff.active {
      background: #5097ab;
      border: 2px solid #5097ab;
    }

    .btnOn {
      background: #00677f;
      border: 2px solid #00677f;
      color: #fff;
      text-align: center;
      cursor: pointer;

      i {
        color: #fff;
      }
    }

    .btnOff:hover {
      border: 2px solid #5097ab;
      cursor: pointer;

      i {
        color: #000;
      }
    }
  }
</style>
