<template>
  <!--导航-->
  <div class="container-fluid">
    <div class="row">

      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <!---->
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h3">服务管理</h1>
          <!--下拉选择表单-->
          <form>
            <div class="row">
              <div class="col">
                <input type="text" class="form-control form-control-sm" placeholder="First name">
              </div>
              <div class="col">
                <input type="text" class="form-control form-control-sm" placeholder="First name">
              </div>
            </div>
          </form>
          <!--下拉选择结束-->
          <!--*************************************************************-->
          <!--按钮开始-->
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
            </div>
          </div>
        </div>
        <!--按钮结束-->
        <!--*************************************************************-->
        <!--内容开始-->
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th>NAME</th>
              <th>READY</th>
              <th>AVAILABLE</th>
              <th>CONTAINERS</th>
              <th>IMAGES</th>
              <th>VERSION</th>
              <th>CREATIONTIME</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data,index) in workingload" :key="index">
              <td>{{ data.name }}</td>
              <td>{{ data.availableReplicas }}/{{ data.replicas }}</td>
              <td>{{ data.availableReplicas }}</td>
              <td>{{ data.containers }}</td>
              <td>{{ data.image }}</td>
              <td>{{ data.imageversion }}</td>
              <td>{{ data.creationTimestamp }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--内容结束-->
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'navigation',
  data () {
    return {
      loading: false,
      resdata: true,
      workingload: null
    }
  },
  mounted () {
    const namespaces = 'default'
    const control = 'deployments'
    const url = '/api/v1/common/kubernetes/workingload?namespaces=' + namespaces + '&' + 'control=' + control
    // 发送请求
    axios.get(url).then(res => {
      const result = res.data
      const workingload = result.response.items.map(itme => ({
        id: itme.id,
        name: itme.name,
        namespace: itme.namespace,
        labels: itme.labels,
        replicas: itme.replicas,
        image: itme.image,
        imageversion: itme.imageversion,
        availableReplicas: itme.availableReplicas,
        creationTimestamp: itme.creationTimestamp,
        containers: itme.containers
      }))
      this.workingload = workingload
      // 更新状态
      if (workingload.length !== 0) {
        this.resdata = false
      }
    }).catch(error => {
      // 请求失败
      console.log(error)
    })
  }

}
</script>

<style scoped>

</style>
