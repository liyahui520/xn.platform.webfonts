<template>
  <div>
    <Card dis-hover>
      <div class="page-body">
        <Form ref="queryForm" :label-width="90" label-position="left" inline>
          <Row :gutter="16">
            <Col span="6">
              <FormItem :label="L('OrgId') + ':'" style="width:100%">
                <Input v-model="pagerequest.id" :placeholder="L('OrgId')" />
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem :label="L('OrgName') + ':'" style="width:100%">
                <Input
                  v-model="pagerequest.orgName"
                  :placeholder="L('OrgName')"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <Button
                icon="ios-search"
                type="primary"
                @click="find"
                class="toolbar-btn"
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
            draggable
            stripe
            :data="list"
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
    </Card>
    <UpdateFY v-model="detailModalShow" @save-success="getpage"></UpdateFY>
    <EditSMS v-model="editModalShow" @save-success="getpage"></EditSMS>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import MyPageRequest from '@/store/entities/mypage-request'
import UpdateFY from './updateFY.vue'
import EditSMS from './editSmsCount.vue'
class PageOrgListRequest extends MyPageRequest {
  id: number
  orgName: string
}
@Component({
  components: { UpdateFY, EditSMS },
})
export default class OrgList extends AbpBase {
  detailModalShow: boolean = false
  editModalShow: boolean = false
  pagerequest: PageOrgListRequest = new PageOrgListRequest()

  get list() {
    return this.$store.state.orglist.list
  }
  get loading() {
    return this.$store.state.orglist.loading
  }
  pageChange(page: number) {
    this.$store.commit('orglist/setCurrentPage', page)
    this.getpage()
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit('orglist/setPageSize', pagesize)
    this.getpage()
  }
  async getpage() {
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage

    await this.$store.dispatch({
      type: 'orglist/getAll',
      data: this.pagerequest,
    })
    // console.log("请求接口之前")
    // var requestParams={orgId:7990,
    //                     customerName:"",
    //                     cellPhone:"",
    //                     customerID:-1,
    //                     pageIndex:1,
    //                     pageSize:10}
    // await this.$store.dispatch({
    //     type:'chargehistory/GetChargeHistoryAll',
    //     data:requestParams
    // })
    // console.log("请求接口之后")
  }
  async find() {
    this.$store.commit('orglist/setCurrentPage', 1)
    this.getpage()
  }
  get pageSize() {
    return this.$store.state.orglist.pageSize
  }
  get totalCount() {
    return this.$store.state.orglist.totalCount
  }
  get currentPage() {
    return this.$store.state.orglist.currentPage
  }
  TableChange() {}
  columns = [
    {
      title: this.L('OrgId'),
      key: 'id',
      width: 60,
      fixed: 'left',
      tooltip: true,
    },
    {
      title: this.L('OrgName'),
      key: 'orgName',
      width: 150,
      fixed: 'left',
      tooltip: true,
    },
    {
      title: this.L('CellPhone'),
      key: 'telephone',
      width: 120,
      tooltip: true,
    },
    {
      title: this.L('CustomerName'),
      key: 'contactName',
      width: 100,
      tooltip: true,
    },
    {
      title: this.L('UserNumber'),
      key: 'userNumber',
      width: 90,
      tooltip: true,
    },
    {
      title: this.L('Address'),
      key: 'address',
      width: 320,
      tooltip: true,
    },
    {
      title: this.L('ActivetDate'),
      key: 'activetDate',
      render: (h: any, params: any) => {
        return h(
          'span',
          (this as any).$moment(params.row.payedDate).format('YYYY-MM-DD HH:mm')
        )
      },
      width: 150,
      tooltip: true,
    },
    // {
    //     title:this.L('Pcli.serialNumber'),
    //     key:'serialNumber'
    // },
    {
      title: this.L('SmsCount'),
      key: 'smsCount',
      width: 80,
      tooltip: true,
    },
    {
      title: this.L('MainOrg'),
      key: 'mainOrg',
      render: (h: any, params: any) => {
        if (params.row.mainOrg) return h('span', '总店')
        else return h('span', '分店')
      },
      width: 80,
      tooltip: true,
    },
    {
      title: this.L('IsMerChno'),
      key: 'isMerChno',
      render: (h: any, params: any) => {
        if (params.row.isMerChno)
          return h('div', [
            h(
              'Tag',
              {
                props: {
                  color: 'green',
                },
              },
              params.row.merchnoEntity.mchnt_cd
            ),
          ])
        else return h('span', '未配置')
      },
      width: 120,
      tooltip: true,
    },
    {
      title: this.L('AddressProvince'),
      key: 'addressProvince',
      width: 80,
      tooltip: true,
    },
    {
      title: this.L('AddressCity'),
      key: 'addressCity',
      width: 80,
      tooltip: true,
    },
    {
      title: this.L('AddressTown'),
      key: 'addressTown',
      width: 80,
      tooltip: true,
    },
    {
      title: this.L('AddressStreet'),
      key: 'addressStreet',
      width: 150,
      tooltip: true,
    },
    {
      title: this.L('NewVersion'),
      key: 'newVersion',
      width: 120,
      tooltip: true,
    },
    {
      title: this.L('OrgState'),
      key: 'orgState',
      width: 80,
      tooltip: true,
    },
    {
      title: this.L('IsBigCustomer'),
      key: 'isBigCustomer',
      width: 120,
      tooltip: true,
    },
    {
      title: this.L('BigCustomerName'),
      key: 'bigCustomerName',
      width: 120,
      tooltip: true,
    },
    {
      title: this.L('Actions'),
      key: 'Actions',
      width: 120,
      fixed: 'right',
      render: (h: any, params: any) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'info',
                size: 'small',
                ghost: '',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  this.$store.commit('orglist/detail', params.row)
                  this.update()
                },
              },
            },
            '富友'
            // this.L('UpdateSHDetails')
          ),

          h(
            'Button',
            {
              props: {
                type: 'warning',
                size: 'small',
                ghost: '',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  this.$store.commit('orglist/detail', params.row)
                  this.editsms()
                },
              },
            },
            '短信'
            // this.L('EditSMS')
          ),
        ])
      },
    },
  ]
  async update() {
    this.detailModalShow = true
  }

  async editsms() {
    this.editModalShow = true
  }
  async created() {
    console.log('页面加载函数')
    this.find()
  }
}
</script>
