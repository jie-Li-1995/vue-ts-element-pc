<template>
  <div class="column_management" ref="DataEntityProperty">
    <el-table stripe border :data="tableData" :height="height" style="width: 100%">
      <el-table-column label="Operation" width="80">
        <template slot-scope="scope">
          <el-tooltip content="Edit" placement="top">
            <el-button @click.native.prevent="openDialog(scope.row)"
                       type="text" size="small" class="button1"
                       icon="icon-edit"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="Alias" label="DB SN" width="80"></el-table-column>
      <el-table-column prop="DisplayPropertyName" label="Column Name" show-overflow-tooltip></el-table-column>
      <el-table-column prop="Description" label="Column Description" show-overflow-tooltip></el-table-column>
      <el-table-column prop="Width" label="Width" width="60"></el-table-column>
      <el-table-column prop="DataSource" label="DataSource" width="100"></el-table-column>
      <el-table-column prop="Categories" label="Categories">
        <el-table-column label="Confidential" width="100">
          <template slot-scope="scope">
            <div>
              <i style="cursor: default!important;" v-if="scope.row.ConfidenceStatusId === 1"
                 class="el-icon-circle-check"></i>
              <i style="cursor: default!important;" v-else class="el-icon-remove"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Part" width="100">
          <template slot-scope="scope">
            <div>
              <i style="cursor: default!important;" v-if="scope.row.PartTypeId === 1"
                 class="el-icon-circle-check"></i>
              <i style="cursor: default!important;" v-else class="el-icon-remove"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="PartModify" width="100">
          <template slot-scope="scope">
            <div>
              <i style="cursor: default!important;" v-if="scope.row.PartModifyStatusId === 1"
                 class="el-icon-circle-check"></i>
              <i style="cursor: default!important;" v-else class="el-icon-remove"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Vehicle" width="100">
          <template slot-scope="scope">
            <div>
              <i style="cursor: default!important;" v-if="scope.row.VehicleTypeId === 1"
                 class="el-icon-circle-check"></i>
              <i style="cursor: default!important;" v-else class="el-icon-remove"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="VehicleModify" width="100">
          <template slot-scope="scope">
            <div>
              <i style="cursor: default!important;" v-if="scope.row.VehicleModifyStatusId === 1"
                 class="el-icon-circle-check"></i>
              <i style="cursor: default!important;" v-else class="el-icon-remove"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="VehicleEnd" width="100">
          <template slot-scope="scope">
            <div>
              <i style="cursor: default!important;" v-if="scope.row.VehicleAutoAddEndStatusId === 1"
                 class="el-icon-circle-check"></i>
              <i style="cursor: default!important;" v-else class="el-icon-remove"></i>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormVisible" width="600px">
      <h3 class="EditTitle">Edit</h3>
      <div class="chooseTemplate">
        <el-form label-width="130px">
          <el-form-item label="DB SN:">
            <el-input v-model="params.Alias"></el-input>
          </el-form-item>
          <el-form-item label="Column Name:">
            <el-input v-model="params.DisplayPropertyName"></el-input>
          </el-form-item>
          <el-form-item label="Column Description:">
            <el-input v-model="params.Description"></el-input>
          </el-form-item>
          <el-form-item label="Width:">
            <el-input v-model="params.Width"></el-input>
          </el-form-item>
          <el-row>
            <el-col span="8">
              <el-form-item label="Confidential:">
                <el-switch
                  v-model="params.ConfidenceStatusId"
                  active-color="#00677f"
                  inactive-color="#ddd"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="Part:">
                <el-switch
                  v-model="params.PartTypeId"
                  active-color="#00677f"
                  inactive-color="#ddd"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="PartModify:">
                <el-switch
                  v-model="params.PartModifyStatusId"
                  active-color="#00677f"
                  inactive-color="#ddd"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="Vehicle:">
                <el-switch
                  v-model="params.VehicleTypeId"
                  active-color="#00677f"
                  inactive-color="#ddd"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="VehicleModify:" width="100">
                <el-switch
                  v-model="params.VehicleModifyStatusId"
                  active-color="#00677f"
                  inactive-color="#ddd"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="VehicleEnd:">
                <el-switch
                  v-model="params.VehicleAutoAddEndStatusId"
                  active-color="#00677f"
                  inactive-color="#ddd"
                  :active-value="1"
                  :inactive-value="0">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer borderFooter">
          <el-button @click="SaveSetting">Cancel</el-button>
          <el-button type="primary" @click="SaveSetting(1)">Save</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import { ColumnManagementApi } from '@/api'
import { NormalObject } from '@/utils'

@Component
export default class ColumnManagement extends Vue {
  height = 0
  checked = []
  dialogFormVisible = false
  tableData = []
  params: NormalObject = {
    Alias: '',
    DisplayPropertyName: '',
    Description: '',
    Width: '',
    Id: '',
    ASNRTypeId: 0,
    Level0TypeId: 0,
    SAATypeId: 0,
    PartTypeId: 0,
    VehicleTypeId: 0,
    ConfidenceStatusId: 0
  }

  @Ref('DataEntityProperty') ref_DataEntityProperty!: HTMLDivElement

  mounted () {
    this.tableList()
  }

  openDialog (val: NormalObject) {
    this.params = { ...val }
    this.dialogFormVisible = true
  }

  async SaveSetting (val = 0) {
    if (val === 0) {
      this.dialogFormVisible = false
    } else {
      const w = this.params.Width.toString()
      const reg = /^[0-9]+\d*$/
      if (!this.params.DisplayPropertyName) {
        this.$message.error('Column Name cannot be empty')
      } else if (this.params.Width === '' || this.params.Width === undefined || this.params.Width === null) {
        this.$message.error('Width cannot be empty')
      } else {
        if (reg.test(w)) {
          const arr = []
          const obj = { ...this.params, DisplayName: this.params.DisplayPropertyName }
          arr.push(obj)
          const res = await ColumnManagementApi.EditDataEntityProperty({
            DataEntityPropertyList: arr
          })
          if (res.data.Success) {
            this.$message.success('Save success')
          } else {
            this.$message.error(res.data.Message)
          }
          this.dialogFormVisible = false
          this.tableList()
        } else {
          this.$message.error('Width is a positive integer')
        }
      }
    }
    this.checked = []
  }

  async tableList () {
    const res = await ColumnManagementApi.GetAllDataEntityProperty()
    if (res.data.Success) {
      this.tableData = res.data.Data || []
      this.height = this.ref_DataEntityProperty.clientHeight
    }
  }
}
</script>

<style lang="less">
  .column_management {
    height: 100%;

    .el-icon-remove:before {
      cursor: default;
    }
  }

  .changeLog {
    .el-select {
      width: 100%;
    }
  }

  .el-date-editor--daterange.el-input__inner {
    width: 100%;
  }
</style>
