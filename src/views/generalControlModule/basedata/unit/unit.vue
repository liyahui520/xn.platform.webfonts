<template>
      <div>
    <Card dis-hover>
      <Row>
          <div class="page-body" style="width:100%">
            <Form
              ref="queryForm"
              :label-width="100"
              label-position="left"
              inline
            >
              <Row :gutter="16">
                <Col span="8">
                  <FormItem :label="L('Keyword') + ':'" style="width:100%">
                    <Input
                      v-model="paramsName"
                      :placeholder="L('Unit_Name')"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <Button
                    icon="ios-search"
                    type="primary"
                    @click="getpage"
                    class="toolbar-btn"
                    v-if="permissions.query"
                    >{{ L('Find') }}</Button
                  >
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <Button
                    @click="create"
                    icon="ios-create-outline"
                    type="success"
                    v-if="permissions.add"
                    >{{ L('Add') }}</Button
                  >
                  <Button
                    @click="createLessueOrg"
                    icon="md-arrow-down"
                    class="toolbar-btn"
                    type="warning"
                    v-if="permissions.lssue"
                    >{{ L('ZK_Pmedicines_Consumables_Lssue') }}</Button
                  >
                </Col>
              </Row>
            </Form>
            <div class="margin-top-10">
              <Table
                :loading="loading"
                :columns="columns"
                :no-data-text="L('NoDatas')"
                border
                :data="list"
                draggable
                stripe
                ref="unitTable"

              >
              </Table>
              <Page
                show-sizer
                class-name="fengpage"
                :total="totalCount"
                class="margin-top-10"
                @on-change="pageChange"
                @on-page-size-change="pagesizeChange"
                :page-size="pageSize"
                :current="currentPage"
              ></Page>
            </div>
          </div>
      </Row>
      <!-- 新增单位 -->
        <Modal
        id="addModalRef"
        ref="addModalRef"
        :title="L('AddUnitInfo')"
        :value="createModalShow"
        @on-ok="saveInsert"
        @on-visible-change="visibleAddChange"
        :mask-closable="false"
        >
          <Form
              ref="unitAddForm"
              :rules="unitAddRule"
              :model="pagerequest"
              :label-width="110"
          >
              <Divider orientation="left" size="small">项目信息</Divider>
              <Row>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 18, offset: 1 }">
                    <FormItem :label="L('Unit_Name')" prop="unitName">
                    <Input
                        v-model="pagerequest.unitName"
                        :maxlength="32"
                        show-word-limit
                    ></Input>
                    </FormItem>
                </Col>
              </Row>
          </Form>
          <div slot="footer">
              <Button @click="cancelInsert">{{ L('Cancel') }}</Button>
              <Button @click="saveInsert" type="primary">{{ L('OK') }}</Button>
          </div>
        </Modal>

<!-- 编辑单位 -->
        <Modal
        id="UpdateModalRef"
        ref="UpdateModalRef"
        :title="L('AddUnitInfo')"
        :value="editModalShow"
        @on-ok="saveUpdate"
        @on-visible-change="visibleUpdateChange"
        :mask-closable="false"
        >
          <Form
              ref="unitUpdateForm"
              :rules="unitAddRule"
              :model="pagerequest"
              :label-width="110"
          >
              <Divider orientation="left" size="small">项目信息</Divider>
              <Row>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 18, offset: 1 }">
                    <FormItem :label="L('Unit_Name')" prop="unitName">
                    <Input
                        v-model="pagerequest.unitName"
                        :maxlength="32"
                        show-word-limit
                    ></Input>
                    </FormItem>
                </Col>
              </Row>
          </Form>
          <div slot="footer">
              <Button @click="cancelUpdate">{{ L('Cancel') }}</Button>
              <Button @click="saveUpdate" type="primary">{{ L('OK') }}</Button>
          </div>
        </Modal>

<!-- 选择下发机构 -->
        <Modal
        :title="L('ZK_Pmedicines_Consumables_Lssue')"
        :value="selectOrgModalShow"
        @on-ok="saveLessueOrg"
        @on-visible-change="visibleSelectLessueOrgChange"
        :mask-closable="false"
        >
          <Form
              :label-width="110"
              ref="unitLessueForm"
          >
              <Divider orientation="left" size="small">项目信息</Divider>
              <Row>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 18, offset: 1 }">
                    <FormItem :label="L('OrgName')">
                    <Select
                      multiple
                      v-model="orgIds"
                      filterable
                  >
                      <Option v-for="(option, index) in orgList" :value="option.orgId" :key="index">{{option.orgName}}</Option>
                  </Select>
                    </FormItem>
                </Col>
              </Row>
          </Form>
          <div slot="footer">
              <Button @click="cancelLessueOrg">{{ L('Cancel') }}</Button>
              <Button @click="saveLessueOrg" type="primary">{{ L('OK') }}</Button>
          </div>
        </Modal>
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import UnitEntity from '@/store/entities/generalControlModule/unit'
import convertpinyin from '@/lib/common/convertpinyi'
import lessueOrgModule from '@/store/modules/generalControlModule/lessueorg'

