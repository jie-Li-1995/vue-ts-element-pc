<template>
  <div class="columns">
    <el-row>
      <el-col :span="4">
        <ul class="menu-item-group">
          <li v-for="(item, index) in AllColumns" :key="index" class="clear-fix">
            <div class="title2">
              <router-link
                class="nav-item"
                :to="{ name:'column',params: {id:item.ColumnId}}"
              >
                {{item.NameCn}}
              </router-link>
            </div>
            <ul class="menu-item clear-fix">
              <li v-for="(Column, index) in item.ChildrenColumns" :key="index+'Column'" class="clear-fix">
                <router-link
                  class="navigation"
                  :to="{ name:'column',params: {id:Column.ColumnId}}"
                  :title="Column.NameCn"
                >
                  <i class="el-icon-arrow-right"></i>
                  {{Column.NameCn}}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </el-col>
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColumnApi } from '@/api'

@Component
export default class Columns extends Vue {
  AllColumns = []

  mounted (): void {
    this.getAllColumns()
  }

  async getAllColumns () {
    try {
      const res = await ColumnApi.GetAllColumns({
        StatusId: 1
      })
      if (res.data.Success) {
        this.AllColumns = res.data.Data
        if (this.$route.name === 'Columns') {
          // this.$router.push({ name: 'Column', params: { id: this.indexId } })
        }
      }
    } catch (e) {
    }
  }
}
</script>

<style lang="less" scoped>
  .columns{
    font-size: 14px;
    line-height: 14px;
    .NowMenu {
      color: #009999!important;
      i{
        color: #009999;
        font-weight: 900;
      }
    }
    .menu-item-group{
      width: 100%;
      box-sizing: border-box;
      .title2{
        width: 100%;
        height: 42px;
        .nav-item{
          width: 100%;
          text-align: left;
          line-height: 42px;
          &.router-link-active {
            color: #009999;
          }
        }
      }
      .menu-item{
        padding-left: 20px;
        .navigation{
          border-top: 1px solid #EBF0F5;
          text-align: left;
          height: 32px;
          line-height: 32px;
          width: 80%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          &.router-link-active {
            color: #009999;
            i{
              color: #009999;
              font-weight: 900;
            }
          }
        }
      }
      .active{
        display: block;
      }
      .unactive{
        display: none;
        height: 0;
      }
      .arrow{
        float: left;
        width: 12px;
        height: 6px;
        margin: 4px 12px;
        background: url(../../assets/img/arrow_up.png);
      }
      .arrow01{
        float: left;
        display: inline-block;
        width: 12px;
        height: 6px;
        margin: 4px 12px;
        background: url(../../assets/img/arrow_down.png);
      }
      a{
        float: left;
        color: #3C464B;
        font-size: 14px;
        line-height: 14px;
      }
    }
  }
</style>
