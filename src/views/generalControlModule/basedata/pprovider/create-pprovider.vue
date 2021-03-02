<template>
      <div>
    <Modal
      :title="L('AddPProvider')"
      :value="value"
      @on-ok="save"
    >
      <Form
        ref="pproviderForm"
        :rules="pproviderRule"
        :model="createData"
        :label-width="110"
      >
        <Divider orientation="left" size="small">生产商信息</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_EnterpriseName')" prop="companyName">
              <Input
                v-model="createData.companyName"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_EnterpriseNumber')" prop="licenseNo">
              <Input
                v-model="createData.licenseNo"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_PersonInCharge')" prop="leader">
              <Input
                v-model="createData.leader"
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
                v-model="createData.contacter"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_ContactPhone')" prop="telephone">
              <Input
                v-model="createData.telephone"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
                    <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_FaxNumber')" prop="faxNumber">
              <Input
                v-model="createData.faxNumber"
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
                v-model="createData.contacter1"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
                      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_ContactsPhoneOne')" prop="telephone1">
              <Input
                v-model="createData.telephone1"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>

          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_ContactAddress')" prop="address">
              <Input
                v-model="createData.address"
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
                v-model="createData.postalCode"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_EnterpriseLegalPerson')" prop="enterpriser">
              <Input
                v-model="createData.enterpriser"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('PProvider_BusinessLicenseNo')" prop="legalerNo">
              <Input
                v-model="createData.legalerNo"
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
                v-model="createData.scopeBusiness"
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
export default class AddPProvider extends AbpBase {
  @Prop({ type: Boolean, default: false }) value: boolean
  createData: PProvider = new PProvider()
  canOrder = true
  canSell = true
  deleted = false
  save() {
    (this.$refs.pproviderForm as any).validate(async (valid: boolean) => {
      if (valid) {
        await this.$store.dispatch({
          type: 'pprovider/AddPProviderInfo',
          data: this.createData,
        })
        ;(this.$refs.pproviderForm as any).resetFields()
        this.$emit('save-success')
        this.$emit('input', false)
      }
    })
  }
  cancel() {
    ;(this.$refs.pproviderForm as any).resetFields()
    this.$emit('input', false)
  }

  async created() {

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
        trigger: 'blur',
      },
    ],
    telephone: [
      {
        required: true,
        message: this.L('PProvider_ContactPhoneRequiredField', undefined, this.L('PProvider_ContactPhone')),
        trigger: 'blur',
      },
    ],
  }
}
</script>

<style lang="less" scope>
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
