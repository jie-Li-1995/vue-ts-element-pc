<template>
  <div class="ccw_index">
    <ccw-header/>
    <ccw-content/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CcwHeader from '@/views/layout/Header.vue'
import CcwContent from '@/views/layout/Content.vue'

@Component({
  components: {
    CcwHeader: CcwHeader,
    CcwContent: CcwContent
  }
})
export default class CcwIndex extends Vue {
}
</script>

<style lang="less" scoped>
  .ccw_index {
    width: 1200px;
    margin: 0 auto;
  }
</style>
