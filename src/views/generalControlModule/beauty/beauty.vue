<template>
  <div>
    <Card dis-hover>
      <Row>
        <Col span="4">
          <Tree
            :data="tree"
            class="demo-tree-render"
            ref="table"
            size="small"
            @on-select-change="treeselect"
            :draggable="true"
          ></Tree>
        </Col>
        <Col span="20">
          <div class="page-body">
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
                      v-model="pagerequest.keyword"
                      :placeholder="L('TenancyName') + '/' + L('Name')"
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
                    @click="create"
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
        </Col>
      </Row>
    </Card>
    <create-drugs
      v-model="createModalShow"
      @save-success="getpage"
      :data="createDrugs"
    ></create-drugs>
    <edit-drugs v-model="editModalShow" @save-success="getpage"></edit-drugs>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
// import CreateDrugs from './create-drugs.vue'
// import EditDrugs from './edit-drugs.vue'
import ViewUI from 'view-design'
import Pmedicines from '@/store/entities/generalControlModule/pmedicines'

const EditDrugs = () => import('./edit-beauty.vue')
const CreateDrugs = () => import('./create-beauty.vue')

class PageDrugsRequest extends PageRequest {
  orgId: 7990
  parentId: 2285
  DrugsName: ''
}

@Component({
  components: { 'create-drugs': CreateDrugs, 'edit-drugs': EditDrugs },
})
export default class Drugs extends AbpBase {
  edit() {
    this.editModalShow = true
  }
  createDrugs: Pmedicines = new Pmedicines()
  buttonProps = {
    type: 'default',
    size: 'small',
  }
  pagerequest: PageDrugsRequest = new PageDrugsRequest()

  createModalShow: boolean = false
  editModalShow: boolean = false
  permissions = {
    query: abp.auth.isGranted('Pages.ZK_Pmedicines_Beauty_Query'),
    add: abp.auth.isGranted('Pages.ZK_Pmedicines_Beauty_Add'),
    update: abp.auth.isGranted('Pages.ZK_Pmedicines_Beauty_Update'),
    delete: abp.auth.isGranted('Pages.ZK_Pmedicines_Beauty_Delete'),
    batchdelete: abp.auth.isGranted('Pages.ZK_Pmedicines_Beauty_BatchDelete'),
    lssue: abp.auth.isGranted('Pages.ZK_Pmedicines_Beauty_Lssue'),
  }

  get list() {
    return this.$store.state.drugs.list
  }
  get tree() {
    return this.$store.state.drugs.treeData
  }
  get loading() {
    return this.$store.state.drugs.loading
  }
  create() {
    this.createModalShow = true
  }

  // isActiveChange(val: string) {
  //   if (val === 'Actived') {
  //     this.pagerequest.isActive = true
  //   } else if (val === 'NoActive') {
  //     this.pagerequest.isActive = false
  //   } else {
  //     this.pagerequest.isActive = null
  //   }
  // }
  treeselect(item) {
    this.createDrugs = new Pmedicines()
    this.pagerequest.parentId = item[0].id
    this.pagerequest.pageIndex = 1
    this.createDrugs.categoryName = item[0].categoryName
    this.createDrugs.category = item[0].id
    this.$store.commit('drugs/create', this.createDrugs)
    this.getpage()
  }
  pageChange(page: number) {
    this.$store.commit('drugs/setCurrentPage', page)
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage()
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit('drugs/setPageSize', pagesize)
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage
    this.getpage()
  }

  TableChange() {}

  async getpage() {
    if (this.pagerequest.orgId == undefined || this.pagerequest == undefined) {
      this.pagerequest.orgId = 7990
      this.pagerequest.parentId = 2285
      this.pagerequest.DrugsName = ''
    }
    console.log('药品参数', this.pagerequest)
    await this.$store.dispatch({
      type: 'drugs/getAll',
      data: this.pagerequest,
    })
  }

  async getDG() {
    await this.$store.dispatch({
      type: 'drugs/GetDG',
    })
  }
  get pageSize() {
    return this.$store.state.drugs.pageSize
  }
  get totalCount() {
    return this.$store.state.drugs.totalCount
  }
  get currentPage() {
    return this.$store.state.drugs.currentPage
  }
  columns = [
    {
      type: 'selection',
      width: 40,
      key: 'id',
      tooltip: true,
      fixed: 'left',
      align: 'center',
    },
    {
      title: this.L('itemCode'),
      key: 'itemCode',
      tooltip: true,
      fixed: 'left',
      resizable: true,
      width: 120,
    },
    {
      title: this.L('drugsName'),
      key: 'drugsName',
      tooltip: true,
      fixed: 'left',
      width: '120',
      resizable: true,
    },
    {
      title: this.L('categoryName'),
      key: 'categoryName',
      tooltip: true,
      width: '90',
      resizable: true,
    },
    {
      title: this.L('barCode'),
      key: 'barCode',
      tooltip: true,
      width: '90',
      resizable: true,
    },
    {
      title: this.L('drugsNameLetter'),
      key: 'drugsNameLetter',
      tooltip: true,
      width: '90',
      resizable: true,
    },
    {
      title: this.L('englishName'),
      key: 'englishName',
      tooltip: true,
      width: '90',
      resizable: true,
    },
    {
      title: this.L('commonName'),
      key: 'commonName',
      tooltip: true,
    //   width: '90',
      resizable: true,
    },    
    {
      title: this.L('outstorePrice'),
      key: 'outstorePrice',
      tooltip: true,
      width: '90',
      resizable: true,
    },
    {
      title: this.L('memberPrice'),
      key: 'memberPrice',
      tooltip: true,
      width: '90',
      resizable: true,
    },
    {
      title: this.L('doNotDiscountString'),
      key: 'doNotDiscountString',
      tooltip: true,
      width: '90',
      resizable: true,
    },   
    {
      title: this.L('canOrderString'),
      key: 'canOrderString',
      tooltip: true,
      width: '90',
      resizable: true,
    },
    {
      title: this.L('canSellString'),
      key: 'canSellString',
      tooltip: true,
      width: '90',
      resizable: true,
    },   
    {
      title: this.L('Actions'),
      key: 'Actions',
      fixed: 'right',
      width: 120,
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
                  this.$store.commit('drugs/edit', row)
                  this.edit()
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
                        type: 'drugs/delete',
                        data: params.row,
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
    this.getDG()
  }
}
</script>
<style scoped>
.demo-tree-render .ivu-tree-title {
  width: 100%;
}
</style>
