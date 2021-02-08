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

      <img src="../../../../images/aibokebottom.png" width="80%" style="margin:10%;">
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
  async getAiBoKeList(orgId){
      await this.$store.dispatch({
      type: 'aiboke/GetAiBokeAitivity',
      data: {orgId:orgId},
    })
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

</style>