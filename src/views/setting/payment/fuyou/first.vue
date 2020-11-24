<template>
    <div >
      <Card dis-hover>
        <Form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="120"
        >
          <FormItem>
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
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <FormItem label="商户全称">
                  <Input
                    v-model="formValidate.mchnt_name"
                    title="需与营业执照一致，如遇提示重复，请在后面加数字1、2...，若为小微商户，请命名为 个体户 xxx。"
                    placeholder="需与营业执照一致，如遇提示重复，请在后面加数字1、2...，若为小微商户，请命名为 个体户 xxx。"
                    style="width: 60%"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="商户简称">
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
                <FormItem label="商户真实名称">
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
                <FormItem label="门脸照片">
                  <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleView(item.name)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item)"
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
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['jpg']"
                    :max-size="1024"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag"
                    action="http://localhost:21021/api/services/app/FuYouService/PostUpload?fileType=1"
                    style="display: inline-block; width: 58px"
                  >
                    <div style="width: 58px; height: 58px; line-height: 58px">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal title="View Image" v-model="visible">
                    <!-- <img
                :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                v-if="visible"
                style="width: 100%"
              /> -->
                  </Modal>
                </FormItem>
              </Col>
              <Col span="12">
              
              <FormItem label="门头照片">
                  <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleView(item.name)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item)"
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
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['jpg', 'jpeg', 'png']"
                    :max-size="1024"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag"
                    action="C:/Users/tongc/Pictures/Saved Pictures"
                    style="display: inline-block; width: 58px"
                  >
                    <div style="width: 58px; height: 58px; line-height: 58px">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal title="View Image" v-model="visible">
                    <!-- <img
                :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                v-if="visible"
                style="width: 100%"
              /> -->
                  </Modal>
                </FormItem>
               </Col>
            </Row>
          </FormItem>




          <FormItem>
            <Row>
              <Col span="12">
                <FormItem label="证件号码">
                  <Input
                    v-model="formValidate.license_no"
                    title="证件号码"
                    placeholder="证件号码"
                    style="width: 60%"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="证件到期日">
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
                <FormItem label="法人身份证号">
                  <Input
                    v-model="formValidate.certif_id"
                    title="法人身份证号"
                    placeholder="法人身份证号"
                    style="width: 60%"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="法人身份证到期日">
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
                <FormItem label="法人身份证正面照片">
                  <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleView(item.name)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item)"
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
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['jpg', 'jpeg', 'png']"
                    :max-size="1024"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag"
                    action="C:/Users/tongc/Pictures/Saved Pictures"
                    style="display: inline-block; width: 58px"
                  >
                    <div style="width: 58px; height: 58px; line-height: 58px">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal title="View Image" v-model="visible">
                    <!-- <img
                :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                v-if="visible"
                style="width: 100%"
              /> -->
                  </Modal>
                </FormItem>
              </Col>
              <Col span="12">
              
              <FormItem label="法人身份证反面照片">
                  <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleView(item.name)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item)"
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
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['jpg', 'jpeg', 'png']"
                    :max-size="1024"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag"
                    action="C:/Users/tongc/Pictures/Saved Pictures"
                    style="display: inline-block; width: 58px"
                  >
                    <div style="width: 58px; height: 58px; line-height: 58px">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal title="View Image" v-model="visible">
                    <!-- <img
                :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                v-if="visible"
                style="width: 100%"
              /> -->
                  </Modal>
                </FormItem>
               </Col>
            </Row>
          </FormItem>


          <FormItem>
            <Row>
              <Col span="12">
                <FormItem label="联系人姓名">
                  <Input
                    v-model="formValidate.contact_person"
                    title="联系人姓名"
                    placeholder="联系人姓名"
                    style="width: 60%"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="客服电话">
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
                <FormItem label="商户经营地">
                  <Cascader
                    :data="mapList"
                    v-model="address"
                    filterable
                    clearable
                    style="width: 93%"
                    transfer
                  ></Cascader>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="联系电话">
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
                <FormItem label="联系邮箱">
                  <Input
                    v-model="formValidate.contact_email"
                    title="联系邮箱"
                    placeholder="联系邮箱"
                    style="width: 60%"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="入账卡类型">
                  <Select v-model="formValidate.acnt_type" style="width: 60%">
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
                <FormItem label="入账卡开户行名称">
                  <Select v-model="formValidate.iss_bank_nm" style="width: 60%">
                    <Option
                      v-for="item in bankInfo"
                      :value="item.ID"
                      :key="item.Name"
                      >{{ item.Name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="入账卡号">
                  <Input
                    v-model="formValidate.acnt_no"
                    title="入账卡号"
                    placeholder="入账卡号"
                    style="width: 60%"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <FormItem label="清算类型">
                  <Select v-model="formValidate.settle_tp" style="width: 60%">
                    <Option
                      v-for="item in liquidationType"
                      :value="item.ID"
                      :key="item.Name"
                      >{{ item.Name }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="法人姓名">
                  <Input
                    v-model="formValidate.artif_nm"
                    title="对私结算入账户名和法人名称一致"
                    placeholder="对私结算入账户名和法人名称一致"
                    style="width: 60%"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Row>
              <Col span="12">
                <FormItem label="法人入账标识">
                  <Select
                    v-model="formValidate.acnt_artif_flag"
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
              <Col span="12">
                <FormItem label="入账证件类型">
                  <Select
                    v-model="formValidate.acnt_certif_tp"
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
                <FormItem label="入账证件号">
                  <Input
                    v-model="formValidate.artif_nm"
                    title="入账证件号"
                    placeholder="入账证件号"
                    style="width: 60%"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="入账证件到期日">
                  <Input
                    v-model="formValidate.acnt_certif_expire_dt"
                    :maxlength="8"
                    title="入账证件到期日（格式例：2020年01月01日 输入20200101）"
                    placeholder="入账证件到期日（格式例：2020年01月01日 输入20200101）"
                    style="width: 60%"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </FormItem>

          <FormItem>
            <Row>
              <Col span="12">
                <FormItem label="入账银行卡正面照片">
                  <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                      <img :src="item.url" />
                      <div class="demo-upload-list-cover">
                        <Icon
                          type="ios-eye-outline"
                          @click.native="handleView(item.name)"
                        ></Icon>
                        <Icon
                          type="ios-trash-outline"
                          @click.native="handleRemove(item)"
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
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :format="['jpg', 'jpeg', 'png']"
                    :max-size="1024"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    type="drag"
                    action="C:/Users/tongc/Pictures/Saved Pictures"
                    style="display: inline-block; width: 58px"
                  >
                    <div style="width: 58px; height: 58px; line-height: 58px">
                      <Icon type="ios-camera" size="20"></Icon>
                    </div>
                  </Upload>
                  <Modal title="View Image" v-model="visible">
                    <!-- <img
                :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'"
                v-if="visible"
                style="width: 100%"
              /> -->
                  </Modal>
                </FormItem>
              </Col>
              <Col span="12"> </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')"
              >Submit</Button
            >
            <!-- <Button
              @click="handleReset('formValidate')"
              style="margin-left: 8px"
              >Reset</Button
            > -->
          </FormItem>
        </Form>
      </Card>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "@/lib/util";

import AbpBase from "@/lib/abpbase";
//引入富友字典值
import Dictionaries from "@/lib/fuyoustaticdata";

//引入表单实体
import payInfo from "@/store/entities/fuyoupay";

// //引用组件模板
@Component({})
export default class FuYou extends AbpBase {
  //步骤值
  stepValue: number = 0;
  //地址集合
  mapList: Object = Dictionaries.MapList;
  //选择的地址集合
  address: Object = [];
  //表单信息
  formValidate: any = {
    trace_no: "", //唯一流水号，机构自己定义，此字段可辅助拉取报文
    ins_cd: "", //机构号,接入机构在富友的唯一代码
    mchnt_name: "", //商户全称，不能有特殊字符，仅可包含汉字、数字、字母
    mchnt_shortname: "", //商户简称，不能有特殊字符，仅可包含汉字、数字、字母
    real_name: "", //商户真实名称(与营业执照上相同)
    license_type: "A", //证件类型
    license_no: "", //证件号码
    license_expire_dt: "", //证件到期日  长期请填20991231，无有效期请填19000101  （格式yyyyMMdd）
    certif_id: "", //法人身份证号
    certif_id_expire_dt: "", //法人身份证到期日
    contact_person: "", //联系人姓名
    contact_phone: "", //客服电话，必须纯数字。推荐 400开头电话或11位有效手机号
    contact_addr: "", //商户经营地联系地址
    contact_mobile: "", //联系电话
    contact_email: "", //联系邮箱
    business: "570", //经营范围代码   个体工商户	居民生活/商业服务	宠物医院/宠物店	宠物医院	570
    city_cd: "", //商户经营地市代码
    county_cd: "", //商户经营地区县代码
    acnt_type: "", //入账卡类型
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
  };
  //证件类型
  identityType: Object = Dictionaries.IdentityType;
  acntType: Object = Dictionaries.AcntType;
  bankInfo: Object = Dictionaries.BankInfo;
  liquidationType: Object = Dictionaries.LiquidationType;
  legalPersonMoneyType: Object = Dictionaries.LegalPersonMoneyType;
  //验证规则
  ruleValidate: any = {
    // name: [
    //   { required: true, message: "The name cannot be empty", trigger: "blur" },
    // ],
    // mail: [
    //   { required: true, message: "Mailbox cannot be empty", trigger: "blur" },
    //   { type: "email", message: "Incorrect email format", trigger: "blur" },
    // ],
    // city: [
    //   { required: true, message: "Please select the city", trigger: "change" },
    // ],
    // gender: [
    //   { required: true, message: "Please select gender", trigger: "change" },
    // ],
    // desc: [
    //   {
    //     required: true,
    //     message: "Please enter a personal introduction",
    //     trigger: "blur",
    //   },
    //   {
    //     type: "string",
    //     min: 20,
    //     message: "Introduce no less than 20 words",
    //     trigger: "blur",
    //   },
    // ],
  };
  //图片名称
  imgName: string = "";
  //是否可见（图片点击）
  visible: boolean = false;
  //上传列表
  uploadList: any = [];
  //文件集合中转变量
  fileListAll: any;
  //图片预览显示
  handleView(name) {
    this.imgName = name;
    this.visible = true;
  }
  //删除图片
  handleRemove(file) {
    this.fileListAll = this.$refs.upload;
    const fileList = this.fileListAll.fileList;
    this.fileListAll.splice(fileList.indexOf(file), 1);
  }
  //上传成功以后
  handleSuccess(res, file) {
    file.url = "C://Users//tongc//Pictures//Saved Pictures//avatar";
    file.name = "7eb99afb9d5f317c912f08b5212fd69a";
  }
  //格式化输出上传文件
  handleFormatError(file) {
    this.$Notice.warning({
      title: "文件格式错误",
      desc:
        "请选择pdf文件上传",
    });
  }
  //图片上传最大值
  handleMaxSize(file) {
    this.$Notice.warning({
      title: "超出文件大小限制",
      desc: "文件大小不能超过1M",
    });
  }
  //图片上传之前验证
  handleBeforeUpload(file) {
    console.log("上传的文件为：",file);
    const check = this.uploadList.length < 5;
    if (!check) {
      this.$Notice.warning({
        title: "Up to five pictures can be uploaded.",
      });
    }
    return check;
  }
  //组件加载完成钩子函数
  mounted() {
    console.log("下拉内容为", this.identityType);
    console.log(this.formValidate.license_type);
    console.log(this.formValidate.business);
    this.fileListAll = this.$refs.upload;
    this.uploadList = this.fileListAll.fileList;
  }
  //提交信息
  handleSubmit(name) {
    this.formValidate = this.$refs[name];

    this.formValidate.validate((valid) => {
      if (valid) {
        this.$Message.success("Success!");
      } else {
        this.$Message.error("Fail!");
      }
    });
  }
  //重置表单信息  暂时禁用
  // handleReset(name) {
  //   this.ruleValidate = this.$refs[name];
  //   this.ruleValidate.resetFields();
  // }
  //下一步点击事件
  nextStep() {
    if (this.stepValue == 2) {
      this.stepValue = 0;
    } else {
      this.stepValue += 1;
    }
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
  width: 65% !important;
  position: relative !important;
}
</style>