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
                      :placeholder="L('AiBoKe_OrgName') +' / ' + L('AiBoKe_JP')+' / ' + L('AiBoKe_EMSType') +' / ' + L('AiBoKe_EMSCode')"
                      clearable 
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
    </Card>
    <editaiboke  v-model="editModalShow" @save-success="getpage" :aibokeId="aibokeId"></editaiboke>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import AiBoKeEntity from '@/store/entities/activity/aiboke'

//编辑爱波克活动组件
const editaiboke =() => import('./edit-aiboke.vue')

class PageAiBoKeRequest extends PageRequest {
  orgId: 7990
  paramsName: ''
}
@Component({
    components: { 
        editaiboke
   },
})
export default class AiBoKe extends AbpBase {
  editClick(id) {
    this.editModalShow = true
    this.aibokeId=id;
  }
  aibokeId:Number=0
  createManufacturer: AiBoKeEntity = new AiBoKeEntity()
  buttonProps = {
    type: 'default',
    size: 'small',
  }
  pagerequest: PageAiBoKeRequest = new PageAiBoKeRequest()
  createModalShow: boolean = false
  editModalShow: boolean = false
  permissions = {
    query: abp.auth.isGranted('Pages.AiBoKe_Query'),
    add: abp.auth.isGranted('Pages.AiBoKe_Add'),
    update: abp.auth.isGranted('Pages.AiBoKe_Update'),
    delete: abp.auth.isGranted('Pages.AiBoKe_Delete'),
    batchdelete: abp.auth.isGranted('Pages.AiBoKe_BatchDelete'),
  }
  get loading() {
    return this.$store.state.manufacturer.loading
  }
  create() {
    this.createModalShow = true
  }
  pageChange(page: number) {
    this.$store.commit('aiboke/setCurrentPage', page)
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage()
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit('aiboke/setPageSize', pagesize)
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage()
  }

  TableChange() {}

  async getpage() {
    if (this.pagerequest.orgId == undefined) {
      this.pagerequest.orgId = 7990
      this.pagerequest.paramsName = ''
    }
    await this.$store.dispatch({
      type: 'aiboke/GetAiBoKePageList',
      data: this.pagerequest,
    })
  }
  get list() {
    return this.$store.state.aiboke.list
  }
  get pageSize() {
    return this.$store.state.aiboke.pageSize
  }
  get totalCount() {
    return this.$store.state.aiboke.totalCount
  }
  get currentPage() {
    return this.$store.state.aiboke.currentPage
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
      title: this.L('AiBoKe_CreateDate'),
      key: 'createDate',
      resizable: true,
      width:100,
      render:(h: any, params: any)=>{
        var text="";
        if(params.row.createDate!=''&&params.row.createDate!=null && params.row.createDate!=undefined){
          text=params.row.createDate.substring(0,7);
        }
        return h('div',{},text);
      }
    },
    {
      title: this.L('AiBoKe_OrgName'),
      key: 'orgName',
      resizable: true,
    },
    {
      title: this.L('AiBoKe_Score'),
      key: 'score',
      width:100,
      resizable: true,
    },
    {
      title: this.L('AiBoKe_JP'),
      key: 'jp',
      resizable: true,
    },
    {
      title: this.L('AiBoKe_EMSType'),
      key: 'emsType',
      width:200,
      resizable: true,
    },
    {
      title: this.L('AiBoKe_EMSCode'),
      key: 'emsCode',
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
                  this.aibokeId=row.id;
                  this.editClick(this.aibokeId)
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
                        type: 'aiboke/DeleteAiBoKeActivity',
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
  }
}
</script>
<style lang="less">

</style>