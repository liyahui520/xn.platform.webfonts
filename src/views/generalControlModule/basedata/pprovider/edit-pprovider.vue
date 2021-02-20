<template>
      <div>
    <Modal
      :title="L('UpdatePProvider')"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
      :width="70"
      :mask-closable="false"
      :pproviderId="pproviderId"
    >
      <Form
        ref="pproviderForm"
        :rules="pproviderRule"
        :model="pproviderEditInfo"
        :label-width="110"
      >
        <Divider orientation="left" size="small">生产商信息</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_EnterpriseName')" prop="companyName">
              <Input
                v-model="pproviderEditInfo.companyName"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_EnterpriseNumber')" prop="licenseNo">
              <Input
                v-model="pproviderEditInfo.licenseNo"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_PersonInCharge')" prop="leader">
              <Input
                v-model="pproviderEditInfo.leader"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_Contacts')" prop="contacter">
              <Input
                v-model="pproviderEditInfo.contacter"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_ContactPhone')" prop="telephone">
              <Input
                v-model="pproviderEditInfo.telephone"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
                    <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_FaxNumber')" prop="faxNumber">
              <Input
                v-model="pproviderEditInfo.faxNumber"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          

        </Row>
        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_ContactsOne')" prop="contacter1">
              <Input
                v-model="pproviderEditInfo.contacter1"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
                      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_ContactsPhoneOne')" prop="telephone1">
              <Input
                v-model="pproviderEditInfo.telephone1"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>

          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_ContactAddress')" prop="address">
              <Input
                v-model="pproviderEditInfo.address"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>

        </Row>
        <Row>
                      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_PostalCode')" prop="postalCode">
              <Input
                v-model="pproviderEditInfo.postalCode"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_EnterpriseLegalPerson')" prop="enterpriser">
              <Input
                v-model="pproviderEditInfo.enterpriser"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_BusinessLicenseNo')" prop="legalerNo">
              <Input
                v-model="pproviderEditInfo.legalerNo"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row> 
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_BusinessScope')" prop="scopeBusiness">
              <Input
                v-model="pproviderEditInfo.scopeBusiness"
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
import PProvider from '@/store/entities/generalControlModule/pprovider'

@Component
export default class UpdatePProvider extends AbpBase {
//   @Prop({ type: Boolean, default: false }) value: boolean
  @Prop({ type: Boolean, default: false }) value: boolean
  @Prop({ type: Number, default: 0 }) pproviderId: Number
  pproviderEditInfo: PProvider=new PProvider()
  save() {
    (this.$refs.pproviderForm as any).validate(async (valid: boolean) => {
      if (valid) {
        await this.$store.dispatch({
          type: 'pprovider/UpdatePProviderInfo',
          data: this.pproviderEditInfo,
        })
        ;(this.$refs.pproviderForm as any).resetFields()
        this.$emit('save-success')
        this.$emit('input', false)
      }
    })
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit('input', value)
    } else {
     this.getPProviderInfo(this.pproviderId)
    }
  }
    async getPProviderInfo(id){
    this.$store.dispatch({
      type: 'pprovider/GetPProviderInfoById',
      data: id
    }).then((response)=>{
        this.pproviderEditInfo = response;
    })
  }
  cancel() {
    ;(this.$refs.pproviderForm as any).resetFields()
    this.$emit('input', false)
  }
  pproviderRule = {
    companyName: [
      {
        required: true,
        message: this.L('PProvider_EnterpriseNameRequiredField', undefined, this.L('PProvider_EnterpriseName')),
        trigger: 'blur',
      },
    ],
    licenseNo: [
      {
        required: true,
        message: this.L('PProvider_EnterpriseNumberRequiredField', undefined, this.L('PProvider_EnterpriseNumber')),
        trigger: 'blur',
      },
    ],
    leader: [
      {
        required: true,
        message: this.L('PProvider_PersonInChargeRequiredField', undefined, this.L('PProvider_PersonInCharge')),
        trigger: 'change',
      },
    ],
    telephone: [
      {
        required: true,
        message: this.L('PProvider_ContactPhoneRequiredField', undefined, this.L('PProvider_ContactPhone')),
        trigger: 'change',
      },
    ],
  }
}
</script>
