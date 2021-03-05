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
                      v-model="pagerequest.paramsName"
                      :placeholder="L('Manufacturer_EnterpriseName')"
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
                ref="manufacturerTable"
                :data="list"
                draggable
                stripe
                @on-selection-change="TableChange"
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
      <createmanufacturer v-model="createModalShow" @save-success="getpage" :data="createManufacturer"></createmanufacturer>
      <editmanufacturer v-model="editModalShow" @save-success="getpage" :manufacturerId="manufacturerId"></editmanufacturer>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import ManufacturerEntity from '@/store/entities/generalControlModule/manufacturer'

//新增生产商组件
const createmanufacturer =() => import('./create-manufacturer.vue')
//编辑生产商组件
const editmanufacturer =() => import('./edit-manufacturer.vue')

class PageManufacturerRequest extends PageRequest {
  orgId: 7990
  paramsName: ''
}
@Component({
   components: { 'createmanufacturer': createmanufacturer
   , 'editmanufacturer': editmanufacturer 
   },
})
export default class Manufacturer extends AbpBase {
  orgIds:any =[];
  unitIds:any=[];
  //下发弹出框是否显示
  selectOrgModalShow:boolean=false
  //创建下发
  createLessueOrg(){
    var selectUnitList=(this.$refs.manufacturerTable as any).getSelection()
    if(selectUnitList==undefined || selectUnitList==null || selectUnitList.length<=0){
      this.$Message.warning({
                content: '请选择下发的生产商数据',
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
      type: 'manufacturer/LessueManufacturer',
      data: {orgIds:this.orgIds,manufacturerIds:this.unitIds}
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
  editClick(id) {
    this.editModalShow = true
    this.manufacturerId=id;
  }
  manufacturerId:Number=0
  createManufacturer: ManufacturerEntity = new ManufacturerEntity()
  buttonProps = {
    type: 'default',
    size: 'small',
  }
  pagerequest: PageManufacturerRequest = new PageManufacturerRequest()
  createModalShow: boolean = false
  editModalShow: boolean = false
  permissions = {
    query: abp.auth.isGranted('Pages.ZK_JC_Manufacturer_Query'),
    add: abp.auth.isGranted('Pages.ZK_JC_Manufacturer_Add'),
    update: abp.auth.isGranted('Pages.ZK_JC_Manufacturer_Update'),
    delete: abp.auth.isGranted('Pages.ZK_JC_Manufacturer_Delete'),
    batchdelete: abp.auth.isGranted('Pages.ZK_JC_Manufacturer_BatchDelete'),
    lssue: abp.auth.isGranted('Pages.ZK_JC_Manufacturer_Lssue'),
  }
  get loading() {
    return this.$store.state.manufacturer.loading
  }
  create() {
    this.createModalShow = true
  }
  pageChange(page: number) {
    this.$store.commit('manufacturer/setCurrentPage', page)
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage()
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit('manufacturer/setPageSize', pagesize)
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage()
  }

  TableChange() {}

  async getpage() {
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    if (this.pagerequest.orgId == undefined) {
      this.pagerequest.orgId = 7990
      this.pagerequest.paramsName = ''
    }
    await this.$store.dispatch({
      type: 'manufacturer/GetAllByOrgId',
      data: this.pagerequest,
    })
  }
  get list() {
    return this.$store.state.manufacturer.list
  }
  get pageSize() {
    return this.$store.state.manufacturer.pageSize
  }
  get totalCount() {
    return this.$store.state.manufacturer.totalCount
  }
  get currentPage() {
    return this.$store.state.manufacturer.currentPage
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
      title: this.L('Manufacturer_Serialnumber'),
      key: 'serialNumber',
      fixed: 'left',
      resizable: true,
      // width: 100,
    },
    {
      title: this.L('Manufacturer_EnterpriseName'),
      key: 'companyName',
      fixed: 'left',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_EnterpriseNumber'),
      key: 'licenseNo',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_PersonInCharge'),
      key: 'leader',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_Contacts'),
      key: 'contacter',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_ContactPhone'),
      key: 'telephone',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_ContactsOne'),
      key: 'contacter1',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_ContactsPhoneOne'),
      key: 'telephone1',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_FaxNumber'),
      key: 'faxNumber',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_ContactAddress'),
      key: 'address',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_PostalCode'),
      key: 'postalCode',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_EnterpriseLegalPerson'),
      key: 'enterpriser',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_BusinessLicenseNo'),
      key: 'legalerNo',
      // width: '100',
      resizable: true,
    },
    {
      title: this.L('Manufacturer_BusinessScope'),
      key: 'scopeBusiness',
      // width: '100',
      resizable: true,
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
                  this.manufacturerId=row.id;
                  this.editClick(this.manufacturerId)
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
                      await this.$store.dispatch({
                        type: 'manufacturer/DeleteManufacturerInfo',
                        data: params.row.id,
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

  async created() {
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage()
    this.getLessue();
  }
}
</script>
<style scoped>

</style>