<template>
    <!-- <div style="width:100%;height:6000px;overflow: scroll;">
            <img src="../../../../images/aibokebackground.jpg" width="100%" style="overflow: scroll;">
            <Card>
              <Table class="tableClass" :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list" stripe ></Table>
            </Card>
            
    </div> -->
    <div class="backgroundImage">
      <!-- <img src="../../../../images/aibokebackground.jpg" width="100%" > -->
      <Table class="tableClass" :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list" stripe ></Table>
      <Button style="margin-top: 30px" type="success" @click="checkIntegral">查看积分记录</Button>
      <img src="../../../../images/aibokebottom.png" width="80%" style="margin:10%;">
      <Modal
        class="modal_content"
        v-model="modal"
        title="积分"
        @on-ok="sureIntegral"
        @on-cancel="cancelIntegral">
        <div class="card-list">
          <Card class="card-item" v-for="(item, index) in cardList" :key="index">
            <div>
                <img :src="item.imgUrl" />
                <p>{{item.name}}</p>
                <p>产品积分 {{item.score}}</p>
                <p>使用数量 <Input type="number" @on-blur="getUsePoints" v-model="item.num" style="width: 60px" /></p>
            </div>
           </Card>
        </div>
        <p class="bottom">
          <span>总剩余积分： {{score}}</span>
          <span class="fr">总使用积分： {{totalUsePoints}}</span>
        </p>
    </Modal>
    </div>
    
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import AiBoKeEntity from '@/store/entities/activity/aiboke'

class PageAiBoKeRequest {
  orgId: 0
  weeks: 1
}
@Component({})
export default class AiBoKe extends AbpBase {
  createAiBoKe: AiBoKeEntity = new AiBoKeEntity()
  buttonProps = {
    type: 'default',
    size: 'small',
  }
  modal: boolean = false
  totalUsePoints: Number = 0
  checkIntegral() {
    this.modal = true
  }
  sureIntegral() {
    this.modal = false
    console.log(this.cardList)
    let detalis = []
     this.cardList.forEach((v, k) => {
       if (v.num > 0) {
         detalis.push({
           id: v.id,
           count: parseInt(v.num) 
         })
       }
     })
    console.log(detalis)
    let obj = {
      detalis: detalis,
      acatAmount: this.totalUsePoints,
      amount: this.totalUsePoints,
      orgId: this.lowerConvert(this.$route.query).orgid
    }
    this.PayActity(obj)

  }
  cancelIntegral() {
    this.modal = false
  }
  getUsePoints() {
    this.totalUsePoints = 0
    this.cardList.forEach((v, k) => {
      v.integral = v.integral - parseInt(v.useIntegral)
      this.totalUsePoints = this.totalUsePoints + parseInt(v.num) * v.score
    })
  }
  async GetProduct(id){
    this.$store.dispatch({
      type: 'aiboke/GetProduct',
      data: {orgId:id},
    })
  }
  async PayActity(data){
    this.$store.dispatch({
      type: 'aiboke/PayActity',
      data: data,
    }).then((response)=>{
        
        console.log(response)
        
    })
  }
  async getAiBoKeList(orgId){
      await this.$store.dispatch({
      type: 'aiboke/GetAiBokeAitivity',
      data: {orgId:orgId},
    })
  }
  get cardList() {
    return this.$store.state.aiboke.cardList
  }
  get score() {
    return this.$store.state.aiboke.score
  }
  get loading() {
    return this.$store.state.aiboke.loading
  }
    get list() {
    return this.$store.state.aiboke.list
  }
  created() {
      var paramObject=this.$route.query;
      var lowerObject=this.lowerConvert(paramObject);
      this.getAiBoKeList(lowerObject.orgid)
      this.GetProduct(lowerObject.orgid)

  }
  lowerConvert(paramsObject){
    var objectString=JSON.stringify(paramsObject);
    objectString=objectString.toLowerCase();
    return JSON.parse(objectString);
  }
  columns = [
    {
      title: '月份',
      key: 'createDate',
      resizable: true,
      width:100,
      render:(h: any, params: any)=>{
        var text="";
        if(params.row.createDate!=''&&params.row.createDate!=null && params.row.createDate!=undefined){
          text=params.row.createDate.substring(0,7);
        }
        return h('div',{},text);
      }
    },
    {
      title: '医院名称',
      key: 'orgName',
      resizable: true,
    },
    {
      title: '累计积分',
      key: 'score',
      width:100,
      resizable: true,
    },
    {
      title: '奖品',
      key: 'jp',
      resizable: true,
    },
    {
      title: '快递单号',
      key: 'emsCode',
      resizable: true,
      render:(h: any, params: any)=>{
        var text="";
        if(this.isNullOrEmpty(params.row.emsType)&& !this.isNullOrEmpty(params.row.emsCode)){
          text=params.row.emsCode;
        }
        else if(!this.isNullOrEmpty(params.row.emsType)&& this.isNullOrEmpty(params.row.emsCode)){
          text=params.row.emsType;
        }
        else if(!this.isNullOrEmpty(params.row.emsType)&& !this.isNullOrEmpty(params.row.emsCode)){
          text=params.row.emsType+"："+params.row.emsCode;
        }
        return h('div',{},text);
      }
    }
  ]
  isNullOrEmpty(param){
    return param==null || param=='' || param==undefined || param=='null';
  }
}
</script>

<style  lang="scss">
.backgroundImage{
    background-image: url("../../../../images/aibokebackground.png");
    width: 100%;
    height: 3150px;
    background-size: 100%;
    padding-top: 30%;
    text-align: center;
}
.tableClass{
    width: 60%;
    margin:auto;
}
.html, body{
  overflow: auto !important;
}
.tableClass{
 .ivu-table {
     width: auto !important;
     th{
       text-align: center;
     }
}
}
.modal_content {
  .card-list {
    display: flex;
    flex-wrap: wrap;
    
    .card-item {
      margin: 0 5px;
      width: 180px;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    .card-item img {
      width: 120px;
      height: 80px
    }
  }
  .ivu-modal {
    width: 70% !important;
  }

  .fr {
    float: right;
  }


}


</style>