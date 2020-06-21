// 定义要混合的类 mixins.ts
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

interface PageType {
  PageIndex: number;
  PageSize: number;
  total: number;
  Status: number;
}

@Component // 一定要用Component修饰
export default class MyMixins extends Vue {
  page: PageType = {
    PageIndex: 1,
    PageSize: 25,
    total: 0,
    Status: 0
  }

  handleSizeChange (val: number, tableList: Function) {
    this.page.PageSize = val
    tableList()
  }

  handleCurrentChange (val: number, tableList: Function) {
    this.page.PageIndex = val
    tableList()
  }

  search (tableList: Function) {
    this.page.PageIndex = 1
    tableList()
  }
}
