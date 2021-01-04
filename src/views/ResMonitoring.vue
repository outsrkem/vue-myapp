<template>
  <div class="container-fluid">
    <div class="row">
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <!---->
        <div
          class="d-flex  flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
          <div style="width: 13%;">
            <h1 class="h3">资源监控</h1>
          </div>
          <!--<div class="" style="border:1px solid #FF00FF;">-->
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button type="button" class="btn btn-sm btn-outline-secondary" @click="getServerList">刷新</button>
            </div>
          </div>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button type="button" class="btn btn-sm btn-outline-secondary">添加</button>
            </div>
          </div>
          <div class="btn-toolbar mb-2 mb-md-0">
            <div class="btn-group mr-2">
              <button type="button" class="btn btn-sm btn-outline-secondary">移除</button>
            </div>
          </div>
        </div>
        <!---->
        <!--<div style="border:1px solid #FF00FF;">-->
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
          <table class="table table-bordered">
            <thead>
            <tr class="text-center">
              <th scope="col" style="width: 17%; height: auto;">主机名</th>
              <th scope="col" style="width: 13%; height: auto;">IP地址</th>
              <th scope="col">内存</th>
              <th scope="col">CPU</th>
              <th scope="col">磁盘</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data,index) in resmonitoring" :key="index">
              <td>{{ data.hostname }}</td>
              <td>
                <span id="text">{{ data.hostip }}</span>
                <!--<button type="button" class="btn btn-primary btn-sm" @click="copyText(data.hostip)">copy</button>-->
              </td>
              <td>
                <div class="progress">
                  <!--"width: 55%;" -->
                  <div v-if="data.mem_proportion<=70" class="progress-bar" role="progressbar"
                       :style="{width: data.mem_proportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.mem_proportion }}&nbsp;%
                  </div>
                  <div v-if="data.mem_proportion>70 && data.mem_proportion<=90" class="progress-bar bg-warning"
                       role="progressbar"
                       :style="{width: data.mem_proportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.mem_proportion }}&nbsp;%
                  </div>
                  <div v-if="data.mem_proportion>90" class="progress-bar bg-danger"
                       role="progressbar"
                       :style="{width: data.mem_proportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.mem_proportion }}&nbsp;%
                  </div>
                </div>
              </td>
              <td>
                <div class="progress">
                  <div v-if="data.cpu_proportion<=70" class="progress-bar" role="progressbar"
                       :style="{width: data.cpu_proportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.cpu_proportion }}&nbsp;%
                  </div>
                  <div v-if="data.cpu_proportion>70 && data.cpu_proportion<=90" class="progress-bar bg-warning"
                       role="progressbar"
                       :style="{width: data.cpu_proportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.cpu_proportion }}&nbsp;%
                  </div>
                  <div v-if="data.cpu_proportion>90" class="progress-bar bg-danger" role="progressbar"
                       :style="{width: data.cpu_proportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.cpu_proportion }}&nbsp;%
                  </div>
                </div>
              </td>
              <td>
                <div class="progress">
                  <div v-if="data.disk_proportion<=70" class="progress-bar" role="progressbar"
                       :style="{width: data.disk_proportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.disk_proportion }}&nbsp;%
                  </div>
                  <div v-if="data.disk_proportion>70 && data.disk_proportion<=90" class="progress-bar bg-warning"
                       role="progressbar" :style="{width: data.disk_proportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.disk_proportion }}&nbsp;%
                  </div>
                  <div v-if="data.disk_proportion>90" class="progress-bar bg-danger" role="progressbar"
                       :style="{width: data.disk_proportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.disk_proportion }}&nbsp;%
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="pageInfo && !resdata">共{{ pageInfo.total }}条，第{{ pageInfo.page }}页，共{{ pageInfo.pageNum }}页</div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ResMonitoring',
  data () {
    return {
      loading: true,
      resdata: false,
      pageInfo: null,
      resmonitoring: null
    }
  },
  mounted () {
    const options = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      url: '/api/v1/common/resource/monitor'
    }
    // 发送请求
    axios(options).then(res => {
      const result = res.data
      const pageInfo = result.response.pageInfo
      this.pageInfo = pageInfo
      const resmonitoring = result.response.items.map(itme => ({
        id: itme.id,
        hostip: itme.hostip,
        hostname: itme.hostname,
        mem_total: itme.mem_total,
        mem_used: itme.memory.used,
        mem_section: itme.memory.section,
        mem_proportion: itme.memory.proportion,
        cpu_total: itme.cpu.total,
        cpu_used: itme.cpu.used,
        cpu_section: itme.cpu.section,
        cpu_proportion: itme.cpu.proportion,
        disk_total: itme.disk.total,
        disk_used: itme.disk.used,
        disk_section: itme.disk.section,
        disk_proportion: itme.disk.proportion
      }))
      this.resmonitoring = resmonitoring
      // 更新状态
      if (resmonitoring.length !== 0) {
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
  methods: {
    getServerList () {
      // 清空数据
      this.resmonitoring = null
      // 构造请求体
      const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        url: '/api/v1/common/resource/monitor'
      }
      // 发送请求
      axios(options).then(res => {
        const result = res.data
        const pageInfo = result.response.pageInfo
        this.pageInfo = pageInfo
        const resmonitoring = result.response.items.map(itme => ({
          id: itme.id,
          hostip: itme.hostip,
          hostname: itme.hostname,
          mem_total: itme.mem_total,
          mem_used: itme.memory.used,
          mem_section: itme.memory.section,
          mem_proportion: itme.memory.proportion,
          cpu_total: itme.cpu.total,
          cpu_used: itme.cpu.used,
          cpu_section: itme.cpu.section,
          cpu_proportion: itme.cpu.proportion,
          disk_total: itme.disk.total,
          disk_used: itme.disk.used,
          disk_section: itme.disk.section,
          disk_proportion: itme.disk.proportion
        }))
        //
        this.resmonitoring = resmonitoring
        // 更新状态
        if (resmonitoring.length !== 0) {
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