class PageUnitRequest extends PageRequest {
  id:0
  orgId: 7990
  serialNumber:""
  unitName:string=""
  englishName:string
  parentId:4355
}
@Component({
})
export default class Unit extends AbpBase {
  orgIds:any =[];
  unitIds:any=[];
  paramsName:string='';
  editClick(id) {
    this.editModalShow = true
    this.createModalShow=false;
    this.unitId=id;
    this.pagerequest.id=id;
    this.getUnitInfo();
  }
  async getUnitInfo(){
    this.pagerequest.pageSize=10;
    this.pagerequest.pageIndex=1;
    this.$store.dispatch({
      type: 'unit/GetUnitInfoById',
      data: this.pagerequest
    }).then((response)=>{
        this.pagerequest = response;
    })
  }
  saveInsert(){
    (this.$refs.unitAddForm as any).validate(async (valid: boolean) => {
      if (valid) {
        this.pagerequest.englishName=convertpinyin.chineseToPinYin(this.pagerequest.unitName);
        await this.$store.dispatch({
          type: 'unit/AddUnitInfo',
          data: this.pagerequest,
        });
        (this.$refs.unitAddForm as any).resetFields();
        this.$emit('save-success')
        this.$emit('input', false)
        this.pagerequest.englishName="";
        this.pagerequest.unitName="";
        this.pagerequest.serialNumber="";
        this.createModalShow=false;
        this.getpage();
      }
    })
  }
  saveUpdate(){
    (this.$refs.unitUpdateForm as any).validate(async (valid: boolean) => {
      if (valid) {
        this.pagerequest.pageSize=10;
        this.pagerequest.pageIndex=1;
        this.pagerequest.englishName=convertpinyin.chineseToPinYin(this.pagerequest.unitName);
        await this.$store.dispatch({
          type: 'unit/UpdateUnitInfo',
          data: this.pagerequest,
        });
        (this.$refs.unitUpdateForm as any).resetFields();
        this.$emit('save-success')
        this.$emit('input', false)
        this.pagerequest.englishName="";
        this.pagerequest.unitName="";
        this.pagerequest.serialNumber="";
        this.editModalShow=false;
        this.getpage();
      }
    })
  }
  visibleAddChange(value: boolean) {
    if (!value) {
      this.$emit('input', value)
    } else {
      (this.$refs.unitAddForm as any).resetFields();
    }
    this.createModalShow=value;
  }
  visibleUpdateChange(value: boolean) {
    if (!value) {
      this.$emit('input', value)
    } else {
      (this.$refs.unitUpdateForm as any).resetFields();
    }
    this.editModalShow=value;
  }
  cancelInsert(){
    (this.$refs.unitAddForm as any).resetFields()
    this.createModalShow=false;
  }
  cancelUpdate(){
    (this.$refs.unitUpdateForm as any).resetFields()
    this.editModalShow=false;
  }
  unitId:Number=0
  createUnit: UnitEntity = new UnitEntity()
  buttonProps = {
    type: 'default',
    size: 'small',
  }
  pagerequest: PageUnitRequest = new PageUnitRequest()
  createModalShow: boolean = false
  editModalShow: boolean = false
  
  permissions = {
    query: abp.auth.isGranted('Pages.ZK_JC_Unit_Query'),
    add: abp.auth.isGranted('Pages.ZK_JC_Unit_Add'),
    update: abp.auth.isGranted('Pages.ZK_JC_Unit_Update'),
    delete: abp.auth.isGranted('Pages.ZK_JC_Unit_Delete'),
    batchdelete: abp.auth.isGranted('Pages.ZK_JC_Unit_BatchDelete'),
    lssue: abp.auth.isGranted('Pages.ZK_JC_Unit_Lssue'),
  }
  get loading() {
    return this.$store.state.unit.loading
  }
  create() {
    this.createModalShow = true
  }
  pageChange(page: number) {
    this.$store.commit('unit/setCurrentPage', page)
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage()
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit('unit/setPageSize', pagesize)
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage()
  }

