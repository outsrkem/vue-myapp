<template>
  <!--导航-->
  <div class="container-fluid">
    <div class="row">

      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div class="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <!--                <div class=" w-25" style="border:1px solid #FF00FF;">-->
          <div class="" style="width: 13%;">
            <h1 class="h3">集群管理</h1>
          </div>
          <!--按钮开始-->
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button type="button" class="btn btn-sm btn-outline-secondary" @click="getClustersData">刷新</button>
            </div>
          </div>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <addCluster/>
            </div>
          </div>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button type="button" class="btn btn-sm btn-outline-secondary">移除集群</button>
            </div>
          </div>
          <!--按钮结束-->
        </div>

        <!--*************************************************************-->
        <div v-if="loading">
          <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button>
        </div>
        <div v-if="resdata" class="alert alert-warning" role="alert">
          <strong>暂无数据，请稍后再试。</strong>
        </div>
        <!--内容开始-->
        <div v-if="!resdata" class="table-responsive">
          <table class="table table-hover">
            <thead>
            <tr>
              <th>集群ID</th>
              <th>名称</th>
              <th>用户</th>
              <th>集群地址</th>
              <th>添加时间</th>
              <th>状态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data,index) in clustersdata" :key="index">
              <td>{{ data.id }}</td>
              <td>{{ data.clusterName }}</td>
              <td>{{ data.userName }}</td>
              <td>{{ data.server }}</td>
              <td>{{ data.creationTime }}</td>
              <td>
                <span v-if="data.status==1">有效</span>
                <span v-if="data.status==0">无效</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--内容结束-->
        <!--*************************************************************-->
      </main>
    </div>
  </div>
</template>

<script>
import addCluster from '../../components/addCluster.vue'
import axios from 'axios'

export default {
  name: 'cluster',
  data () {
    return {
      loading: true,
      resdata: false,
      clustersdata: null
    }
  },
  mounted () {
    const url = '/api/v1/common/kubernetes/cluster'
    // 发送请求
    axios.get(url).then(res => {
      const result = res.data
      const clustersdata = result.response.items.map(itme => ({
        id: itme.id,
        clusterName: itme.clusterName,
        userName: itme.userName,
        currentContext: itme.currentContext,
        server: itme.server,
        creationTime: itme.creationTime,
        status: itme.status
      }))
      this.clustersdata = clustersdata
      // 更新状态
      if (clustersdata.length !== 0) {
        this.resdata = false
      }
      this.loading = false
    }).catch(error => {
      // 请求失败
      this.loading = false
      this.resdata = true
      console.log(error)
    })
  },
  components: {
    addCluster
  },
  methods: {
    getClustersData () {
      this.clustersdata = null
      const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        url: '/api/v1/common/kubernetes/cluster'
      }
      // 发送请求
      axios(options).then(res => {
        const result = res.data
        const clustersdata = result.response.items.map(itme => ({
          id: itme.id,
          clusterName: itme.clusterName,
          userName: itme.userName,
          currentContext: itme.currentContext,
          server: itme.server,
          creationTime: itme.creationTime,
          status: itme.status
        }))
        this.clustersdata = clustersdata
        // 更新状态
        if (clustersdata.length !== 0) {
          this.resdata = false
        }
        this.loading = false
      }).catch(error => {
        // 请求失败
        this.loading = false
        this.resdata = true
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
