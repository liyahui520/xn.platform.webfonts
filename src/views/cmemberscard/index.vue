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
            :data="list"
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
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import MyPageRequest from '@/store/entities/mypage-request'
class PageCmemberscardRequest extends MyPageRequest {
  id: number
  orgId: number = 7990
  cardNO: string
  cardUseType: number = -1
  customId: number = -1
  cardType: number = -1
  cardStatus: number = -1
  statDateTime: string = Util.getDay(-57)
  endDateTime: string = Util.getDay(0)
}

@Component({})
export default class OrgList extends AbpBase {
  creationTime: string[] = [Util.getDay(-7), Util.getDay(0)]
  detailModalShow: boolean = false
  pagerequest: PageCmemberscardRequest = new PageCmemberscardRequest()

  get list() {
    console.log('请求的数据为', this.$store.state.cmemberscard.list)
    return this.$store.state.cmemberscard.list
  }
  get loading() {
    return this.$store.state.cmemberscard.loading
  }
  pageChange(page: number) {
    this.$store.commit('cmemberscard/setCurrentPage', page)
    this.getpage()
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit('cmemberscard/setPageSize', pagesize)
    this.getpage()
  }
  async getpage() {
    this.pagerequest.pageSize = this.pageSize
    this.pagerequest.pageIndex = this.currentPage

    await this.$store.dispatch({
      type: 'cmemberscard/getAll',
      data: this.pagerequest,
    })
  }
  async find() {
    this.$store.commit('cmemberscard/setCurrentPage', 1)
    this.getpage()
  }
  get pageSize() {
    return this.$store.state.cmemberscard.pageSize
  }
  get totalCount() {
    return this.$store.state.cmemberscard.totalCount
  }
  get currentPage() {
    return this.$store.state.cmemberscard.currentPage
  }
  columns = [
    {
      title: this.L('CardNo'),
      key: 'cardNo',
      fixed: 'left',
    },
    {
      title: this.L('PCustomerName'),
      key: 'pCustomerName',
      fixed: 'left',
    },
    {
      title: this.L('CellPhone'),
      key: 'cellPhone',
    },
    {
      title: this.L('bTotalAmount'),
      key: 'bTotalAmount',
      render: (h: any, params: any) => {
        return h('span', '￥' + params.row.bTotalAmount.toFixed(2))
      },
    },
    {
      title: this.L('bOriAmount'),
      key: 'bOriAmount',
      render: (h: any, params: any) => {
        return h('span', '￥' + params.row.bOriAmount.toFixed(2))
      },
    },
    {
      title: this.L('bPresentAmount'),
      key: 'bPresentAmount',
      render: (h: any, params: any) => {
        return h('span', '￥' + params.row.bPresentAmount.toFixed(2))
      },
    },
    {
      title: this.L('bTotalCount'),
      key: 'bTotalCount',
    },
    {
      title: this.L('bOriCount'),
      key: 'bOriCount',
    },
    {
      title: this.L('bPresentCount'),
      key: 'bPresentCount',
    },
    {
      title: this.L('cardUserTypeText'),
      key: 'cardUserTypeText',
    },
    {
      title: this.L('cardStatusText'),
      key: 'cardStatusText',
    },
    {
      title: this.L('cardCreateTime'),
      key: 'cardCreateTime',
      render: (h: any, params: any) => {
        return h(
          'span',
          (this as any).$moment(params.row.payedDate).format('YYYY-MM-DD HH:mm')
        )
      },
    },
    {
      title: this.L('Actions'),
      key: 'Actions',
      fixed: 'right',
      render: (h: any, params: any) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'primary',
                size: 'small',
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
            this.L('UpdateSHDetails')
          ),
        ])
      },
    },
  ]
  async update() {
    this.detailModalShow = true
  }
  async created() {
    console.log('页面加载函数')
    this.find()
  }
}
</script>
