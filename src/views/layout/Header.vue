<template>
  <div class="ccw-header clear-fix">
    <div class="nts-comp nts-logo">
      <a href="http://www.siemens.com/" class="logo">
        <img src="../../assets/siemens-logo-en-2x.png" alt="logo image" class="cq-dd-image">
      </a>
      <a href="http://www.siemens.com/" class="logoClaim">
        <img src="../../assets/siemens-logo-claim-en-2x.png" alt="logo image" class="cq-dd-image">
      </a>
    </div>
    <div class="user-info">
      Welcome<span>, {{ name }}</span><span></span>
      <el-button @click="exit" class="exit">Exit</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CcwHeader extends Vue {
  name = ''

  mounted (): void {
    this.name = JSON.parse(window.localStorage.userInfo).Display || ''
  }

  exit (): void {
    this.$confirm('Are you sure to exit the system?', 'Notice', {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning'
    }).then(() => {
      this.$router.push({ name: 'Logout' })
    })
  }
}
</script>

<style lang="less" scoped>
  .ccw-header {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 20px;

    .nts-logo {
      float: left;
      width: 145px;

      .logo img {
        max-height: 19px;
      }

      .logoClaim img {
        max-height: 29px;
      }
    }

    .user-info {
      float: right;
      font-size: 14px;
      line-height: 17px;
      color: #879BAA;
      text-align: left;

      .exit {
        margin-left: 10px;
      }

      span:nth-child(1) {
        padding-left: 2px;
        display: inline-block;
        color: #009999;
      }
    }
  }
</style>
