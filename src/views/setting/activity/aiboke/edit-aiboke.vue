<template>
      <div>
    <Modal
      :title="L('UpdateAiBoKeInfo')"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
      :mask-closable="false"
      :aibokeId="aibokeId"
    >
      <Form
        ref="aibokeForm"
        :model="aibokeEditInfo"
        :label-width="110"
      >
        <Divider orientation="left" size="small">活动信息</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('AiBoKe_CreateDate')" prop="companyName">
              {{aibokeEditInfo.createDate}}
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('AiBoKe_OrgName')" prop="licenseNo">
              {{aibokeEditInfo.orgName}}
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('AiBoKe_Score')" prop="leader">
              {{aibokeEditInfo.score}}
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('AiBoKe_JP')" prop="contacter">
              <Input
                v-model="aibokeEditInfo.jp"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('AiBoKe_EMSType')" prop="telephone">
              <Input
                v-model="aibokeEditInfo.emsType"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
                    <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('AiBoKe_EMSCode')" prop="faxNumber">
              <Input
                v-model="aibokeEditInfo.emsCode"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{ L('Cancel') }}</Button>
        <Button @click="save" type="primary">{{ L('OK') }}</Button>
      </div>
    </Modal>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
import Util from '../../../../lib/util'
import AbpBase from '../../../../lib/abpbase'
import AiBoKe from '@/store/entities/activity/aiboke'

@Component
export default class UpdateAiBoKe extends AbpBase {
//   @Prop({ type: Boolean, default: false }) value: boolean
  @Prop({ type: Boolean, default: false }) value: boolean
  @Prop({ type: Number, default: 0 }) aibokeId: Number
  aibokeEditInfo: AiBoKe=new AiBoKe()
  save() {
    (this.$refs.aibokeForm as any).validate(async (valid: boolean) => {
      if (valid) {
        await this.$store.dispatch({
          type: 'aiboke/UpdateAiBoKeInfo',
          data: this.aibokeEditInfo,
        });
        (this.$refs.aibokeForm as any).resetFields()
        this.$emit('save-success')
        this.$emit('input', false)
      }
    })
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit('input', value)
    } else {
     this.getAiBoKeInfo(this.aibokeId)
    }
  }
  async getAiBoKeInfo(id){
    this.$store.dispatch({
      type: 'aiboke/GetAiBoKeInfoById',
      data: id
    }).then((response)=>{
        if(response.hasOwnProperty("createDate") && response.createDate !=null && response.createDate !='null' && response.createDate !=undefined && response.createDate !=''){
            response.createDate=response.createDate.substring(0,7);
        }
        this.aibokeEditInfo = response;
    })
  }
  cancel() {
    ;(this.$refs.aibokeForm as any).resetFields()
    this.$emit('input', false)
  }
//   aibokeRule = {
//     companyName: [
//       {
//         required: true,
//         message: this.L('Manufacturer_EnterpriseNameRequiredField', undefined, this.L('Manufacturer_EnterpriseName')),
//         trigger: 'blur',
//       },
//     ],
//     jp: [
//       {
//         required: true,
//         message: this.L('Manufacturer_EnterpriseNumberRequiredField', undefined, this.L('Manufacturer_EnterpriseNumber')),
//         trigger: 'blur',
//       },
//     ],
//     leader: [
//       {
//         required: true,
//         message: this.L('Manufacturer_PersonInChargeRequiredField', undefined, this.L('Manufacturer_PersonInCharge')),
//         trigger: 'change',
//       },
//     ],
//     telephone: [
//       {
//         required: true,
//         message: this.L('Manufacturer_ContactPhoneRequiredField', undefined, this.L('Manufacturer_ContactPhone')),
//         trigger: 'change',
//       },
//     ],
//   }
}
</script>
<style lang="less">
.ivu-modal-wrap {
  .ivu-modal{
            top: 100;
            width: auto !important;
            
            .ivu-modal-content {
              width: 70% !important;
        margin-left: 15% !important;
    }
        }

}


</style>