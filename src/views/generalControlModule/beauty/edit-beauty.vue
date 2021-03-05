<template>
  <div>
    <Modal
      :title="L('CreateNewDrugs')"
      :value="value"
      @on-ok="save"
      @on-visible-change="visibleChange"
      draggable
      :width="70"
      :mask-closable="false"
    >
      <Form
        ref="editdrugsForm"
        :rules="drugsRule"
        :model="drugs"
        :label-width="110"
      >
        <Divider orientation="left" size="small">药品信息</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('categoryName')" prop="category">
              <Input
                v-model="drugs.categoryName"
                :maxlength="32"
                show-word-limit
                disabled
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('drugsName')" prop="drugsName">
              <Input
                v-model="drugs.drugsName"
                :maxlength="32"
                search
                enter-button="查重"
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('barCode')" prop="barCode">
              <Input v-model="drugs.barCode" :maxlength="20"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('commonName')" prop="commonName">
              <Input
                v-model="drugs.commonName"
                :maxlength="32"
                show-word-limit
              ></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('drugsNameLetter')" prop="drugsNameLetter">
              <Input v-model="drugs.drugsNameLetter" :maxlength="32"></Input>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <FormItem :label="L('englishName')" prop="englishName">
              <Input v-model="drugs.englishName" :maxlength="20"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row> </Row>
        <Row> </Row>
        <Divider orientation="left" size="small">药品属性</Divider>
        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 1 }">
            <FormItem :label="L('outstorePrice')" prop="outstorePrice">
              <Input
                v-model="drugs.outstorePrice"
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
                v-model="drugs.memberPrice"
                prefix="logo-usd"
                :placeholder="L('memberPrice')"
                type="number"
                value="0"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 11, offset: 2 }" :lg="{ span: 2, offset: 2 }">
            <FormItem :label="L('doNotDiscount')" prop="doNotDiscount">
              <template>
                <i-switch v-model="!drugs.doNotDiscount">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </template>
            </FormItem>
          </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 3, offset: 2 }">
            <FormItem :label="L('canOrder')" prop="canOrder">
              <template>
                <i-switch
                  v-model="drugs.canOrder == 1"
                  @on-change="canOrderChange"
                >
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </template>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 3, offset: 1 }">
            <FormItem :label="L('canSell')" prop="canSell">
              <template>
                <i-switch
                  v-model="drugs.canSell == 1"
                  @on-change="canSellChange"
                >
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
              </template>
            </FormItem>
          </Col>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 3, offset: 1 }">
            <FormItem :label="L('Deleted')" prop="Deleted">
              <template>
                <i-switch
                  v-model="drugs.deleted == 1"
                  @on-change="deletedChange"
                >
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
                v-model="drugs.notice"
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
        <Button @click="cancel">{{ L("Cancel") }}</Button>
        <Button @click="save" type="primary">{{ L("OK") }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "../../../lib/util";
import AbpBase from "../../../lib/abpbase";
import Drugs from "@/store/entities/generalControlModule/pmedicines";
@Component
export default class EditDrugs extends AbpBase {
  @Prop({ type: Boolean, default: false }) value: boolean;
  drugs: Drugs = new Drugs();
  cityList = [
    {
      value: "New York",
      label: "New York",
    },
    {
      value: "London",
      label: "London",
    },
    {
      value: "Sydney",
      label: "Sydney",
    },
    {
      value: "Ottawa",
      label: "Ottawa",
    },
    {
      value: "Paris",
      label: "Paris",
    },
    {
      value: "Canberra",
      label: "Canberra",
    },
  ];
  save() {
    (this.$refs.editdrugsForm as any).validate(async (valid: boolean) => {
      if (valid) {
        await this.$store.dispatch({
          type: "drugs/update",
          data: this.drugs,
        });
        (this.$refs.editdrugsForm as any).resetFields();
        this.$emit("save-success");
        this.$emit("input", false);
      }
    });
  }
  cancel() {
    (this.$refs.editdrugsForm as any).resetFields();
    this.$emit("input", false);
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit("input", value);
    } else {
      this.drugs = Util.extend(true, {}, this.$store.state.drugs.editDrugs);
    }
  }

  get dosingWays() {
    return this.$store.state.drugs.dosingWay;
  }

  get units() {
    return this.$store.state.drugs.units;
  }

  get pproviderDatas() {
    return this.$store.state.zkBase.pproviderData;
  }

  get manufacturerDatas() {
    return this.$store.state.zkBase.manufacturerData;
  }

  get sysCategoryDatas() {
    return this.$store.state.zkBase.sysCategoryData;
  }

  canOrderChange(item) {
    if (item) this.drugs.canOrder == 1;
    else this.drugs.canOrder = 0;
    if (item || this.drugs.canSell == 1) {
      this.drugs.deleted = 0;
    }
    if (!item && this.drugs.canSell == 0) {
      this.drugs.deleted = 1;
    }
  }

  canSellChange(item) {
    if (item) this.drugs.canSell == 1;
    else this.drugs.canSell = 0;
    if (item || this.drugs.canOrder == 1) {
      this.drugs.deleted = 0;
    }
    if (!item && this.drugs.canOrder == 0) {
      this.drugs.deleted = 1;
    }
  }

  deletedChange(item) {
    if (item) {
      this.drugs.canOrder = 0;
      this.drugs.canSell = 0;
    } else {
      this.drugs.canOrder = 1;
      this.drugs.canSell = 1;
    }
  }

  instoreUnitChange(item, value) {
    if (item != undefined) this.drugs.outStoreUnitName = item.label;
    console.log("出入口单位：", item);
  }

  unitChange(item, value) {
    if (item != undefined) this.drugs.unitName = item.label;
    console.log("投药单位", item);
  }

  /**
   * 获取生产商
   */
  async getManufacturerListById() {
    await this.$store.dispatch({
      type: "zkBase/GetManufacturerListById",
      data: { orgId: 7990 },
    });
  }

  /**
   * 获取供应商
   */
  async GetPProviderById() {
    await this.$store.dispatch({
      type: "zkBase/GetPProviderById",
      data: { orgId: 7990 },
    });
  }

  /**
   * 获取使用方式
   */
  async GetSysCategoryByParentId() {
    await this.$store.dispatch({
      type: "zkBase/GetSysCategoryByParentId",
      data: { orgId: 7990 },
    });
  }

  async created() {
    await this.$store.dispatch({
      type: "drugs/GetDosingWay",
      data: { orgId: 7990, parentId: 1040 },
    });

    await this.$store.dispatch({
      type: "drugs/GetUnit",
      data: { orgId: 7990, parentId: 4355 },
    });

    await this.getManufacturerListById();

    await this.GetPProviderById();

    await this.GetSysCategoryByParentId();
  }
  drugsRule = {
    drugsName: [
      {
        required: true,
        message: this.L("FieldIsRequired", undefined, this.L("drugsName")),
        trigger: "blur",
      },
    ],
    barCode: [
      {
        required: true,
        message: this.L("FieldIsRequired", undefined, this.L("barCode")),
        trigger: "blur",
      },
    ],
  };
}
</script>
