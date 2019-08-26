<template>
  <div class='pay-wrapper'>
    <div class='pay-box'>
      <div class="title">ETC支付</div>
      <!-- 输入窗口 -->
      <div class='input-box'>
        <!-- 输入卡号 -->
        <div class='card-number-input'>
          <label>卡号</label>
          <el-input class="text" placeholder="请输入您的信用卡卡号" v-model="cardNum" clearable maxlength="16" @input="controlCardNum()" />
        </div>
        <!-- 输入付款金额 -->
        <div class='card-money-input'>
          <label>付款金额</label>
          <el-input-number v-model="moneyCost" :precision="2" :step="1" :max="9999" :min="0" size='medium'></el-input-number>
        </div>
      </div>
      <!-- 付款按钮 -->
      <div class='pay-button'>
        <el-button @click="pay" type="danger">付款</el-button>
      </div>
      <!-- 是否付款弹窗 -->
      <el-dialog
        title=""
        :visible.sync="isPayDialogVisible"
        width="30%"
        :show-close="false"
        :close-on-click-modal="false">
        <span>是否付款?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isPayDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="getResult">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 支付过程弹窗 -->
      <el-dialog
        title="处理中..."
        :visible.sync="payingVisible"
        width="400px"
        height="500px" :show-close="false"
        :close-on-click-modal="false">
        <el-steps :active="active" :process-status="procStatus"
        align-center>
          <el-step title="校验用户" :description="checkMsg[0]"
          :status = "stepsStatus[0]"></el-step>
          <el-step title="校验黑名单" :description="checkMsg[1]"
          :status = "stepsStatus[1]"></el-step>
          <!-- <el-step title="查询余额" :description="checkMsg[2]"
          :status = "stepsStatus[2]"></el-step> -->
          <el-step title="支付" :description="checkMsg[2]" :status = "stepsStatus[2]"></el-step>
        </el-steps>
        <el-button v-show="errorButton" @click="init">确定</el-button>
      </el-dialog>
      <!-- 结果弹窗 -->
      <el-dialog
        title="支付成功"
        :visible.sync="resultDialogVisible"
        :before-close="init"
        width="420px" >
          <div class='result-data'>
            <label>卡号</label><el-input class="text" v-model="cardNum"/>  
          </div>
          <div class='result-data'>
            <label>扣款</label><el-input class="text"  v-model="moneyCost"/>
          </div>
          <div class='result-data'>
              <label>剩余额度</label><el-input class="text"  v-model="balance"/>
          </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayInput',
  data () {
    return {
      cardNum: '', // 卡号
      moneyCost: '', // 消费金额
      isPayDialogVisible: false, // 是否支付弹窗
      payingVisible: false, // 支付过程弹窗
      resultDialogVisible: false, // 结果弹窗
      // resultDialogTitle: '支付成功',
      active: 0, // 进行到第几个步骤检查
      balance: 0, // 余额
      procStatus: 'wait', // 当前的步骤状态
      errorButton: false, // 出现错误后是否出现确定按钮
      checkMsg: ['正在检验用户信息...', '', ''], // 3个步骤的状态消息变量
      stepsStatus: ['wait', '', ''], // 3个步骤的状态
      Msgs: ['正在检验用户信息...', '正在检查黑名单...', '正在扣款...', '已完成'], // 4个步骤的状态消息
      urls: ['/api/user/checkCardId/','/api/user/checkBlackList/','/api/user/generateOrder/'],
      params: {
        '0': {cardId: ''},
        '1': {cardId: ''},
        '2': {cardId: '',moneyCost: ''}
        }
    }
  },
  methods: {
    // 禁止卡号输入非数字
    controlCardNum: function () {
      this.cardNum = this.cardNum.replace(/\D/g, '')
    },
    // 是否付款窗口
    pay: function () {
      this.isPayDialogVisible = true
    },
    // 初始化数据
    init: function () {
      this.cardNum = ''
      this.isPayDialogVisible = false
      this.payingVisible = false
      this.resultDialogVisible = false
      this.errorButton = false
      this.active = 0
      this.moneyCost = 0
      this.balance = 0
      this.procStatus = 'wait'
      this.checkMsg = ['正在检验用户信息...', '', '', '']
      this.stepsStatus = ['wait', '', '', '']
    },
    goSteps: function () {
      var self = this
      clearTimeout(self.timer)
      self.timer = setTimeout(() => {
        self.$axios.get(self.urls[self.active],{
          params: self.params[self.active]
        }).then(function (resp) {
          self.next(resp.data)
        }
        ).catch(function (error) {
          self.stepsStatus[self.active] = 'error'
          self.checkMsg[self.active] = '网络拥堵，请稍后再试...'
          self.errorButton = true
          console.log(error)
        })
      }, 0)
    },
    next: function (result) { // 返回成功进行下一步
      // if (result.resultNo === 1) {
      if (result.code === 1) {
        console.log(result)
        this.stepsStatus[this.active] = 'success'
        this.checkMsg[this.active] = this.Msgs[3]
        if (this.active <= 2) { // 不是最后一步返回成功，都要设置下一步的状态信息
          this.active++
          this.procStatus = 'wait'
          this.checkMsg[this.active] = this.Msgs[this.active]
          this.goSteps() // 向后台发出下一步检测
        }
        if (this.active > 2) { // 当成功后就弹出结果窗口
          var self = this
          clearTimeout(self.timer);
          self.balance = result.result.balance
          self.timer = setTimeout(() => {
          // console.log(result)
          self.payingVisible = false
          self.resultDialogVisible = true
          // this.resultDialogTitle = '支付成功！'
          },1500)
        }
      } else { // 返回结果是错误
        this.stepsStatus[this.active] = 'error'
        this.checkMsg[this.active] = result.msg
        if (this.active !== 1) { // 如果不是检测出用户是黑名单，就显示确认付款失败按钮，进行下一次支付
          this.errorButton = true
        }
        if (this.active === 1) { // 如果是检测出黑名单仍然扣款
          this.active++
          this.procStatus = 'wait'
          this.checkMsg[this.active] = this.Msgs[this.active]
          this.goSteps() // 向后台发出下一步检测
        }
      }
    },
    // 获取支付结果
    getResult: function () {
      this.isPayDialogVisible = false // 关闭是否付款的dialog
      if(this.cardNum.length ===  16) {
        this.payingVisible = true // 显示正在付款的步骤dialog
        // this.isPayDialogVisible = false // 关闭是否付款的dialog
        // console.log(this.params[0])
        this.params[0]["cardId"] = this.cardNum
        this.params[1]["cardId"] = this.cardNum
        this.params[2]["cardId"] = this.cardNum
        this.params[2]["moneyCost"] = this.moneyCost

        console.log(this.params)

        this.goSteps() // 向后台发出第一步检测
      }else {
        this.$message.error('请输入16位的卡号');
      }
    }
  }
}
</script>

