<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="90" label-position="left" inline>
                    <Row :gutter="16">
                        <!-- <Col span="5" v-if="!tenant">
                            <FormItem :label="L('OrgName')+':'" style="width:100%"> 
                                <Select v-model="pagerequest.orgId" @on-change="onChange" :placeholder="L('OrgName')"  filterable> 
                                    <Option v-for="item in pcliments" :value="item.id" :label="item.orgName" :key="item.id">
                                        <span>{{item.orgName}}</span>
                                        <span style="float:right;color:#ccc">{{item.id}}</span>
                                        </Option>
                                </Select>
                            </FormItem>
                        </Col> -->
                        
                        <Col span="3">
                        <Button icon="ios-search" type="primary"  @click="find" class="toolbar-btn">{{L('Find')}}</Button>
                        </Col>
                    </Row> 
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :row-class-name="rowClassName"  :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <!-- <detail-consumption v-model="detailModalShow"  @save-success="find"></detail-consumption> -->
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import { dragTable } from '@/lib/dragtable'
   
    class PageChargeHistoryRequest {
        orgId:number;
        customerName:string;
        cellPhone:string;
        customerID:number;
        pageIndex:number;
        pageSize:number;
    }
    @Component({ 
    })
    export default class ChargeHistorys extends AbpBase{
       
        pagerequest:PageChargeHistoryRequest=new PageChargeHistoryRequest();
        detailObj: {};
        detailModalShow:boolean=false;
        get list(){
            return this.$store.state.chargehistory.list;
        };
        get sellerList(){
            return this.$store.state.chargehistory.sellerList;
        };
        get loading(){
            return this.$store.state.chargehistory.loading;
        };
         get pcliments(){
            if(this.$store.state.chargehistory.pcliments&&this.$store.state.chargehistory.pcliments[0]){
                this.pagerequest.orgId = this.$store.state.chargehistory.pcliments[0].id;
                this.GetSellersAll(this.pagerequest.orgId);
            }
            return this.$store.state.chargehistory.pcliments;
        }
        detail(data){
            this.$store.dispatch({
                type: 'chargehistory/GetChargeHistoryAll',
                data: data
            })
        };
        modalShow(row) { 
            this.detailModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('chargehistory/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('chargehistory/setPageSize',pagesize);
            this.getpage();
        }
        find(){
             this.$store.commit('chargehistory/setCurrentPage',1);
            this.getpage();
        }
        getpage(){
            this.$store.dispatch({
                type:'chargehistory/GetChargeHistoryAll',
                data:this.pagerequest
            })
        }
        GetSellersAll(data){
            this.$store.dispatch({
                type:'chargehistory/GetChargeHistoryAll',
                data:data
            })
        }
        get tenant(){
            return this.$store.state.session.tenant;
        }
        get pageSize(){
            return this.$store.state.chargehistory.pageSize;
        }
        get totalCount(){
            return this.$store.state.chargehistory.totalCount;
        }
        get currentPage(){
            return this.$store.state.chargehistory.currentPage;
        }
        columns=[{
            title:this.L('OrgName'),
            key:'orgName',
            fixed:"left",
            width:"80px"
        },{
            title:this.L('CustomerName'),
            key:'customerName',
            fixed:"left",
            width:"110px"
        }]
        created(){
            this.find()
        }
        rowClassName(row, index){
            if(row.paymentStatus==5){
                return "demo-table-error-row"
            }
            return "";
        } 
        onChange(val:number){  
            if(val>0)
                    this.GetSellersAll(val) 
            }

    }
</script>
<style>
.ivu-table .demo-table-error-row td{
        background-color: #d5d5d5;
        color: red;
    }
</style>