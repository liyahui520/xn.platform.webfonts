<template>
      <div>
    <Modal
      :title="L('AddManufacturer')"
      :value="value"
      @on-ok="save"
    >
      <Form
        ref="manufacturerForm"
        :rules="manufacturerRule"
        :model="createData"
        :label-width="110"
      >
        <Divider orientation="left" size="small">生产商信息</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_EnterpriseName')" prop="companyName">
              <Input
                v-model="createData.companyName"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_EnterpriseNumber')" prop="licenseNo">
              <Input
                v-model="createData.licenseNo"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_PersonInCharge')" prop="leader">
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
            <FormItem :label="L('Manufacturer_Contacts')" prop="contacter">
              <Input
                v-model="createData.contacter"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactPhone')" prop="telephone">
              <Input
                v-model="createData.telephone"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
                    <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_FaxNumber')" prop="faxNumber">
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
            <FormItem :label="L('Manufacturer_ContactsOne')" prop="contacter1">
              <Input
                v-model="createData.contacter1"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
                      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactsPhoneOne')" prop="telephone1">
              <Input
                v-model="createData.telephone1"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>

          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactAddress')" prop="address">
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
            <FormItem :label="L('Manufacturer_PostalCode')" prop="postalCode">
              <Input
                v-model="createData.postalCode"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_EnterpriseLegalPerson')" prop="enterpriser">
              <Input
                v-model="createData.enterpriser"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_BusinessLicenseNo')" prop="legalerNo">
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
            <FormItem :label="L('Manufacturer_BusinessScope')" prop="scopeBusiness">
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
import Manufacturer from '@/store/entities/generalControlModule/manufacturer'

@Component
export default class AddManufacturer extends AbpBase {
  @Prop({ type: Boolean, default: false }) value: boolean
  createData: Manufacturer = new Manufacturer()
  canOrder = true
  canSell = true
  deleted = false
  save() {
    (this.$refs.manufacturerForm as any).validate(async (valid: boolean) => {
      if (valid) {
        await this.$store.dispatch({
          type: 'manufacturer/AddManufacturerInfo',
          data: this.createData,
        });
        (this.$refs.manufacturerForm as any).resetFields()
        this.$emit('save-success')
        this.$emit('input', false)
      }
    })
  }
  cancel() {
    (this.$refs.manufacturerForm as any).resetFields()
    this.$emit('input', false)
  }

  async created() {

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