<style scoped>
 .text{
   width: 200px;
 }

 .pay-wrapper{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top:0;
  margin: auto;
  margin-top: 180px;
  width: 400px;
  height: 300px;
  background-color:rgba(255, 255, 255, 0.8);
  /*兼容ie*/
  filter: Alpha(Opacity=80);
  border-radius:15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.6);

 }

 /* 支付盒子 */
 .pay-box{
   height:230px;
   position: absolute;
   margin: auto;
   left: 0;
   right: 0;
   bottom: 0;
   top: 0;

 }

  /* 输入框盒子 */
 .input-box{
   margin-top: 40px;
   margin-bottom: 20px;
   text-align: left;
   margin:40px 0 20px 33px;

 }

 /* 卡号输入与付款金额输入 */
  .card-number-input,
  .card-money-input{
    margin-bottom: 10px;
    /* display: inline-block; */
    /* position: absolute; */
    /* right: 0; */
  }

  .card-number-input > label,
  .card-money-input > label{
    display: inline-block;
    width: 64px;
    text-align-last: justify;
    text-align: justify;
    font-weight: bold;
    margin-right: 5px;
  }

  .title{
    /* font-weight: "微软雅黑"; */
    font-weight: bold;
    font-size: 30px;
  }

  /* 结果弹窗 */
  .result-data{
    margin-bottom: 20px;
  }
  .result-data > label{
    margin-right: 10px;
    display: inline-block;
    width: 56px;
    /* text-align: right;
     */
    text-align-last: justify;
    text-align: justify;
  }


</style>
