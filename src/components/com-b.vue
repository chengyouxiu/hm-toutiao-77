<template>
    <div class="container">COM-B <button @click="fn()">传送数据给A</button></div>
</template>
<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-b',
  data () {
    return {
      msg: 'B组件数据'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('b2a', this.msg)
    }
  }
}
</script>
<style lang="scss" scoped></style>
