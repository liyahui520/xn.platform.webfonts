<template>
  <div>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="130"
      >
        <!-- <FormItem>
          <Row>
            <Col span="24">
              <FormItem label="机构号">
                <Input
                  v-model="formValidate.ins_cd"
                  disabled
                  style="width: 30%"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem> -->
        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="商户全称" prop="mchnt_name">
                <Input
                  v-model="formValidate.mchnt_name"
                  title="需与营业执照一致，如遇提示重复，请在后面加数字1、2...，若为小微商户，请命名为 个体户 xxx。"
                  placeholder="需与营业执照一致，如遇提示重复，请在后面加数字1、2...，若为小微商户，请命名为 个体户 xxx。"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="商户简称" prop="mchnt_shortname">
                <Input
                  v-model="formValidate.mchnt_shortname"
                  title="建议和商户门头名称保持一致"
                  placeholder="建议和商户门头名称保持一致"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="商户真实名称" prop="real_name">
                <Input
                  v-model="formValidate.real_name"
                  title="需与营业执照上相同"
                  placeholder="需与营业执照上相同"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件类型">
                <Select
                  v-model="formValidate.license_type"
                  disabled
                  style="width: 60%"
                >
                  <Option
                    v-for="item in identityType"
                    :value="item.ID"
                    :key="item.Name"
                    >{{ item.Name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="门脸照片" prop="door_face">
                <div
                  class="demo-upload-list"
                  v-for="item in doorFaceUploadList"
                  :key="item.url"
                >
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                      <Icon
                        type="ios-eye-outline"
                        @click.native="handleDoorFaceView(item.name)"
                      ></Icon>
                      <Icon
                        type="ios-trash-outline"
                        @click.native="handleDoorFaceRemove(item)"
                      ></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress
                      v-if="item.showProgress"
                      :percent="item.percentage"
                      hide-info
                    ></Progress>
                  </template>
                </div>
                <Upload
                  ref="uploadDoorFace"
                  accept="['image/jpg']"
                  :show-upload-list="false"
                  :on-success="handleDoorFaceSuccess"
                  :format="['jpg']"
                  :max-size="1024"
                  :on-format-error="handleDoorFaceFormatError"
                  :on-exceeded-size="handleDoorFaceMaxSize"
                  :before-upload="handleDoorFaceBeforeUpload"
                  type="drag"
                  action="http://localhost:21021/api/services/app/FuYouService/PostUpload?fileTypeValue=6"
                  style="display: inline-block; width: 58px"
                >
                  <div style="width: 58px; height: 58px; line-height: 58px">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="门脸照片" v-model="doorFaceVisible">
                  <img
                    :src="doorFacePath"
                    v-if="doorFaceVisible"
                    style="width: 100%"
                  />
                </Modal>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="门头照片" prop="door_head">
                <div
                  class="demo-upload-list"
                  v-for="item in doorHeadUploadList"
                  :key="item.url"
                >
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                      <Icon
                        type="ios-eye-outline"
                        @click.native="handleDoorHeadView(item.name)"
                      ></Icon>
                      <Icon
                        type="ios-trash-outline"
                        @click.native="handleDoorHeadRemove(item)"
                      ></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress
                      v-if="item.showProgress"
                      :percent="item.percentage"
                      hide-info
                    ></Progress>
                  </template>
                </div>
                <Upload
                  ref="uploadDoorHead"
                  accept="['image/jpg']"
                  :show-upload-list="false"
                  :on-success="handleDoorHeadSuccess"
                  :format="['jpg']"
                  :max-size="1024"
                  :on-format-error="handleDoorHeadFormatError"
                  :on-exceeded-size="handleDoorHeadMaxSize"
                  :before-upload="handleDoorHeadBeforeUpload"
                  type="drag"
                  action="http://localhost:21021/api/services/app/FuYouService/PostUpload?fileTypeValue=7"
                  style="display: inline-block; width: 58px"
                >
                  <div style="width: 58px; height: 58px; line-height: 58px">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="门头照片" v-model="doorHeadVisible">
                  <img
                    :src="doorHeadPath"
                    v-if="doorHeadVisible"
                    style="width: 100%"
                  />
                </Modal>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="证件号码" prop="license_no">
                <Input
                  v-model="formValidate.license_no"
                  title="证件号码"
                  placeholder="证件号码"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="证件到期日" prop="license_expire_dt">
                <Input
                  v-model="formValidate.license_expire_dt"
                  :maxlength="8"
                  title="证件到期日（格式例：2020年01月01日 输入20200101）长期请填20991231，无有效期请填19000101"
                  placeholder="证件到期日（格式例：2020年01月01日 输入20200101）长期请填20991231，无有效期请填19000101"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="法人身份证号" prop="certif_id">
                <Input
                  v-model="formValidate.certif_id"
                  title="法人身份证号"
                  placeholder="法人身份证号"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="法人身份证到期日" prop="certif_id_expire_dt">
                <Input
                  v-model="formValidate.certif_id_expire_dt"
                  :maxlength="8"
                  title="法人身份证到期日（格式例：2020年01月01日 输入20200101）"
                  placeholder="法人身份证到期日（格式例：2020年01月01日 输入20200101）"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="法人身份证正面照片" prop="legalperson_positive">
                <div
                  class="demo-upload-list"
                  v-for="item in legalPersonPositiveUploadList"
                  :key="item.url"
                >
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                      <Icon
                        type="ios-eye-outline"
                        @click.native="handleLegalPersonPositiveView(item.name)"
                      ></Icon>
                      <Icon
                        type="ios-trash-outline"
                        @click.native="handleLegalPersonPositiveRemove(item)"
                      ></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress
                      v-if="item.showProgress"
                      :percent="item.percentage"
                      hide-info
                    ></Progress>
                  </template>
                </div>
                <Upload
                  ref="uploadLegalPersonPositive"
                  :show-upload-list="false"
                  accept="['image/jpg']"
                  :on-success="handleLegalPersonPositiveSuccess"
                  :format="['jpg']"
                  :max-size="1024"
                  :on-format-error="handleLegalPersonPositiveFormatError"
                  :on-exceeded-size="handleLegalPersonPositiveMaxSize"
                  :before-upload="handleLegalPersonPositiveBeforeUpload"
                  type="drag"
                  action="http://localhost:21021/api/services/app/FuYouService/PostUpload?fileTypeValue=4"
                  style="display: inline-block; width: 58px"
                >
                  <div style="width: 58px; height: 58px; line-height: 58px">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal
                  title="法人身份证正面照片"
                  v-model="legalPersonPositiveVisible"
                >
                  <img
                    :src="legalPersonPositivePath"
                    v-if="legalPersonPositiveVisible"
                    style="width: 100%"
                  />
                </Modal>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="法人身份证反面照片" prop="legalperson_back">
                <div
                  class="demo-upload-list"
                  v-for="item in legalPersonBackUploadList"
                  :key="item.url"
                >
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                      <Icon
                        type="ios-eye-outline"
                        @click.native="handleLegalPersonBackView(item.name)"
                      ></Icon>
                      <Icon
                        type="ios-trash-outline"
                        @click.native="handleLegalPersonBackRemove(item)"
                      ></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress
                      v-if="item.showProgress"
                      :percent="item.percentage"
                      hide-info
                    ></Progress>
                  </template>
                </div>
                <Upload
                  ref="uploadLegalPersonBack"
                  :show-upload-list="false"
                  accept="['image/jpg']"
                  :on-success="handleLegalPersonBackSuccess"
                  :format="['jpg']"
                  :max-size="1024"
                  :on-format-error="handleLegalPersonBackFormatError"
                  :on-exceeded-size="handleLegalPersonBackMaxSize"
                  :before-upload="handleLegalPersonBackBeforeUpload"
                  type="drag"
                  action="http://localhost:21021/api/services/app/FuYouService/PostUpload?fileTypeValue=5"
                  style="display: inline-block; width: 58px"
                >
                  <div style="width: 58px; height: 58px; line-height: 58px">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal
                  title="法人身份证反面照片"
                  v-model="legalPersonBackVisible"
                >
                  <img
                    :src="legalPersonBackPath"
                    v-if="legalPersonBackVisible"
                    style="width: 100%"
                  />
                </Modal>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="联系人姓名" prop="contact_person">
                <Input
                  v-model="formValidate.contact_person"
                  title="联系人姓名"
                  placeholder="联系人姓名"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客服电话" prop="contact_phone">
                <Input
                  v-model="formValidate.contact_phone"
                  title="客服电话，必须纯数字。推荐 400开头电话或11位有效手机号"
                  placeholder="客服电话，必须纯数字。推荐 400开头电话或11位有效手机号"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="商户经营地" prop="contact_addr" >
                <Cascader
                  :data="mapList"
                  v-model="address"
                  filterable
                  clearable
                  style="width: 93%"
                  transfer
                  :render-format="format"
                  @on-change="addressChange"
                ></Cascader>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="联系电话" prop="contact_mobile">
                <Input
                  v-model="formValidate.contact_mobile"
                  title="联系电话"
                  placeholder="联系电话"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="联系邮箱" prop="contact_email">
                <Input
                  v-model="formValidate.contact_email"
                  title="联系邮箱"
                  placeholder="联系邮箱"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="入账卡类型" >
                <Select v-model="formValidate.acnt_type" style="width: 60%" disabled>
                  <Option
                    v-for="item in acntType"
                    :value="item.ID"
                    :key="item.Name"
                    >{{ item.Name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="12">
              <FormItem label="行别" prop="bank_type">
                <Select v-model="formValidate.bank_type" style="width: 60%" :label-in-value="true" @on-change="bankChange">
                  <Option
                    v-for="item in bankInfo"
                    :value="item.ID"
                    :key="item.Name"
                    >{{ item.Name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="入账卡开户行名称" prop="inter_bank_no">
                <Select v-model="formValidate.inter_bank_no" placeholder="请选择  如没有对应的支行，请选择地区内的支行，先提交" filterable clearable style="width: 60%" :label-in-value="true" @on-change="bankDictChange" not-found-text="请先选择商户经营地或行别">
                  <Option
                    v-for="item in bankDictList"
                    :value="item.primaryID"
                    :key="item.primaryID"
                    >{{ item.bankName }}</Option>
                </Select>
                
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            
            <Col span="12">
              <FormItem label="入账卡号" prop="acnt_no">
                <Input
                  v-model="formValidate.acnt_no"
                  title="入账卡号"
                  placeholder="入账卡号"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="清算类型">
                <Select v-model="formValidate.settle_tp" disabled style="width: 60%">
                  <Option
                    v-for="item in liquidationType"
                    :value="item.ID"
                    :key="item.Name"
                    >{{ item.Name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            
            <Col span="12">
              <FormItem label="法人姓名" prop="artif_nm">
                <Input
                  v-model="formValidate.artif_nm"
                  title="法人姓名"
                  placeholder="法人姓名"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="法人入账标识">
                <Select
                  v-model="formValidate.acnt_artif_flag"
                  disabled
                  style="width: 60%"
                >
                  <Option
                    v-for="item in legalPersonMoneyType"
                    :value="item.ID"
                    :key="item.Name"
                    >{{ item.Name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            
            <Col span="12">
              <FormItem label="入账证件类型">
                <Select
                  v-model="formValidate.acnt_certif_tp"
                  disabled
                  style="width: 60%"
                >
                  <Option
                    v-for="item in entryBankIdentityType"
                    :value="item.ID"
                    :key="item.Name"
                    >{{ item.Name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="入账证件号" prop="acnt_certif_id">
                <Input
                  v-model="formValidate.acnt_certif_id"
                  title="入账证件号"
                  placeholder="入账证件号"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            
            <Col span="12">
              <FormItem label="入账证件到期日" prop="acnt_certif_expire_dt">
                <Input
                  v-model="formValidate.acnt_certif_expire_dt"
                  :maxlength="8"
                  title="入账证件到期日（格式例：2020年01月01日 输入20200101）"
                  placeholder="入账证件到期日（格式例：2020年01月01日 输入20200101）"
                  style="width: 60%"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="入账银行卡正面照片" prop="entry_bank_positive">
                <div
                  class="demo-upload-list"
                  v-for="item in entryBankPositiveUploadList"
                  :key="item.url"
                >
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                      <Icon
                        type="ios-eye-outline"
                        @click.native="handleEntryBankPositiveView(item.name)"
                      ></Icon>
                      <Icon
                        type="ios-trash-outline"
                        @click.native="handleEntryBankPositiveRemove(item)"
                      ></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress
                      v-if="item.showProgress"
                      :percent="item.percentage"
                      hide-info
                    ></Progress>
                  </template>
                </div>
                <Upload
                  ref="uploadEntryBankPositive"
                  :show-upload-list="false"
                  accept="['image/jpg']"
                  :on-success="handleEntryBankPositiveSuccess"
                  :format="['jpg']"
                  :max-size="1024"
                  :on-format-error="handleEntryBankPositiveFormatError"
                  :on-exceeded-size="handleEntryBankPositiveMaxSize"
                  :before-upload="handleEntryBankPositiveBeforeUpload"
                  type="drag"
                  action="http://localhost:21021/api/services/app/FuYouService/PostUpload?fileTypeValue=12"
                  style="display: inline-block; width: 58px"
                >
                  <div style="width: 58px; height: 58px; line-height: 58px">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal
                  title="入账银行卡正面照片"
                  v-model="entryBankPositiveVisible"
                >
                  <img
                    :src="entryBankPositivePath"
                    v-if="entryBankPositiveVisible"
                    style="width: 100%"
                  />
                </Modal>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row>
            
            <Col span="12">
              <FormItem label="手持证件照片" prop="hand_id">
                <div
                  class="demo-upload-list"
                  v-for="item in holdIDUploadList"
                  :key="item.url"
                >
                  <template v-if="item.status === 'finished'">
                    <img :src="item.url" />
                    <div class="demo-upload-list-cover">
                      <Icon
                        type="ios-eye-outline"
                        @click.native="handleHoldIDView(item.name)"
                      ></Icon>
                      <Icon
                        type="ios-trash-outline"
                        @click.native="handleHoldIDRemove(item)"
                      ></Icon>
                    </div>
                  </template>
                  <template v-else>
                    <Progress
                      v-if="item.showProgress"
                      :percent="item.percentage"
                      hide-info
                    ></Progress>
                  </template>
                </div>
                <Upload
                  ref="uploadHoldID"
                  :show-upload-list="false"
                  accept="['image/jpg']"
                  :on-success="handleHoldIDSuccess"
                  :format="['jpg']"
                  :max-size="1024"
                  :on-format-error="handleHoldIDFormatError"
                  :on-exceeded-size="handleHoldIDMaxSize"
                  :before-upload="handleHoldIDBeforeUpload"
                  type="drag"
                  action="http://localhost:21021/api/services/app/FuYouService/PostUpload?fileTypeValue=16"
                  style="display: inline-block; width: 58px"
                >
                  <div style="width: 58px; height: 58px; line-height: 58px">
                    <Icon type="ios-camera" size="20"></Icon>
                  </div>
                </Upload>
                <Modal title="手持证件照片" v-model="holdIDVisible">
                  <img
                    :src="holdIDPath"
                    v-if="holdIDVisible"
                    style="width: 100%"
                  />
                </Modal>
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem>
          <Row style="text-align:right;top:30px;padding-bottom:30px;right:30px;">
            <Button type="primary" @click="handleSubmit('formValidate')" size="large" style="width:10%">下 一 步</Button>
          </Row>
        </FormItem>
      </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Watch, Emit } from "vue-property-decorator";
import Util from "@/lib/util";

import AbpBase from "@/lib/abpbase";
//引入富友字典值
import Dictionaries from "@/lib/fuyoustaticdata";

//引入表单实体
import payInfo from "@/store/entities/fuyoupay";
import info from "@/lib/fuyoustaticdata";

// //引用组件模板
@Component({})
export default class FuYou extends AbpBase {
  @Emit('stepValueEmit') send(val:any){};
  //地址集合
  mapList: Object = Dictionaries.MapList;
  //选择的地址集合
  address: any = [];
  //入账卡开户行名称
  bankDictList:any=[];
  //表单信息
  formValidate: any = {
    trace_no: "", //唯一流水号，机构自己定义，此字段可辅助拉取报文
    ins_cd: "", //机构号,接入机构在富友的唯一代码
    sub_ins_cd:"",
    mchnt_name: "", //商户全称，不能有特殊字符，仅可包含汉字、数字、字母
    mchnt_shortname: "", //商户简称，不能有特殊字符，仅可包含汉字、数字、字母
    real_name: "", //商户真实名称(与营业执照上相同)
    license_type: "", //证件类型
    license_no: "", //证件号码
    license_expire_dt: "", //证件到期日  长期请填20991231，无有效期请填19000101  （格式yyyyMMdd）
    certif_id: "", //法人身份证号
    certif_id_expire_dt: "", //法人身份证到期日
    contact_person: "", //联系人姓名
    contact_phone: "", //客服电话，必须纯数字。推荐 400开头电话或11位有效手机号
    contact_addr: "", //商户经营地联系地址
    contact_mobile: "", //联系电话
    contact_email: "", //联系邮箱
    business: "", //经营范围代码   个体工商户	居民生活/商业服务	宠物医院/宠物店	宠物医院	570
    city_cd: "", //商户经营地市代码
    county_cd: "", //商户经营地区县代码
    acnt_type: "", //入账卡类型
    bank_type:"",//行别
    inter_bank_no: "", //入账卡开户行联行号
    iss_bank_nm: "", //入账卡开户行名称
    acnt_nm: "", //入账卡户名
    acnt_no: "", //入账卡号
    settle_tp: "", //清算类型
    artif_nm: "", //法人姓名
    acnt_artif_flag: "", //法人入账标识
    acnt_certif_tp: "", //入账证件类型
    acnt_certif_id: "", //入账证件号
    acnt_certif_expire_dt: "", //入账证件到期日（格式 yyyyMMdd）
    sign: "", //签名，详见签名算法
    door_face:-1,//门脸照片
    door_head:-1,//门头照片
    legalperson_positive:-1,//法人正面照片
    legalperson_back:-1,//法人反面照片
    entry_bank_positive:-1,//入账银行正面
    hand_id:-1,//手持照片
    th_flag:1,//退货标识(0：不能退货，1：可以退货)
    wx_busi_flag:0,//微信业务标识(0：微信一般类)
    wx_flag:1,
    wx_set_cd:"M0000",
    ali_flag:1,
    ali_set_cd:"M0000",
    settle_tp_cd:"M0000",
    qpay_flag:0,
    jdpay_flag:0,
    has_reserve_acnt:0
  };
  //证件类型
  identityType: Object = Dictionaries.IdentityType;
  acntType: Object = Dictionaries.AcntType;
  bankInfo: Object = Dictionaries.BankInfo;
  liquidationType: Object = Dictionaries.LiquidationType;
  legalPersonMoneyType: Object = Dictionaries.LegalPersonMoneyType;
  entryBankIdentityType:Object=Dictionaries.EntryBankIdentityType;

  //选择银行的值改变事件
  bankChange(info){
    this.formValidate.iss_bank_nm=info.label;
    this.getBankDictList();
  }
  bankDictChange(info){
    if(info!=null )
      this.formValidate.iss_bank_nm=info.label;
  }
  addressChange(value, selectedData){
    if(value !=null && value.length>=0){
      this.formValidate.city_cd=value[1];
      this.formValidate.county_cd=value[2];
    }
    else{
      this.formValidate.city_cd="";
      this.formValidate.county_cd="";
    }
    //调用获取入账卡开户行名称
    this.getBankDictList();
  }
  //验证规则
  ruleValidate: any = {
    acnt_certif_id: [
      { required: true, message: "入账证件号不能为空", trigger: 'blur' },
    ],
    acnt_certif_expire_dt: [
      { required: true, message: "入账证件到期日不能为空", trigger: 'blur' },
    ],
    artif_nm: [
      { required: true, message: "法人名称不能为空", trigger: 'blur' },
    ],
    settle_tp: [
      { required: true, message: "请选择清算类型", trigger: 'change' },
    ],
    inter_bank_no: [
      { required: true, message: "请选择入账卡开户行名称", trigger: 'change' },
    ],
    bank_type: [
      { required: true, message: "请选择行别", trigger: 'change' },
    ],
    acnt_no: [
      { required: true, message: "入账卡号不能为空", trigger: 'blur' },
    ],
    door_face: [
      { required: true, validator:(rule, value, cb)=>{
        if(this.formValidate.door_face==-1||this.formValidate.door_face==null||this.formValidate.door_face!=value){
          return cb(new Error('请上传门脸照片'));
        }
        else{
          cb();
        }
      }, trigger: 'change' },
    ],//门脸照片
    door_head:[
      { required: true, validator:(rule, value, cb)=>{
        if(this.formValidate.door_head==-1||this.formValidate.door_head==null||this.formValidate.door_head!=value){
          return cb(new Error('请上传门头照片'));
        }
        else{
          cb();
        }
      }, trigger: 'change' },
    ],//门头照片
    legalperson_positive:[
      { required: true, validator:(rule, value, cb)=>{
        if(this.formValidate.legalperson_positive==-1||this.formValidate.legalperson_positive==null||this.formValidate.legalperson_positive!=value){
          return cb(new Error('请上传法人身份证正面照片'));
        }
        else{
          cb();
        }
      }, trigger: 'change' },
    ],//法人正面照片
    legalperson_back:[
      { required: true, validator:(rule, value, cb)=>{
        if(this.formValidate.legalperson_back==-1||this.formValidate.legalperson_back==null||this.formValidate.legalperson_back!=value){
          return cb(new Error('请上传法人身份证反面照片'));
        }
        else{
          cb();
        }
      }, trigger: 'change' },
    ],//法人反面照片
    entry_bank_positive:[
      { required: true, validator:(rule, value, cb)=>{
        if(this.formValidate.entry_bank_positive==-1||this.formValidate.entry_bank_positive==null||this.formValidate.entry_bank_positive!=value){
          return cb(new Error('请上传入账银行卡正面照片'));
        }
        else{
          cb();
        }
      }, trigger: 'change' },
    ],//入账银行正面
    hand_id:[
      { required: true, validator:(rule, value, cb)=>{
        if(this.formValidate.hand_id==-1||this.formValidate.hand_id==null||this.formValidate.hand_id!=value){
          return cb(new Error('请上传手持证件照片'));
        }
        else{
          cb();
        }
      }, trigger: 'change' },
    ],//手持照片
    
    contact_email: [
      { required: true, message: "联系邮箱不能为空", trigger: 'blur' },
    ],
    contact_mobile: [
      { required: true, message: "联系电话不能为空", trigger: 'blur' },
    ],
    contact_addr: [
      { required: true, message: "请选择商户经营地", trigger: 'change' },
    ],
    contact_phone: [
      { required: true, message: "联系人姓名不能为空", trigger: 'blur' },
    ],
    contact_person: [
      { required: true, message: "联系人姓名不能为空", trigger: 'blur' },
    ],
    certif_id_expire_dt: [
      { required: true, message: "法人身份证到期日不能为空", trigger: 'blur' },
    ],
    mchnt_name: [
      { required: true, message: "商户全称不能为空", trigger: 'blur' },
    ],
    mchnt_shortname: [
      { required: true, message: "商户简称不能为空", trigger: 'blur'},
    ],
    real_name: [
      { required: true, message: "商户真实名称不能为空", trigger: 'blur' },
    ],
    license_no: [
      { required: true, message: "证件号码不能为空", trigger: 'blur' },
    ],
    license_expire_dt: [
      { required: true, message: "证件到期日不能为空", trigger: 'blur' },
    ],
    certif_id: [
      { required: true, message: "法人身份证号不能为空", trigger: 'blur' },
    ],
  };

  //图片名称
  imgName: string = "";
  //文件集合中转变量
  fileListAll: any;

  submitFormObject:any;
  //#region 门脸变量相关
  //门脸图片路径
  doorFacePath: string = "";
  //门脸图片集合
  doorFaceUploadList: any = [];
  //是否可见（图片点击）
  doorFaceVisible: boolean = false;
  //#endregion

  //#region 门头变量相关
  //门头图片路径
  doorHeadPath: string = "";
  //门头图片集合
  doorHeadUploadList: any = [];
  //是否可见（图片点击）
  doorHeadVisible: boolean = false;
  //#endregion

  //#region 法人身份证正面照变量相关

  //法人身份证正面照路径
  legalPersonPositivePath: string = "";
  //法人身份证正面照集合
  legalPersonPositiveUploadList: any = [];
  //是否可见（图片点击）
  legalPersonPositiveVisible: boolean = false;
  //#endregion

  //#region 法人身份证反面照变量相关
  //法人身份证反面照路径
  legalPersonBackPath: string = "";
  //法人身份证反面照集合
  legalPersonBackUploadList: any = [];
  //是否可见（图片点击）
  legalPersonBackVisible: boolean = false;

  //#endregion

  //#region 入账银行卡正面照片变量相关
  //入账银行卡正面照片路径
  entryBankPositivePath: string = "";
  //入账银行卡正面照片集合
  entryBankPositiveUploadList: any = [];
  //是否可见（图片点击）
  entryBankPositiveVisible: boolean = false;
  //#endregion

  //#region 手持证件照片变量相关
  //手持证件照片路径
  holdIDPath: string = "";
  //手持证件照片集合
  holdIDUploadList: any = [];
  //是否可见（图片点击）
  holdIDVisible: boolean = false;

  //#endregion

  //#region  门脸上传相关
  //门脸上传相关
  //图片预览显示
  handleDoorFaceView(name) {
    this.imgName = name;
    this.doorFaceVisible = true;
  }
  //删除图片
  handleDoorFaceRemove(file) {
    this.fileListAll = this.$refs.uploadDoorFace;
    const fileList = this.fileListAll.fileList;
    this.doorFaceUploadList.splice(fileList.indexOf(file), 1);
    this.formValidate.door_face=-1;
  }
  //上传成功以后
  handleDoorFaceSuccess(res, file) {
    file.url = res.result.url;
    file.name = res.result.title;
    this.formValidate.door_face=res.result.id;
    this.doorFacePath = res.result.url;
  }
  //格式化输出上传文件
  handleDoorFaceFormatError(file) {
    this.$Notice.warning({
      title: "文件格式错误",
      desc: "请选择pdf文件上传",
    });
  }
  //图片上传最大值
  handleDoorFaceMaxSize(file) {
    this.$Notice.warning({
      title: "超出文件大小限制",
      desc: "文件大小不能超过1M",
    });
  }
  //图片上传之前验证
  handleDoorFaceBeforeUpload(file) {
    var check = this.doorFaceUploadList.length < 1;
    if (!check) {
      this.$Notice.warning({
        title: "最多可上传一张图片",
      });
    }
    return check;
  }

  //#endregion

  //#region  门头上传相关
  //门头上传相关
  //图片预览显示
  handleDoorHeadView(name) {
    this.imgName = name;
    this.doorHeadVisible = true;
  }
  //删除图片
  handleDoorHeadRemove(file) {
    this.fileListAll = this.$refs.uploadDoorHead;
    const fileList = this.fileListAll.fileList;
    this.doorHeadUploadList.splice(fileList.indexOf(file), 1);
    this.formValidate.door_head=-1;
  }
  //上传成功以后
  handleDoorHeadSuccess(res, file) {
    file.url = res.result.url;
    file.name = res.result.title;
    this.formValidate.door_head=res.result.id;
    this.doorHeadPath = res.result.url;
  }
  //格式化输出上传文件
  handleDoorHeadFormatError(file) {
    this.$Notice.warning({
      title: "文件格式错误",
      desc: "请选择jpg文件上传",
    });
  }
  //图片上传最大值
  handleDoorHeadMaxSize(file) {
    this.$Notice.warning({
      title: "超出文件大小限制",
      desc: "文件大小不能超过1M",
    });
  }
  //图片上传之前验证
  handleDoorHeadBeforeUpload(file) {
    var check = this.doorHeadUploadList.length < 1;
    if (!check) {
      this.$Notice.warning({
        title: "最多可上传一张图片",
      });
    }
    return check;
  }
  //#endregion

  //#region 法人身份证正面照
  //图片预览显示
  //LegalPersonPositive
  handleLegalPersonPositiveView(name) {
    this.imgName = name;
    this.legalPersonPositiveVisible = true;
  }
  //删除图片
  handleLegalPersonPositiveRemove(file) {
    this.fileListAll = this.$refs.uploadLegalPersonPositive;
    const fileList = this.fileListAll.fileList;
    this.legalPersonPositiveUploadList.splice(fileList.indexOf(file), 1);
    this.formValidate.legalperson_positive=-1;
  }
  //上传成功以后
  handleLegalPersonPositiveSuccess(res, file) {
    file.url = res.result.url;
    file.name = res.result.title;
    this.formValidate.legalperson_positive=res.result.id;
    this.legalPersonPositivePath = res.result.url;
  }
  //格式化输出上传文件
  handleLegalPersonPositiveFormatError(file) {
    this.$Notice.warning({
      title: "文件格式错误",
      desc: "请选择jpg文件上传",
    });
  }
  //图片上传最大值
  handleLegalPersonPositiveMaxSize(file) {
    this.$Notice.warning({
      title: "超出文件大小限制",
      desc: "文件大小不能超过1M",
    });
  }
  //图片上传之前验证
  handleLegalPersonPositiveBeforeUpload(file) {
    var check = this.legalPersonPositiveUploadList.length < 1;
    if (!check) {
      this.$Notice.warning({
        title: "最多可上传一张图片",
      });
    }
    return check;
  }
  //#endregion

  //#region 法人身份证反面照

  handleLegalPersonBackView(name) {
    this.imgName = name;
    this.legalPersonBackVisible = true;
  }
  //删除图片
  handleLegalPersonBackRemove(file) {
    this.fileListAll = this.$refs.uploadLegalPersonBack;
    const fileList = this.fileListAll.fileList;
    this.legalPersonBackUploadList.splice(fileList.indexOf(file), 1);
    this.formValidate.legalperson_back=-1;
  }
  //上传成功以后
  handleLegalPersonBackSuccess(res, file) {
    file.url = res.result.url;
    file.name = res.result.title;
    this.formValidate.legalperson_back=res.result.id;
    this.legalPersonBackPath = res.result.url;
  }
  //格式化输出上传文件
  handleLegalPersonBackFormatError(file) {
    this.$Notice.warning({
      title: "文件格式错误",
      desc: "请选择jpg文件上传",
    });
  }
  //图片上传最大值
  handleLegalPersonBackMaxSize(file) {
    this.$Notice.warning({
      title: "超出文件大小限制",
      desc: "文件大小不能超过1M",
    });
  }
  //图片上传之前验证
  handleLegalPersonBackBeforeUpload(file) {
    var check = this.legalPersonBackUploadList.length < 1;
    if (!check) {
      this.$Notice.warning({
        title: "最多可上传一张图片",
      });
    }
    return check;
  }
  //#endregion

  //#region 入账银行卡正面照片

  //图片预览显示
  handleEntryBankPositiveView(name) {
    this.imgName = name;
    this.entryBankPositiveVisible = true;
  }
  //删除图片
  handleEntryBankPositiveRemove(file) {
    this.fileListAll = this.$refs.uploadEntryBankPositive;
    const fileList = this.fileListAll.fileList;
    this.entryBankPositiveUploadList.splice(fileList.indexOf(file), 1);
    this.formValidate.entry_bank_positive=-1;
  }
  //上传成功以后
  handleEntryBankPositiveSuccess(res, file) {
    file.url = res.result.url;
    file.name = res.result.title;
    this.formValidate.entry_bank_positive=res.result.id;
    this.entryBankPositivePath = res.result.url;
  }
  //格式化输出上传文件
  handleEntryBankPositiveFormatError(file) {
    this.$Notice.warning({
      title: "文件格式错误",
      desc: "请选择pdf文件上传",
    });
  }
  //图片上传最大值
  handleEntryBankPositiveMaxSize(file) {
    this.$Notice.warning({
      title: "超出文件大小限制",
      desc: "文件大小不能超过1M",
    });
  }
  //图片上传之前验证
  handleEntryBankPositiveBeforeUpload(file) {
    var check = this.entryBankPositiveUploadList.length < 1;
    if (!check) {
      this.$Notice.warning({
        title: "最多可上传一张图片",
      });
    }
    return check;
  }
  //#endregion

  //#region 手持证件照片

  //图片预览显示
  handleHoldIDView(name) {
    this.imgName = name;
    this.holdIDVisible = true;
  }
  //删除图片
  handleHoldIDRemove(file) {
    this.fileListAll = this.$refs.uploadHoldID;
    const fileList = this.fileListAll.fileList;
    this.holdIDUploadList.splice(fileList.indexOf(file), 1);
    this.formValidate.hand_id=-1;
  }
  //上传成功以后
  handleHoldIDSuccess(res, file) {
    file.url = res.result.url;
    file.name = res.result.title;
    this.formValidate.hand_id=res.result.id;
    this.holdIDPath = res.result.url;
  }
  //格式化输出上传文件
  handleHoldIDFormatError(file) {
    this.$Notice.warning({
      title: "文件格式错误",
      desc: "请选择pdf文件上传",
    });
  }
  //图片上传最大值
  handleHoldIDMaxSize(file) {
    this.$Notice.warning({
      title: "超出文件大小限制",
      desc: "文件大小不能超过1M",
    });
  }
  //图片上传之前验证
  handleHoldIDBeforeUpload(file) {
    var check = this.holdIDUploadList.length < 1;
    if (!check) {
      this.$Notice.warning({
        title: "最多可上传一张图片",
      });
    }
    return check;
  }
  //#endregion

  //组件加载完成钩子函数
  mounted() {
    //加载门脸上传
    this.fileListAll = [];
    this.fileListAll = this.$refs.uploadDoorFace;
    this.doorFaceUploadList = this.fileListAll.fileList;
    //加载门头上传
    this.fileListAll = [];
    this.fileListAll = this.$refs.uploadDoorHead;
    this.doorHeadUploadList = this.fileListAll.fileList;
    //加载法人身份证正面
    this.fileListAll = [];
    this.fileListAll = this.$refs.uploadLegalPersonPositive;
    this.legalPersonPositiveUploadList = this.fileListAll.fileList;
    //加载法人身份证反面
    this.fileListAll = [];
    this.fileListAll = this.$refs.uploadLegalPersonBack;
    this.legalPersonBackUploadList = this.fileListAll.fileList;

    //加载入账银行卡正面照片
    this.fileListAll = [];
    this.fileListAll = this.$refs.uploadEntryBankPositive;
    this.entryBankPositiveUploadList = this.fileListAll.fileList;
    //加载手持证件照片
    this.fileListAll = [];
    this.fileListAll = this.$refs.uploadHoldID;
    this.holdIDUploadList = this.fileListAll.fileList;
  }
  //格式化输出地址值
  format (labels, selectedData) {
    var text="";
    var showText="";
    if(labels.length>0&&labels!=null){
      for (let index = 0; index < labels.length; index++) {
        text += labels[index];
        showText=showText+labels[index]+" / ";
      }
      this.formValidate.contact_addr=text;
    }
    return (showText!=""?showText.substring(0,showText.length-3):"");
  }
  //页面加载完成函数
  created() {
    this.formValidate.license_type="A";
    this.formValidate.business="570";
    this.formValidate.acnt_certif_tp="0";
    this.formValidate.acnt_type="2";
    this.formValidate.acnt_artif_flag="1";
    this.formValidate.settle_tp="3";
    
  };

  getBankDictList () {
    this.bankDictList=[];
    if(this.isNullOrEmpty(this.formValidate.bank_type)||this.isNullOrEmpty(this.formValidate.city_cd))return;
    var requestParams={
      BankType:this.formValidate.bank_type,
      CityID:this.formValidate.city_cd
    }
    this.$store.dispatch({
                type: 'fuyoupay/GetBankDictList',
                data: requestParams
            }).then((response)=>{
              this.bankDictList=response;
            })
  };
  isNullOrEmpty(value){
    return value ==null || value == undefined || value == "" || value ==-1;
  }
  //提交信息
  handleSubmit(name) {
    this.submitFormObject = this.$refs[name];
    this.submitFormObject.validate((valid,text) => {
      if (valid) {
        //如果 acnt_type=2 且acnt_artif_flag=1，则 acnt_nm=artif_nm 即对私且法人入账，则入账卡户名和法人姓名一致
        this.formValidate.acnt_nm=this.formValidate.artif_nm;
        this.$Modal.confirm({
        title: '确认',
        content: '<p>信息一经提交则无法修改，请确认信息填写无误！</p>',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.$store.dispatch({
                type: 'fuyoupay/SaveFuYouPayInfo',
                data: this.formValidate
            }).then((saveResponse)=>{
              localStorage.setItem("trace_no",saveResponse.data.result.trace_no);
              localStorage.setItem("stepValue","1");
              this.send(1);
            })
        },
       });
        
      }
      else{
        this.formValidate.license_type="A";
        this.formValidate.business="570";
        this.formValidate.acnt_certif_tp="0";
        this.formValidate.acnt_type="2";
        this.formValidate.acnt_artif_flag="1";
        this.formValidate.settle_tp="3";
      }
    });
  }
}
</script>

<style scope>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.ivu-cascader-rel {
  display: inline-block !important;
  width: 64.5% !important;
  position: relative !important;
}
.ivu-form-item-error-tip {
  left: 130px !important;
}
</style>