<template>
      <div>
    <Modal
      :title="L('UpdateManufacturer')"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
      :width="70"
      :mask-closable="false"
      :manufacturerId="manufacturerId"
    >
      <Form
        ref="manufacturerForm"
        :rules="manufacturerRule"
        :model="manufacturerEditInfo"
        :label-width="110"
      >
        <Divider orientation="left" size="small">生产商信息</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_EnterpriseName')" prop="companyName">
              <Input
                v-model="manufacturerEditInfo.companyName"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_EnterpriseNumber')" prop="licenseNo">
              <Input
                v-model="manufacturerEditInfo.licenseNo"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_PersonInCharge')" prop="leader">
              <Input
                v-model="manufacturerEditInfo.leader"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_Contacts')" prop="contacter">
              <Input
                v-model="manufacturerEditInfo.contacter"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactPhone')" prop="telephone">
              <Input
                v-model="manufacturerEditInfo.telephone"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
                    <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_FaxNumber')" prop="faxNumber">
              <Input
                v-model="manufacturerEditInfo.faxNumber"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          

        </Row>
        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactsOne')" prop="contacter1">
              <Input
                v-model="manufacturerEditInfo.contacter1"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
                      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactsPhoneOne')" prop="telephone1">
              <Input
                v-model="manufacturerEditInfo.telephone1"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>

          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactAddress')" prop="address">
              <Input
                v-model="manufacturerEditInfo.address"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>

        </Row>
        <Row>
                      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_PostalCode')" prop="postalCode">
              <Input
                v-model="manufacturerEditInfo.postalCode"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_EnterpriseLegalPerson')" prop="enterpriser">
              <Input
                v-model="manufacturerEditInfo.enterpriser"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_BusinessLicenseNo')" prop="legalerNo">
              <Input
                v-model="manufacturerEditInfo.legalerNo"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row> 
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_BusinessScope')" prop="scopeBusiness">
              <Input
                v-model="manufacturerEditInfo.scopeBusiness"
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
import Manufacturer from '@/store/entities/generalControlModule/manufacturer'

@Component
export default class UpdateManufacturer extends AbpBase {
//   @Prop({ type: Boolean, default: false }) value: boolean
  @Prop({ type: Boolean, default: false }) value: boolean
  @Prop({ type: Number, default: 0 }) manufacturerId: Number
  manufacturerEditInfo: Manufacturer=new Manufacturer()
  save() {
    (this.$refs.manufacturerForm as any).validate(async (valid: boolean) => {
      if (valid) {
        await this.$store.dispatch({
          type: 'manufacturer/UpdateManufacturerInfo',
          data: this.manufacturerEditInfo,
        })
        ;(this.$refs.manufacturerForm as any).resetFields()
        this.$emit('save-success')
        this.$emit('input', false)
      }
    })
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit('input', value)
    } else {
     this.getManufacturerInfo(this.manufacturerId)
    }
  }
    async getManufacturerInfo(id){
    this.$store.dispatch({
      type: 'manufacturer/GetManufacturerInfoById',
      data: id
    }).then((response)=>{
        this.manufacturerEditInfo = response;
    })
  }
  cancel() {
    ;(this.$refs.manufacturerForm as any).resetFields()
    this.$emit('input', false)
  }
  manufacturerRule = {
    companyName: [
      {
        required: true,
        message: this.L('Manufacturer_EnterpriseNameRequiredField', undefined, this.L('Manufacturer_EnterpriseName')),
        trigger: 'blur',
      },
    ],
    licenseNo: [
      {
        required: true,
        message: this.L('Manufacturer_EnterpriseNumberRequiredField', undefined, this.L('Manufacturer_EnterpriseNumber')),
        trigger: 'blur',
      },
    ],
    leader: [
      {
        required: true,
        message: this.L('Manufacturer_PersonInChargeRequiredField', undefined, this.L('Manufacturer_PersonInCharge')),
        trigger: 'change',
      },
    ],
    telephone: [
      {
        required: true,
        message: this.L('Manufacturer_ContactPhoneRequiredField', undefined, this.L('Manufacturer_ContactPhone')),
        trigger: 'change',
      },
    ],
  }
}
</script>
