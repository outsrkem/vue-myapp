<template>
  <div class="container-fluid">
    <div class="row">
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <!---->
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h3">导航链接</h1>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
              <span data-feather="calendar"></span>
              This week
            </button>
          </div>
        </div>
        <!---->
        <h5 v-if="loading">Loading ...</h5>
        <h5 v-if="resdata">暂无数据，请稍后再试。</h5>
        <div class="table-responsive">
          <table class="table table-bordered" style="width: auto!important; font-size: 20px;">
            <!--循环填充表格开始-->
            <tr v-for="(data,index) in linkData" :key="index">
              <td style="text-align: center">{{ data.name }}</td>
              <td><a :href="data.linkUrl" target="_blank">{{ data.linkUrl }}</a></td>
            </tr>
            <!--循环填充表格结束-->
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NavigationLink',
  data () {
    return {
      // 定义状态
      loading: true,
      resdata: true,
      // 数据格式：linkData: [{id: '', name: '', linkUrl: ''}]
      linkData: null
    }
  },
  mounted () {
    const url = '/api/v1/common/navigation/links'
    // 发送请求
    axios.get(url).then(res => {
      const result = res.data
      const linkData = result.response.items.map(itme => ({
        id: itme.id,
        name: itme.name,
        linkUrl: itme.content
      }))
      this.linkData = linkData
      // 更新状态
      if (linkData.length !== 0) {
        this.resdata = false
      }
      this.loading = false
    }).catch(error => {
      // 请求失败
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>
