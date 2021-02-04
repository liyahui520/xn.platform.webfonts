<template>
  <div>
    <Modal
      :title="L('CreateNewDrugs')"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
      draggable
      width="70"
      :createDrugsData="createDrugsData"
      :mask-closable="false"
    >
      <Form
        ref="drugsForm"
        :rules="drugsRule"
        :model="createData"
        :label-width="110"
      >
        <Divider orientation="left" size="small">药品信息</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('categoryName')" prop="categoryName">
              <Input
                v-model="createData.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('drugsName')" prop="drugsName">
              <Input
                v-model="createData.drugsName"
                :maxlength="32"
                search
                enter-button="查重"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('barCode')" prop="barCode">
              <Input v-model="createData.barCode" :maxlength="20"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('ingredient')" prop="ingredient">
              <Input
                v-model="createData.ingredient"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('drugsNameLetter')" prop="drugsNameLetter">
              <Input
                v-model="createData.drugsNameLetter"
                :maxlength="32"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('englishName')" prop="englishName">
              <Input v-model="createData.englishName" :maxlength="20"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('commonName')" prop="commonName">
              <Input
                v-model="createData.commonName"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('brand')" prop="brandId">
              <Select
                v-model="createData.brandId"
                filterable
                @on-change="brandChange"
                :label-in-value="true"
              >
                <Option
                  v-for="(item, index) in manufacturerDatas"
                  :value="item.id"
                  :key="index"
                  >{{ item.companyName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('provider')" prop="providerId">
              <Select v-model="createData.providerId" filterable>
                <Option
                  v-for="(item, index) in pproviderDatas"
                  :value="item.id"
                  :key="index"
                  >{{ item.companyName }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('dosingWay')" prop="dosingWay">
              <Select v-model="createData.dosingWay" filterable>
                <Option
                  v-for="(item, index) in dosingWays"
                  :value="item.id"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('usingMethod')" prop="usingMethod">
              <Select v-model="createData.usingMethod" filterable>
                <Option
                  v-for="item in sysCategoryDatas"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('showAll')" prop="showAll">
              <template>
                <i-switch v-model="createData.showAll">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </template>
            </FormItem>
          </Col>
        </Row>
        <Divider orientation="left" size="small">药品属性</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('outstorePrice')" prop="outstorePrice">
              <Input
                v-model="createData.outstorePrice"
                prefix="logo-usd"
                :placeholder="L('outstorePrice')"
                type="number"
                value="0"
              />
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('memberPrice')" prop="memberPrice">
              <Input
                v-model="createData.memberPrice"
                prefix="logo-usd"
                :placeholder="L('memberPrice')"
                type="number"
                value="0"
              />
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('instorePrice')" prop="instorePrice">
              <Input
                v-model="createData.instorePrice"
                disabled
                type="number"
                value="0"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('costPrice')" prop="costPrice">
              <Input
                v-model="createData.costPrice"
                prefix="logo-usd"
                :placeholder="L('costPrice')"
                type="number"
                value="0"
              />
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 2 }" :lg="{ span: 2, offset: 2 }">
            <FormItem :label="L('doNotDiscount')" prop="doNotDiscount">
              <template>
                <i-switch v-model="createData.doNotDiscount">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </template>
            </FormItem>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 2, offset: 2 }">
            <FormItem
              :label="L('allowSaleForNoneStock')"
              prop="allowSaleForNoneStock"
            >
              <template>
                <i-switch v-model="createData.allowSaleForNoneStock">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </template>
            </FormItem>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('count')" prop="count">
              <Input v-model="createData.count" disabled type="number"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('OutinstoreUnit')" prop="instoreUnit">
              <Select v-model="createData.instoreUnit" filterable>
                <Option
                  v-for="(item, index) in units"
                  :value="item.id"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('unit')" prop="unit">
              <Select v-model="createData.unit" filterable>
                <Option
                  v-for="(item, index) in units"
                  :value="item.id"
                  :key="index"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem
              :label="L('specificRateUnitString')"
              prop="specificRateUnitString"
            >
              <Input v-model="createData.specificOutMath" min="0" type="number">
                <span slot="prepend">1出入口单位</span>
                <span slot="append">投药单位</span>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('specific')" prop="specific">
              <Input v-model="createData.specific"></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 3, offset: 2 }">
            <FormItem :label="L('canOrder')" prop="canOrder">
              <template>
                <i-switch v-model="canOrder" @on-change="canOrderChange">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </template>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 3, offset: 1 }">
            <FormItem :label="L('canSell')" prop="canSell">
              <template>
                <i-switch v-model="canSell" @on-change="canSellChange">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </template>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 3, offset: 1 }">
            <FormItem :label="L('Deleted')" prop="Deleted">
              <template>
                <i-switch v-model="deleted" @on-change="deletedChange">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </template>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 22, offset: 1 }">
            <FormItem :label="L('ReturnRemark')" prop="ReturnRemark">
              <Input
                v-model="createData.remark"
                type="textarea"
                :rows="4"
                :maxlength="100"
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
import Util from '../../../lib/util'
import AbpBase from '../../../lib/abpbase'
import Drugs from '@/store/entities/generalControlModule/pmedicines'
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

  brandChange(item) {
    this.createData.brand = item.label
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
    console.log(this.createData)
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
    dosingWay: [
      {
        required: true,
        type: 'number',
        message: this.L('FieldIsRequired', undefined, this.L('dosingWay')),
        trigger: 'change',
      },
    ],
    usingMethod: [
      {
        required: true,
        type: 'number',
        message: this.L('FieldIsRequired', undefined, this.L('usingMethod')),
        trigger: 'change',
      },
    ],
    instoreUnit: [
      {
        required: true,
        type: 'number',
        message: this.L('FieldIsRequired', undefined, this.L('OutinstoreUnit')),
        trigger: 'change',
      },
    ],
    unit: [
      {
        required: true,
        type: 'number',
        message: this.L('FieldIsRequired', undefined, this.L('unit')),
        trigger: 'change',
      },
    ],
  }
}
</script>
