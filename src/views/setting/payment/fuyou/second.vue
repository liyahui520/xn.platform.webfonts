<template>
  <div class="secondClass">
    <iframe
      :src="url"
      width="80%"
      frameborder="0"
      height="700"
      style="margin-left: 10%"
    ></iframe>

    <div>
        <Row>
            <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="80"
            inline
            >
            <!-- <FormItem>
                <Button type="primary" @click="stepUp">上一步</Button>
            </FormItem> -->
            <FormItem label="验证码" prop="code">
                <Col span="18">
                <Input v-model="formValidate.code" placeholder="请输入验证码"></Input>
                </Col>
                <Col span="4">
                  <Button type="primary" :disabled="isEnabled" @click="againGetCode" style="width:120px;margin-left:20px;">重新获取验证码</Button>
                </Col>
            </FormItem>
            </Form>
            <Button type="primary" @click="handleSubmit('formValidate')" style="width:200px;height: max-content;">下 一 步</Button >
        </Row>

    </div>


  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Inject,
  Prop,
  Watch,
  Emit,
} from "vue-property-decorator";
import Util from "@/lib/util";
import AbpBase from "@/lib/abpbase";

@Component({})
export default class FuYou extends AbpBase {
  isEnabled:boolean=true;
  @Emit("stepValueEmit") send(val: any) {}
  SMSCode: string = "";
  url: string = "";
  elecContractGenerateId:number=-1;
  trace_no: string = "";

  formValidate: any = {
    code: "",
  };
  ruleValidate: Object = {
    code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
  };

  created() {
    if (
      localStorage.getItem("trace_no") != null &&
      localStorage.getItem("trace_no") != "" &&
      localStorage.getItem("elecContractGenerateId") != null &&
      localStorage.getItem("elecContractGenerateId") != "" 
    ) {
      var elecContractGenerateIdValue =parseInt(localStorage.getItem("elecContractGenerateId"));
      var trace_noValue = localStorage.getItem("trace_no");
      this.trace_no = trace_noValue;
      this.elecContractGenerateId=elecContractGenerateIdValue;
      this.loadHtmlUrl();
    } else {
      this.trace_no = "";
      this.send(0);
    }
  }
  //加载协议对应的url地址
  loadHtmlUrl() {
    this.$store
      .dispatch({
        type: "fuyoupay/LoadHtml",
        data: this.trace_no,
      }).then((getResponse) => {
        this.$Message.success({
                    content: '请注意查收短信!',
                    duration: 5,
                    closable: true
                });
        this.url = getResponse.sign_url;
      });
  }
  //上一步事件
  stepUp(){

  }
  //重获取验证码事件
  againGetCode(){
      this.loadHtmlUrl();
  }
  //下一步事件
  handleSubmit(name) {
    (this.$refs[name] as any).validate((valid) => {
      if (valid) {
        this.stepNext();
      }
    });
  }
  stepNext(){
      var requestParams={
          elecContractGenerateId:this.elecContractGenerateId,
          verifyNo:this.formValidate.code
      }
      this.$store
      .dispatch({
        type: "fuyoupay/ElecContractSign",
        data: requestParams,
      }).then((response)=>{
          console.log("签署协议接口返回的数据",response)
          localStorage.setItem("stepValue","2");
          this.send(2);
      })
  }
}
</script>

<style scope>

.secondClass .ivu-form-item-error-tip {
  margin-top: 40px !important;
  margin-left: -130px !important;
}
.secondClass .ivu-row{
    display: flex !important;
    justify-content: space-around !important;
    top: 15px !important;
}
</style>