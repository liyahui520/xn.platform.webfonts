<template>
      <div>
    <Modal
      :title="L('AddManufacturer')"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
      draggable
      :width="70"
      :createDrugsData="createDrugsData"
      :mask-closable="false"
    >
      <Form
        ref="drugsForm"
        :rules="drugsRule"
        :model="createData"
        :label-width="110"
      >
        <Divider orientation="left" size="small">生产商信息</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_EnterpriseName')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_EnterpriseNumber')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_Contacts')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactPhone')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactsOne')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactsPhoneOne')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_FaxNumber')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_ContactAddress')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_PostalCode')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_EnterpriseLegalPerson')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_BusinessLicenseNo')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('Manufacturer_BusinessScope')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
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
import Drugs from '@/store/entities/generalControlModule/pmedicines'
import Pmedicines from '@/store/entities/generalControlModule/pmedicines'
@Component
export default class CreateDrugs extends AbpBase {
  @Prop({ type: Boolean, default: false }) value: boolean
  createData: Drugs = new Drugs()
  canOrder = true
  canSell = true
  deleted = false
  save() {
    ;(this.$refs.drugsForm as any).validate(async (valid: boolean) => {
      if (valid) {
        this.createData.drugType = 1046
        await this.$store.dispatch({
          type: 'drugs/create',
          data: this.createData,
        })
        ;(this.$refs.drugsForm as any).resetFields()
        this.$emit('save-success')
        this.$emit('input', false)
      }
    })
  }
  cancel() {
    ;(this.$refs.drugsForm as any).resetFields()
    this.$emit('input', false)
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit('input', value)
    } else {
      this.createData = Util.extend(true, {}, this.$store.state.drugs.editDrugs)
    }
  }
  canOrderChange(item) {
    this.canOrder = item
    if (item) this.createData.canOrder == 1
    else this.createData.canOrder = 0
    if (item || this.createData.canSell == 1) {
      this.createData.deleted = 0
      this.deleted = false
    }
    if (!item && this.createData.canSell == 0) {
      this.deleted = true
      this.createData.deleted = 1
    }
  }

  canSellChange(item) {
    this.canSell = item
    if (item) this.createData.canSell = 1
    else this.createData.canSell = 0
    if (item || this.createData.canOrder == 1) {
      this.createData.deleted = 0
      this.deleted = false
    }
    if (!item && this.createData.canOrder == 0) {
      this.createData.deleted = 1
      this.deleted = true
    }
  }

  deletedChange(item) {
    this.deleted = item
    if (item) {
      this.createData.canOrder = 0
      this.createData.canSell = 0
      this.createData.deleted = 1
      this.canOrder = false
      this.canSell = false
    } else {
      this.createData.canOrder = 1
      this.createData.deleted = 0
      this.createData.canSell = 1
      this.canOrder = true
      this.canSell = true
    }
  }

  /**
   * 获取生产商
   */
  async getManufacturerListById() {
    await this.$store.dispatch({
      type: 'zkBase/GetManufacturerListById',
      data: { orgId: 7990 },
    })
  }

  /**
   * 获取供应商
   */
  async GetPProviderById() {
    await this.$store.dispatch({
      type: 'zkBase/GetPProviderById',
      data: { orgId: 7990 },
    })
  }

  /**
   * 获取使用方式
   */
  async GetSysCategoryByParentId() {
    await this.$store.dispatch({
      type: 'zkBase/GetSysCategoryByParentId',
      data: { orgId: 7990 },
    })
  }

  instoreUnitChange(item, value) {
    if (item != undefined) this.createData.outStoreUnitName = item.label
    console.log('出入口单位：', item)
  }

  unitChange(item, value) {
    if (item != undefined) this.createData.unitName = item.label
    console.log('投药单位', item)
  }

  get dosingWays() {
    return this.$store.state.drugs.dosingWay
  }

  get createDrugsData() {
    this.createData = this.$store.state.drugs.createDrugsData
    return this.$store.state.drugs.createDrugsData
  }

  get units() {
    return this.$store.state.drugs.units
  }

  get pproviderDatas() {
    return this.$store.state.zkBase.pproviderData
  }

  get manufacturerDatas() {
    return this.$store.state.zkBase.manufacturerData
  }

  get sysCategoryDatas() {
    return this.$store.state.zkBase.sysCategoryData
  }

  async created() {
    await this.$store.dispatch({
      type: 'drugs/GetDosingWay',
      data: { orgId: 7990, parentId: 1040 },
    })

    await this.$store.dispatch({
      type: 'drugs/GetUnit',
      data: { orgId: 7990, parentId: 4355 },
    })

    await this.getManufacturerListById()

    await this.GetPProviderById()

    await this.GetSysCategoryByParentId()
  }

  drugsRule = {
    drugsName: [
      {
        required: true,
        message: this.L('FieldIsRequired', undefined, this.L('drugsName')),
        trigger: 'blur',
      },
    ],
    barCode: [
      {
        required: true,
        message: this.L('FieldIsRequired', undefined, this.L('barCode')),
        trigger: 'blur',
      },
    ],
    brandId: [
      {
        required: true,
        type: 'number',
        message: this.L('FieldIsRequired', undefined, this.L('brand')),
        trigger: 'change',
      },
    ],
    providerId: [
      {
        required: true,
        pattern: /.+/,
        type: 'number',
        message: this.L('FieldIsRequired', undefined, this.L('provider')),
        trigger: 'change',
      },
    ],
    ingredient: [
      {
        required: true,
        message: this.L('FieldIsRequired', undefined, this.L('ingredient')),
        trigger: 'blur',
      },
    ],
  }
}
</script>
