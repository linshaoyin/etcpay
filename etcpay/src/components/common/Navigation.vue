<template>

    <div class="nav">
        <el-menu :default-active="activeName" class="el-menu-demo" @select="handleSelect" active-text-color="rgba(223, 36, 36, 0.952)" background-color="rgba(255,255,255,0)">
            <el-submenu index=''>
                <template slot="title"></template>
                <el-menu-item index="pay">支付页面</el-menu-item>
                <el-menu-item index="black">黑名单</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'Nav',
  data () {
    return {
      choosed: 'pay',
      activeName: 'pay'
      
    }
  },
  methods: {
    // 控制路由跳转
    handleSelect: function(key, keyPath) {
        this.activeName = key
        this.$router.push(this.activeName)
    }
  }
}
</script>
<style>

    .nav{
        font-weight: bold;
        width: 120px;
        position: absolute;
        right: 0;
    }

    .el-menu-demo{
        width: 120px;
        text-align: left;
    }

</style>
