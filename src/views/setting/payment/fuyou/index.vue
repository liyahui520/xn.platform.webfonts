<template>
    <div>
        <div>
      <Card dis-hover>
        <Steps :current="stepValue">
          <Step title="签署" content="这里是该步骤的描述信息">
              
          </Step>
          <Step title="确认" content="这里是该步骤的描述信息"></Step>
          <Step title="完成" content="这里是该步骤的描述信息"></Step>
        </Steps>

        <Button type="primary" @click="nextStep">下一步</Button>

            <First v-if="stepValue == 0" />
        <Second v-if="stepValue == 1" />
        <Third v-if="stepValue == 2" />
      </Card>
    
      
</div>

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
.container {
  overflow: hidden;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height: 100%;
  background: #f0f2f5;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #d8d8d8;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #bfc1c4;
}
</style>