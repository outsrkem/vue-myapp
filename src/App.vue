<template>
  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse sidebarMenufont">
        <div class="sidebar-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link">总览</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/navigationLink" class="nav-link">导航链接</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/resmonitoring" class="nav-link">资源监控</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/navigation" class="nav-link">服务管理</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/clustermanage" class="nav-link">集群管理</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <!--这一部分是路由后显示的动态内容内容-->
      <router-view></router-view>
      <!--这一部分是路由显示的内容-->
    </div>
  </div>
</template>

<script>

export default {}
</script>

<style>
/*
linkActiveClass: 'active'  使用了这个配置，则下面的可以不用，
激活的div会标识active，而不是router-link-active
.router-link-active {
  color: #007bff !important;
}
*/

</style>
