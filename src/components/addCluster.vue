<template>
  <div>
    <!-- 按钮：用于打开模态框 -->
    <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#addCluster">
      添加集群
    </button>
    <!--    -->
    <!--    -->
    <!-- 模态框开始 -->
    <div class="modal fade" id="addCluster">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title">添加集群</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- 模态框主体 -->
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <form>
                    <div class="btn-toolbar mb-2 mb-md-0">
                      <input v-if="!fileName" class="form-control form-control-sm" type="text" style="width: 80%"
                             placeholder="集群鉴权文件">
                      <input v-if="fileName" class="form-control form-control-sm" type="text" style="width: 80%"
                             :placeholder="fileName">
                      <button type="button" class="btn btn-outline-primary btn-sm" @click="chooseFile">选择文件</button>
                      <input type="file" id="file" style="display: none;" accept="*.*"
                             @change="fileInfo(getFileContent)">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addCluster">提交</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 模态框结束 -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'addCluster',
  data () {
    return {
      loading: true,
      resdata: false,
      status: null,
      file: null,
      fileName: null,
      fileContent: null
    }
  },
  methods:
    {
      chooseFile () {
        // 弹出文件选择框
        let input = document.getElementById('file')
        input.click()
      },
      fileInfo (callback) {
        // 获取input标签选择的文件,并选择第一条
        let resultFile = document.getElementById('file').files[0]
        // 如果文件存在
        if (resultFile) {
          // 获取文件信息
          this.file = resultFile
          // 获取文件名
          this.fileName = resultFile.name

          // 使用 FileReader 来读取文件
          let reader = new FileReader()

          // 读取纯文本文件,且编码格式为 utf-8
          reader.readAsText(resultFile, 'UTF-8')

          // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
          reader.onload = function (e) {
            let fileContent = e.target.result

            // 若为回调函数,则触发回调事件
            if (callback && (typeof callback === 'function')) {
              callback(fileContent)
            }
          }
        }
      },
      getFileContent (fileContent) {
        this.fileContent = fileContent
      },
      addCluster () {
        const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          data: this.fileContent,
          url: '/api/v1/common/kubernetes/cluster'
        }
        axios(options).then(res => {
          this.loading = false
          this.resdata = true
          this.status = res.status
          this.file = null
          this.fileName = null
          this.fileContent = null
          if (res.status === 200) {
            alert('文件传输成功')
          }
        }).catch(err => {
          this.file = null
          this.fileName = null
          this.fileContent = null
          this.status = err.response.status
          alert('配置失败')
        })
      }
    }
}
</script>

<style scoped>
</style>
