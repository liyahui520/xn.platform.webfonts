<template>
    <div> 
      <Card dis-hover>
        <Steps :current="stepValue" direction="horizontal">
          <Step title="签署" content="这里是该步骤的描述信息">
              
          </Step>
          <Step title="确认" content="这里是该步骤的描述信息"></Step>
          <Step title="完成" content="这里是该步骤的描述信息"></Step>
        </Steps>

        <Button type="primary" @click="nextStep">下一步</Button>
        
      <div :height="height-200" :style="style">
        <First v-if="stepValue == 0" />
        <Second v-if="stepValue == 1" />
        <Third v-if="stepValue == 2" />
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
          console.log("浏览器")
          let height=`${document.documentElement.clientHeight}`;
        that.style="overflow: auto;height:"+(parseInt(height)-100)+"px";
        })();
      };
}
 
  nextStep() {
    if (this.stepValue == 2) {
      this.stepValue = 0;
    } else {
      this.stepValue += 1;
    }
  }
}
</script>

<style scoped>

</style>