  async getpage() {
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.pagerequest.unitName=this.paramsName
    if (this.pagerequest.orgId == undefined) {
      this.pagerequest.orgId = 7990
      this.pagerequest.parentId = 4355
    }
    await this.$store.dispatch({
      type: 'unit/GetAllByOrgId',
      data: this.pagerequest,
    })
  }
  //下发弹出框是否显示
  selectOrgModalShow:boolean=false
  //创建下发
  createLessueOrg(){
    var selectUnitList=(this.$refs.unitTable as any).getSelection()
    if(selectUnitList==undefined || selectUnitList==null || selectUnitList.length<=0){
      this.$Message.warning({
                content: '请选择下发的单位数据',
                duration: 3
      });
      return;
    }
    this.selectOrgModalShow=true;
    this.unitIds=[];
    selectUnitList.forEach(element => {
      this.unitIds.push(element.id);
    });    
  }
  //下发相关内容
  async getLessue(){
    await this.$store.dispatch({
      type: 'lessueOrg/GetLessusOrgList'
    })
  }
  //获取下发的机构列表
  get orgList(){
    return this.$store.state.lessueOrg.list
  }
  //点击选择机构以后的确定按钮
  async saveLessueOrg(){
    this.$store.dispatch({
      type: 'unit/LessueUnit',
      data: {orgIds:this.orgIds,unitIds:this.unitIds}
    }).then((response)=>{
      if(response.data.success){
        this.$Message.success("下发成功！")
        this.selectOrgModalShow=false;
      }
    })
    
  }
  //取消
  async cancelLessueOrg(){
    this.selectOrgModalShow=false;
  }
  async visibleSelectLessueOrgChange(value: boolean){
    if (!value) {
      this.$emit('input', value)
    } else {
      (this.$refs.unitLessueForm as any).resetFields();
    }
    this.selectOrgModalShow=value;
  }


  get list() {
    return this.$store.state.unit.list
  }
  get pageSize() {
    return this.$store.state.unit.pageSize
  }
  get totalCount() {
    return this.$store.state.unit.totalCount
  }
  get currentPage() {
    return this.$store.state.unit.currentPage
  }
  columns = [
    {
      type: 'selection',
      width: 40,
      key: 'id',
      fixed: 'left',
      align: 'center',
    },
    {
      title: this.L('Unit_Serialnumber'),
      key: 'serialNumber',
      resizable: true,
    },
    {
      title: this.L('Unit_Name'),
      key: 'unitName',
      resizable: true,
    },
    {
      title: this.L('Unit_EnglishName'),
      key: 'englishName',
      resizable: true,
    },
    {
      title: this.L('Unit_CreateDate'),
      key: 'createDate',
      resizable: true,
      render:(h: any, params: any)=>{
        var text="";
        if(params.row.createDate!=''&&params.row.createDate!=null && params.row.createDate!=undefined){
          text=params.row.createDate.substring(0,19).replaceAll("T"," ");
        }
        return h('div',{},text);
      }
    },
    {
      title: this.L('Actions'),
      key: 'Actions',
      fixed: 'right',
      width: 150,
      render: (h: any, params: any) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'primary',
                size: 'small',
                if: this.permissions.update,
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  let row = params.row
                  this.unitId=row.id;
                  this.editClick(this.unitId)
                },
              },
            },
            this.L('Edit')
          ),
          h(
            'Button',
            {
              props: {
                type: 'error',
                size: 'small',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: async () => {
                  this.$Modal.confirm({
                    title: this.L('Tips'),
                    content: this.L('DeleteDrugsConfirm'),
                    okText: this.L('Yes'),
                    cancelText: this.L('No'),
                    onOk: async () => {
                      this.pagerequest.id=params.row.id;
                      await this.$store.dispatch({
                        type: 'unit/DeleteUnitInfo',
                        data: this.pagerequest,
                      })
                      await this.getpage()
                    },
                  })
                },
              },
            },
            this.L('Delete')
          ),
        ])
      },
    },

  ]
  unitAddRule = {
    unitName: [
      {
        required: true,
        message: this.L('Unit_UnitNameRequiredField', undefined, this.L('Unit_Name')),
        trigger: 'blur',
      }
    ]
  }
  async created() {
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage();
    this.getLessue();
    console.log("当前状态中存的值为",this.$store.state)
  }
}
</script>
<style lang="less">
.ivu-modal-wrap {
  .ivu-modal{
    top: 100;
    width: auto !important;
    .ivu-modal-content {
      width: 40% !important;
      margin-left: 30% !important;
    }
  }
}
</style>