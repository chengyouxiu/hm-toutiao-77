<template>
  <div class='container'>
    <div class="header">header</div>
    <div class="content">
    <slot name="content" :msg="msg">默认内容</slot>
    </div>
    <div class="footer">
        <slot name="footer">默认底部</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTest',
  data () {
    return {
      msg: 'my-test的数据'
    }
  }
}
</script>

<style scoped lang='less'>

</style>
