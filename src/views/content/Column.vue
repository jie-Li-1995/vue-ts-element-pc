<template>
  <div class="Column" style="height: 500px;">
    {{$route.params.Id}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Column extends Vue {
}
</script>

<style lang="less" scoped>

</style>
