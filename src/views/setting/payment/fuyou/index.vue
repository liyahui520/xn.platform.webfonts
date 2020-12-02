<template>
    <div> 
      <Card dis-hover>
        <Steps :current="stepValue"  direction="horizontal" style="margin:10px 30px 30px 30px;">
          <Step title="信息录入" content="信息一经填写将无法进行修改，请慎重填写！"></Step>
          <Step title="协议签署" content="请认真阅读此协议，填入手机短信验证码。"></Step>
          <Step title="提交成功" content="资料已提交审核"></Step>
        </Steps>

        <!-- <Button type="primary" @click="nextStep">下一步</Button> -->
        
      <div :height="height-200" :style="style">
        <First v-if="stepValue == 0" @stepValueEmit="stepValueEmit($event)" />
        <Second v-if="stepValue == 1" @stepValueEmit="stepValueEmit($event)" />
        <Third v-if="stepValue == 2" @stepValueEmit="stepValueEmit($event)" />
        </div>
        
      </Card>  
    </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";

import AbpBase from "@/lib/abpbase";
import First from "./first.vue";
import Second from "./second.vue";
import Third from "./third.vue";
// //引用组件模板
@Component({
  components: { First, Second, Third },
})
export default class FuYou extends AbpBase {
  stepValue: number = 0;
  
  height=`${document.documentElement.clientHeight}`;
  style="overflow: auto;height:"+(parseInt(this.height)-100)+"px";

  mounted(){
    let that = this; 
      window.onresize = () => {
          return (() => {
            let height=`${document.documentElement.clientHeight}`;
          that.style="overflow: auto;height:"+(parseInt(height)-100)+"px";
          })();
        };
  }
 stepValueEmit(val :any){
   this.stepValue=val;
 }
  nextStep() {
    if (this.stepValue == 2) {
      this.stepValue = 0;
    } else {
      this.stepValue += 1;
    }
  }
  created() {
    if(localStorage.getItem("trace_no")!=null && localStorage.getItem("trace_no")!="" && localStorage.getItem("stepValue")!=null && localStorage.getItem("stepValue")!="" && localStorage.getItem("elecContractGenerateId") != null && localStorage.getItem("elecContractGenerateId") != "" ){
        this.stepValue=parseInt(localStorage.getItem("stepValue"));
    }
    else if(localStorage.getItem("trace_no")!=null && localStorage.getItem("trace_no")!="" && localStorage.getItem("stepValue")!=null && localStorage.getItem("stepValue")!="" && (localStorage.getItem("elecContractGenerateId") == null || localStorage.getItem("elecContractGenerateId") ==undefined)){
      this.stepValue=1;
    }
    else{
      this.stepValue=0;
    }
  };
}
</script>

<style scoped>

</style>