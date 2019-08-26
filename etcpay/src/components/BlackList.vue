<template>
  <div class="black-wrapper">
    <div>

      <!--使用slice计算出分页数据 tooltip-effect第一行标题为黑色字体-->
      <!-- <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        v-loading = "pictLoading"
        element-loading-background = "rgba(0, 0, 0, 0.5)"
        element-loading-text = "数据正在加载中"
        element-loading-spinner = "el-icon-loading"
        tooltip-effect="dark"
        style="width: 100%"> -->
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        v-loading = "pictLoading"
        tooltip-effect="dark"
        class="black-table"
        sortable
        :default-sort="{prop: 'createTime', order: 'descending'}"
        :sort-orders="['ascending', 'descending']" 
        :border="true"
        >
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          label="证件类型"
          width='100'
          header-align="center"
          align="center">
          <!--使用slot-scope获取当前行，根据当前行的证件类型显示对应文字-->
          <template slot-scope="scope">
            <div v-if="scope.row.identity_type===1">身份证</div>
            <div v-else>护照</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="identity_number"
          label="证件号码"
          width="200"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="生效时间"
          header-align="center" 
          width="150"
          align="center">
          <template slot-scope="scope">
            {{scope.row.createTime | createTime}}
          </template>
        </el-table-column>
        <el-table-column
          prop="reason_banned"
          label="拉黑原因"
          width="150"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.reason_banned===1">长时间逾期不还款</div>
            <div v-else>账户透支</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-control">
        <!--page-sizes页面上显示可选一页显示多少数据-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="currentTotal">
        </el-pagination>
        <el-button icon="el-icon-refresh-right" primary
        size='mini'
        class="refresh-button" 
        @click='getBlackList'></el-button>
        <!-- {{}} -->
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ["token"],
  data () {
    // 测试数据
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      currentTotal: 0,
      pictLoading: false,
      tokens: {token: ''}
    }
  },
  filters: {
    createTime (value) {
      let date = new Date(value)
      let Y = date.getFullYear()
      let M = date.getMonth()
      let D = date.getDate()
      let H = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      let n = date.getMilliseconds()
      return `${Y}/${M}/${D} ${H}:${m}:${s}`
    }
  },
  mounted: function(){
    console.log(this.token)
    this.tokens.token = this.token
    this.getBlackList()
  },
  methods: {
   
    handleSizeChange (val) {
      this.pageSize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    },
    getBlackList: function() {
      console.log(1);
      var self = this
      this.$axios.get('/api/blacklist/getAll/',{
          params: self.tokens
        }).then( function(res) {
        if (res.data.code === 1) {
          self.tableData = res.data.result.blacklists
          self.currentTotal = res.data.result.num
          self.pageSize = 5
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  // ,
  // 在页面加载完成后发出数据调用,pictLoading=false取消显示数据正在加载
  // mounted () {
  //    this.pictLoading = false
  //   this.getBlackList()
  // }
}
</script>

<style scoped>
  .black-wrapper{
    position: absolute;
    left: 0;
    right: 0;
    top: 25%;
    margin: auto;
    width: 720px;
    height: 330px;
    background-color:rgba(255, 255, 255, 0.7);
    /*兼容ie*/
    filter: Alpha(Opacity=80);
    border-radius:15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6);
    /* padding-bottom: 10px; */
  }
  /* 表格 */
  .black-table{
    width: 100%;
    opacity: 0.9;
    /* background-color: rgba(255, 255, 255, 0.5); */
    border-radius: 15px;
    padding: 0 15px;
    color: black;

  }
  /* 控制第几页 */
  .page-control{
    text-align: center;
    /* margin-bottom: 10px; */
    border-radius: 15px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  /* 刷新 */
  .refresh-button{
    position: absolute;
    right: 150px;
    bottom: 2px;
    opacity: 0.7;
    border-radius: 5px;


  }

</style>
