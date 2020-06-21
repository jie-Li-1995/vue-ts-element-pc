<template>
  <div class="ccw_content scroll_line">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MyHeader from '@/views/layout/Header.vue'

@Component({
  components: {
    MyHeader: MyHeader
  }
})
export default class CcwContent extends Vue {
}
</script>

<style lang="less">
  .ccw_content {
    height: calc(100vh - 80px);
    padding: 20px;
    box-sizing: border-box;

    .el-table__fixed {
      position: absolute;
      bottom: 16px !important;
    }

    .el-input__inner:focus {
      line-height: 34px !important;
    }

    .el-input__inner {
      height: 36px !important;
      line-height: 34px !important;
      border: 1px solid rgba(197, 197, 197, 1);
    }

    .el-checkbox__inner,
    .el-checkbox__inner.is-focus .el-checkbox__inner {
      border: 1px solid rgba(197, 197, 197, 1) !important;
    }

    .el-input__inner:hover,
    .el-textarea__inner:hover {
      border: 1px solid #a5a5a5;
    }

    .el-form-item.is-success .el-input__inner:hover,
    .el-form-item.is-success .el-textarea__inner:hover,
    .el-select .el-input__inner:hover,
    .el-checkbox__inner:hover {
      border: 1px solid #a5a5a5 !important;
    }

    .el-form-item.is-success .el-input__inner,
    .el-textarea__inner {
      border: 1px solid rgba(197, 197, 197, 1);
    }

    .el-date-table td.start-date span,
    .el-date-table td.end-date span,
    .el-date-table td.current:not(.disabled) span {
      background: rgba(80, 151, 171, 1);
      color: #fff;
    }

    .el-date-table td.today span {
      color: #00677f;
      font-weight: bold;
    }

    .el-loading-spinner .circular {
      height: 60px !important;
      width: 60px !important;
    }

    .el-loading-spinner .el-loading-text {
      font-size: 16px !important;
      color: rgba(80, 151, 171, 1) !important;
    }

    .el-loading-spinner .path {
      stroke: rgba(80, 151, 171, 1) !important;

    }

    .el-pager li:hover {
      color: rgba(0, 103, 127, 1);
    }

    .el-pager li {
      min-width: 30px;
    }

    .goToColor {
      background: yellow;
      color: #000;
    }

    // #app
    #app .el-pager li.active {
      background: rgba(0, 103, 127, 1) !important;
      border-radius: 4px;
      color: #fff;
    }

    .el-table__column-filter-trigger {
      float: right
    }

    .flex {
      display: flex;
    }

    .searchDiv {
      div {
        height: 40px;
        line-height: 40px;
        margin-bottom: 16px;
        margin-right: 10px;
      }
    }

    .center {
      text-align: center;
    }

    .right {
      text-align: right;
    }

    .left {
      text-align: left;
    }

    .filterDiv, .relative {
      position: relative;
    }

    .disabledToggle span {
      cursor: not-allowed !important;
    }

    .disabledToggle span i {
      color: #BDBDBD !important;
      cursor: not-allowed !important;
    }

    .disabledToggle span:hover {
      border: 2px solid #E6E6E6 !important;
    }

    .filterDialongW .el-dialog, #app .addNewModal .el-dialog {
      min-width: 600px;
      max-width: 600px;

    }

    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background: #00677F !important;
      border-color: #00677F !important;
    }

    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      background: #EAF1F6 !important;
    }

    .el-checkbox__input.is-checked + .el-checkbox__label,
    .el-table th > .cell.highlight,
    .el-select-dropdown__item.selected,
    .el-icon:hover,
    .btn-next:hover,
    .btn-prev:hover {
      color: #00677f !important;
    }

    .disabled.btn-prev:hover {
      color: #b4bccc !important;
    }

    .el-loading-mask {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0;
      bottom: 0;
      z-index: 10000 !important;
    }

    .el-table-filter__bottom button:first-child {
      background: #00677f !important;
      color: #fff;
      border-radius: 4px;
      padding: 4px 6px;
      margin-right: 5px;
    }

    .el-table-filter__bottom button:last-child {
      background: #E6E6E6;
      color: #000;
      border-radius: 4px;
      padding: 4px 6px;
    }

    .el-tooltip__popper[x-placement^=top] .popper__arrow::after, .el-tooltip__popper[x-placement^=top] .popper__arrow {
      border-top-color: #555 !important;
    }

    .el-tooltip__popper.is-dark {
      background: #555 !important;
    }

    .el-tooltip__popper .popper_arrow {
      border-top-color: #555 !important;
    }

    .el-table th > .cell {
      word-break: normal;
    }

    .el-select .el-input.is-focus .el-input__inner {
      border-color: #5097ab
    }

    .levelClass td, .el-table tbody tr.levelClass:hover td, .el-table tbody tr.levelClass.hover-row td {
      background: #eee !important;
    }

    .searchCriteria {
      .el-date-editor--daterange.el-input__inner, .el-select {
        width: 100% !important;
      }
    }

    .bgHeightLight {
      background: #eee;
    }

    .inlineC1 {
      font-size: 14px;
      display: inline-block;
      position: absolute;
      left: 0;
      top: 20px;
      background: #F0F0F0;
      width: 250px;
      margin-right: 0;
      text-align: right;
      padding-top: 3px;
      padding-right: 10px;
      height: 28px;
      line-height: 28px;
      font-weight: 400;

    }

    .inlineC2 {
      position: absolute;
      left: 274px;
      top: 24px;
      /*width:60px;*/
      background: #fff;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
    }

    .resetPage .el-pagination {
      display: inline-block !important;

    }

    .inlineBlock {
      display: inline-block;
      position: relative;

      .el-pagination__total {
        width: 250px;
      }

      .inlineC1, .inlineC2 {
        display: none;
      }

      span {
        font-size: 13px;
        min-width: 35.5px;
        vertical-align: top;
        color: #5a5e66;
      }
    }

    .inlineBlock.showInline {
      .inlineC2 {
        left: 280px;
      }

      .el-pagination .el-input__inner {
        width: 107px;
      }

      .el-pagination .el-input__suffix {
        right: -10px;
      }

      .inlineC1, .inlineC2 {
        display: inline-block;
      }
    }

    .heightLightIcon.filterIcon {
      color: #000;
      background: #fff;
      border: 2px solid #00677f;
      padding: 4px;
    }

    .noDataDiv {
      height: 60px;
      line-height: 60px;
      border: 1px solid #C5C5C5;
      background: #fff;
      text-align: center;
      font-size: 14px;
    }

    .ApplyDiv {
      margin: 20px auto;
      margin-top: 110px;
    }

    .ContainerRight {
      .el-loading-mask {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0;
        bottom: 0;
      }
    }

    .el-tabs__item.is-active, .el-tabs__nav > div:hover, .el-dialog__headerbtn .el-dialog__close:hover {
      color: #0384a8;
    }

    .icon-view, .icon-approve, .icon-edit {
      font-size: 14px !important;
      vertical-align: middle;
    }

    .noticeParent {
      position: absolute;
      top: 0;
      z-index: -1;
      left: 0;
      right: 0px;
      bottom: 0px;
    }

    #tableP {
      .heightLight, .heightLight.bgHeightLight {
        background: #FFDFCE;
      }

      .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #fff;
      }

      .noticeIcon {
        cursor: pointer;
        position: absolute;
        top: 50%;
        margin-top: -16px;
        right: 3px;
        z-index: 4;
      }

      .el-table tbody td {
        position: relative;
        padding: 0;

        .cell {
          padding-top: 6px;
          padding-bottom: 6px;
          position: relative;
          z-index: 3;
          background: transparent;
          height: 44px;
        }
      }
    }

    .el-icon-arrow-down {
      color: #000 !important;
    }

    .DottedSpan {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00677f;
      margin-right: 6px;
    }

    .staticTitle {
      border-radius: 2px;
      display: flex;
      padding: 4px 0;
      margin-bottom: 16px;

      > div {
        color: #000;
        /*font-size:18px;*/

        span {
          color: #00677f;
        }
      }

      > div:first-child {
        /*padding-rigth:20px;*/
        margin-right: 40px;
      }
    }

    .el-message-box__status.el-icon-warning {
      color: #FF0000 !important;
    }

    .el-icon-warning, .el-message-box__status::before, .el-icon-warning:before {
      color: #FF0000 !important;
    }

    .el-table {
      color: #000000;
      letter-spacing: 0;
    }

    .el-table thead tr th {
      border-bottom: 2px solid #007A93 !important;
    }

    #latestMessages {
      .el-table {
        border-bottom: none;
      }

      .el-table tbody tr > td:last-child {
        color: #666666;
      }

      .el-table tbody tr td {
        border-bottom: 1px solid #E6EBF5 !important;
      }
    }

    .icon-account:before {
      content: "\e901";
      color: #999;
    }

    .heightReset .singleEdit .el-col:first-child {
      padding-right: 12px;
      text-align: right;
    }

    .selectReset {

      .el-select {
        width: 100%;
      }
    }

    .visibilityDiv {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-left: 10px;
      padding-right: 10px;
      line-height: 44px;
    }

    .visibilityHidden {
      visibility: hidden;
    }

    .AccessMarginb {
      margin-bottom: 20px;

      .el-table__body-wrapper {
        overflow-x: hidden !important;
      }
    }

    .el-dialog {
      min-width: 900px;
      margin-bottom: 0;
    }

    .PageTop {
      display: none;
    }

    .bgA {
      background: #f00;
    }

    .bgB {
      background: #ddd;
    }

    .PartsPageTop {
      .title {
        margin-top: 0px !important;
      }
    }

    #templateTable {
      .el-pagination {
        margin-bottom: 0;
      }

      .el-table th {
        > div {
          line-height: 16px !important;
          text-align: center;
          padding-right: 15px;
        }

        .el-table__column-filter-trigger {
          position: absolute;
          top: 50%;
          right: 5px;
          margin-top: -17px;
        }
      }

      .el-table td .cell {
        text-align: center;
      }
    }

    .el-form-item {
      margin-bottom: 16px;
      text-align: left;
    }

    .el-icon-remove {
      color: #C0C0C0;
      cursor: pointer;
    }

    .el-icon-circle-check:before, .icon-publish {
      color: rgba(0, 103, 127, 1);
    }

    .el-icon-circle-check, .el-icon-remove {
      font-size: 20px;
      cursor: pointer;
    }

    .el-checkbox + .el-checkbox {
      margin-left: 0;
      margin-bottom: 10px;
    }

    .el-checkbox-group > .el-checkbox {
      margin-right: 30px;
    }

    .el-icon-circle-check {
      color: rgba(0, 103, 127, 1)
    }

    .ztreeMargin {
      margin: 1px 0 16px 0;
    }

    .el-tabs--card > .el-tabs__header {
      border-bottom: 2px solid #C5C5C5;
    }

    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }

    .el-tabs--card > .el-tabs__header .el-tabs__item {
      border: none;
      background: #fff;
      border-bottom: 2px solid #C5C5C5;
      margin-top: -2px;
    }

    .el-tabs__nav-wrap {
      margin-bottom: -2px;
    }

    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      border: 2px solid #C5C5C5;
      border-bottom: none;
      position: relative;
      bottom: -2px;
      z-index: 2;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    .el-dialog {
      .el-button {
        padding: 10px 12px;
      }

      .el-dialog__header {
        padding: 0;
      }

      .el-form-item__label {
        text-align: right;
      }

      .el-dialog__body {
        padding: 30px;
      }
    }

    .el-button {
      padding: 8px 12px;
    }

    .el-table th {
      padding: 6px 0;

      > div {
        line-height: 23px;
        text-align: center;
      }
    }

    .el-pagination {
      .el-input__inner {
        height: 30px !important;
        line-height: 26px !important;
      }
    }

    .el-table td {
      padding: 10px 0;

      > div {
        line-height: 23px;
        text-align: center;
        min-height: 31px;
      }
    }

    .CommentTable {
      .el-table th {
        padding: 0;
        height: 36px;

        > div {
          line-height: 31px;
        }
      }

      .el-table tbody td {
        padding: 6px 0;

        > div {
          line-height: 31px;
        }
      }
    }

    .boxShadow {
      box-shadow: 1px 1px 5px 2px #ddd;

    }

    .el-button--default, .CancelBtn, .CancelBtn {
      background: #E6E6E6;
      color: #000;
      border: none;
    }

    .el-button--default:hover, .CancelBtnHover {
      background: #C8C8C8;
    }

    .borderFooter {
      padding-top: 20px;
      border-top: 2px solid #C8C8C8;
      text-align: right;

      .el-button--default {
        background: #E6E6E6;
        color: #000;
        border: none;
      }

      .el-button--default:hover {
        background: #C8C8C8;
      }

      .el-button {
        height: 36px;
      }
    }

    .splicePhone {
      > div {
        padding-right: 16px;
      }

      div:last-child {
        padding-right: 0;
      }
    }

    .vCodeDiv {
      position: relative;
      cursor: pointer;

    }

    .VerificationCodeSpan {
      font-style: oblique;
    }

    .vCode {
      position: absolute;
      right: 10px;
      top: 3px;
      line-height: 24px;
      font-style: italic;
      background: #ddd;
      width: 60px;
      color: rgba(0, 103, 127, 1);
      letter-spacing: 4px;
    }

    .el-dialog {
      overflow: hidden;
    }

    .el-table__column-filter-trigger i {
      color: #fff;
      font-weight: bold;
    }

    .line {
      text-align: center;
    }

    .filterIcon {
      position: absolute;
      top: 1px;
      right: 0;
      cursor: pointer;
      padding: 6px;
      background: rgba(0, 103, 127, 1);
      color: #fff;
      border-radius: 4px;
      text-align: center;
    }

    .EditTitle {
      display: inline-block;
      border-bottom: 2px solid rgba(0, 103, 127, 1);
      padding-bottom: 6px;
    }

    input::-webkit-input-placeholder, .el-input__inner::-webkit-input-placeholder {
      font-style: oblique;
    }

    .DefaultBtn {
      background: #E6E6E6;
      border: none;
    }

    .SignUpBtn, .el-button--primary {
      background: rgba(0, 103, 127, 1);
      border: none;
      color: #fff;
    }

    .SignUpBtn:hover, .el-button--primary:hover {
      background: #003340;
    }

    .batch {
      margin-bottom: 16px;
    }

    .el-table td.is-hidden > *, .el-table th.is-hidden > * {
      visibility: visible;
    }

    .el-table tbody tr:hover td, .el-table tbody tr.hover-row td {
      background: #DBEAEF !important;
    }

    .el-table .el-table-column--selection {
      text-align: center !important;
    }

    .el-button {
      border-radius: 2px;
    }

    .el-form-item.is-success .el-input__inner,
    .el-form-item.is-success .el-textarea__inner {
      border: 1px solid rgba(197, 197, 197, 1);

    }

    .el-form-item.is-success .el-input__inner:focus,
    .el-form-item.is-success .el-textarea__inner:focus,
    .el-input__inner:focus,
    .el-textarea__inner:focus {
      border-color: rgba(80, 151, 171, 1);
    }

    .el-breadcrumb__item:hover {
      color: rgba(0, 103, 127, 1) !important;
    }

    .title, h3, h2 {
      font-weight: normal;
    }

    div, span, button, h1, h2, h4, h5, h6, .el-input__inner, .el-textarea__inner {
      font-family: 'CorpS', 'Avenir', Helvetica, Arial, sans-serif;
    }

    .title, h3 {
      margin: 0 0 16px 0;
      font-family: 'CorpS', 'Avenir', Helvetica, Arial, sans-serif;
      font-size: 26px;
    }

    .title.resetTitle {
      font-size: 30px;
    }

    .el-pagination {
      margin: 20px 0;
    }

    /*page*/

    .el-pagination__jump {
      display: none;
    }

    .el-pagination {
      text-align: right;
    }

    .el-pagination .btn-prev, .el-pagination .btn-next, .el-pager li {
      background: transparent !important;
    }

    /*table*/

    .el-table {
      thead .is-group.has-gutter tr:nth-child(2) th {
        background-image: linear-gradient(-180deg, #878787 0%, #9C9C9C 100%);
      }

      thead.is-group.has-gutter tr:nth-child(2) th {
        background-image: linear-gradient(-180deg, #878787 0%, #9C9C9C 100%);
        color: #FFFFFF;
      }
    }

    .el-table--border, .el-table--group {
      border: 1px solid #C5C5C5;
    }

    .el-table--border td {
      border-bottom: 1px solid #C5C5C5;
    }

    .el-table td, .el-table th.is-leaf {
      border-right: 1px solid #C5C5C5;
    }

    table thead.is-group.has-gutter tr:nth-child(2) th {
      background-image: linear-gradient(-180deg, #878787 0%, #9C9C9C 100%);
      color: #FFFFFF;
    }

    table tbody {
      td {

        .ChangeName {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 0 10px;
        }
      }
    }

    table thead tr {
      th {
        background-image: linear-gradient(-180deg, #DCDCDC 2%, #F7F7F7 99%);
        font-weight: normal;
        color: #000;
      }
    }

    table thead.is-group.has-gutter tr:first-child th {
      border-bottom: none;
    }

    .StatueSpan.Status1 {
      background: #00ADEF;
    }

    .StatueSpan.Status2 {
      background: #FF7D27;
    }

    .StatueSpan.Status3 {
      background: #7F7F7F;
    }

    .StatueSpan.Status4 {
      background: #4A5D83;
    }

    .CustomBtn {
      background: -webkit-gradient(linear, 0 0, 0 bottom, from(#00adef), to(#0094cd));
      border: none;
      color: #fff;
    }

    .button1, .button2, .button3, .button4 {
      padding: 8px;
      color: #fff;
      /*margin:4px;*/
    }

    .button1 {
      background: #FFFFFF;
      border: 2px solid #E6E6E6;
      border-radius: 4px;
      color: #000000;
      letter-spacing: 0;
      padding: 5px 8px;
      height: 31px;
    }

    .button1:hover {
      border: 2px solid #5097AB;
    }

    .button1:hover > i {
      color: #000;
    }

    .el-button.CustomBtn {
      background: rgba(0, 103, 127, 1);
      border: none;
      color: #fff;
    }

    /*table*/

    .heightReset {
      max-height: 400px;
      overflow-y: auto;

      .singleEdit {
        margin-bottom: 16px;
        padding: 0 10px;
      }

      .singleEdit:last-child {
        margin-bottom: 20px;
      }

      .resetFormHeight {
        .el-form-item__label {
          width: 50% !important;
        }

        .el-form-item__content {
          margin-left: 50% !important;
        }
      }
    }
  }

  #app.BreakAll {
    .el-table th > .cell {
      word-break: break-word;
    }
  }

  .fll {
    float: left;
  }

  .flr {
    float: right;
  }

  .clear-fix::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    clear: both;
  }

  .current-row td, .el-table tbody tr.current-row:hover td, .el-table tbody tr.current-row.hover-row td {
    background: #DBEAEF !important;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
  .el-table__body tr.current-row > td, .el-table__body tr.hover-row.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  .el-table__body tr.hover-row.el-table__row--striped > td,
  .el-table__body tr.hover-row > td {
    background: #DBEAEF !important;
  }

  /*.el-table__body .current-row{*/
  /*background: red !important;*/
  /*background-image: none;*/
  /*&:hover{*/
  /*background: red !important;*/
  /*background-image: none;*/
  /*}*/
  /*td{*/
  /*background: red !important;*/
  /*background-image: none;*/
  /*&:hover{*/
  /*background: red !important;*/
  /*background-image: none;*/
  /*}*/
  /*}*/
  /*}*/
  /*.el-notification.right {*/
  /*right: 16px;*/
  /*top: 81px!important;*/
  /*}*/

  .el-notification__title {
    text-align: left;
    font-weight: 700;
    font-size: 16px;
    color: #303133;
    margin: 0;
    cursor: pointer;
  }

  .star {
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #dcdfe6;
    padding: 0 20px;
    white-space: nowrap;
    height: 36px;
    text-align: center;
    width: 55px;
    box-sizing: border-box;
    border-radius: 4px 0 0 4px !important;
    border-right: none;
  }

  .star-select {
    width: 573px !important;

    > .el-input {
      height: 36px;
      width: 100%;

      > .el-input__inner {
        display: block;
        border-radius: 0 4px 4px 0 !important;
        width: 100%;
      }
    }
  }

  .iconfont {
    font-size: 14px !important;
    text-align: center;
  }

  .el-tooltip__popper {
    font-size: 18px !important;
  }

  .el-input__icon {
    line-height: 34px !important;
  }

  .inputHeight .el-input__inner {
    height: 32px !important;
  }

  .el-button.is-disabled {
    color: #000 !important;
    background: #fff !important;
    border: 2px solid #00677f !important;
    padding: 6px 10px !important;
  }
</style>
