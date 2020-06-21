<template>
  <div class="ccw_index">
    <ccw-header/>
    <el-row>
      <ccw-sider class="fll" @isCollapse="changeIsCollapse"/>
      <ccw-content class="fll ccw_content" :class="{active: IsCollapse}"/>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CcwHeader from '@/views/layout/Header.vue'
import CcwSider from '@/views/layout/Sider.vue'
import CcwContent from '@/views/layout/Content.vue'

@Component({
  components: {
    CcwHeader: CcwHeader,
    CcwSider: CcwSider,
    CcwContent: CcwContent
  }
})
export default class CcwIndex extends Vue {
  IsCollapse = false

  changeIsCollapse (val: boolean) {
    console.log(val)
    this.IsCollapse = val
  }
}
</script>

<style lang="less" scoped>
  .ccw_index {
    height: 100vh;
    padding-top: 80px;
    box-sizing: border-box;
    .ccw_content {
      width: calc(100% - 235px);
      &.active {
        width: calc(100% - 73px);
      }
    }
  }
</style>
