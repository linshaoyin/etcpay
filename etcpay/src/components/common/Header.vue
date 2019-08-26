<template>
  <div class="header">
    <el-container>
      <el-header>
        <el-row type="flex">
          <el-col class="logo" :span="6">
            <div>
              <a href="#" style="padding-left: 20px">
                <img src="../../assets/images/home/suit_logo.png" alt="" width="330px" height="40">
              </a>
            </div>
          </el-col>
          <el-col :span="14">
            <div>
              <!-- <label class="tip">ECT服务</label> -->
            </div>
          </el-col>
          <el-col :span="4">
            <div class="date">
              <DateShow/>
            </div>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>

import DateShow from '../common/DateShow'
// import TabSwitch from '../common/Tabswitch'

export default {
  name: 'Header',
  data () {
    return {
    }
  },
  components: {
    DateShow
    // TabSwitch
  }
}
</script>

<style scoped>
  .header{
    border-bottom: 1px solid rgba(255, 253, 253, 0.274);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);

  }
  .header .el-container{
    width: 100%;
    margin: 0 auto;
  }
  .el-header{
    height: 80px!important;
    padding: 0;
  }
  .el-row{
    align-items: center;
    height: 100%;
  }

  .tip{
    display: block;
    font-size: 40px;
    font-weight: bold;
  }

</style>
