<template>
  <div>
    {{ page }}
    {{ total }}
    {{ pageNum }}
  </div>
</template>

<script>
export default {
  name: 'paging',
  provide: ['pageInfo'],
  data () {
    return {
      page: 1,
      total: 145,
      pageNum: 10
    }
  }
}
</script>

<style scoped>
</style>
