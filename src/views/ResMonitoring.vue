<template>
  <div class="container-fluid">
    <div class="row">
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <!---->
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h3">资源监控</h1>
          <!--<div class="" style="border:1px solid #FF00FF;">-->
          <span class="glyphicon glyphicon-pencil"> Edit</span>
          <div class="">
            <div class="btn-group mr-5">
              <button type="button" class="btn btn-sm btn-outline-secondary">刷新</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
              <button type="button" class=" btn btn-sm btn-outline-secondary">Export</button>
            </div>
          </div>
        </div>
        <!---->
        <!--<div style="border:1px solid #FF00FF;">-->
        <h5 v-if="resdata">暂无数据，请稍后再试。</h5>
        <div>
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
                  <div v-if="data.memproportion<=70" class="progress-bar" role="progressbar"
                       :style="{width: data.memproportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.memproportion }}&nbsp;%
                  </div>
                  <div v-if="data.memproportion>70 && data.memproportion<=90" class="progress-bar bg-warning"
                       role="progressbar"
                       :style="{width: data.memproportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.memproportion }}&nbsp;%
                  </div>
                  <div v-if="data.memproportion>90" class="progress-bar bg-danger"
                       role="progressbar"
                       :style="{width: data.memproportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.memproportion }}&nbsp;%
                  </div>
                </div>
              </td>
              <td>
                <div class="progress">
                  <div v-if="data.cpuproportion<=70" class="progress-bar" role="progressbar"
                       :style="{width: data.cpuproportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.cpuproportion }}&nbsp;%
                  </div>
                  <div v-if="data.cpuproportion>70 && data.cpuproportion<=90" class="progress-bar bg-warning"
                       role="progressbar"
                       :style="{width: data.cpuproportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.cpuproportion }}&nbsp;%
                  </div>
                  <div v-if="data.cpuproportion>90" class="progress-bar bg-danger" role="progressbar"
                       :style="{width: data.cpuproportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.cpuproportion }}&nbsp;%
                  </div>
                </div>
              </td>
              <td>
                <div class="progress">
                  <div v-if="data.diskproportion<=70" class="progress-bar" role="progressbar"
                       :style="{width: data.diskproportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.diskproportion }}&nbsp;%
                  </div>
                  <div v-if="data.diskproportion>70 && data.diskproportion<=90" class="progress-bar bg-warning"
                       role="progressbar" :style="{width: data.diskproportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.diskproportion }}&nbsp;%
                  </div>
                  <div v-if="data.diskproportion>90" class="progress-bar bg-danger" role="progressbar"
                       :style="{width: data.diskproportion + '%'}"
                       aria-valuenow="0"
                       aria-valuemin="0"
                       aria-valuemax="100">{{ data.diskproportion }}&nbsp;%
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
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
      loading: false,
      resdata: true,
      resmonitoring: null
    }
  },
  methods: {
    copyText (msg) {
      var input = document.createElement('input')
      input.value = msg
      // 添加临时实例
      document.body.appendChild(input)
      // 选择实例内容
      input.select()
      // 执行复制
      document.execCommand('Copy')
      // 删除临时实例
      document.body.removeChild(input)
    }
  },
  mounted () {
    const url = '/api/v1/common/resource/monitor'
    // 发送请求
    axios.get(url).then(res => {
      const result = res.data
      const resmonitoring = result.response.items.map(itme => ({
        id: itme.id,
        hostip: itme.hostip,
        hostname: itme.hostname,
        memtotal: itme.memtotal,
        memuse: itme.memuse,
        memsection: itme.memsection,
        memproportion: itme.memproportion,
        cputotal: itme.cputotal,
        cpuuse: itme.cpuuse,
        cpusection: itme.cpusection,
        cpuproportion: itme.cpuproportion,
        disktotal: itme.disktotal,
        diskuse: itme.diskuse,
        disksection: itme.disksection,
        diskproportion: itme.diskproportion
      }))
      this.resmonitoring = resmonitoring
      // 更新状态
      if (resmonitoring.length !== 0) {
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
