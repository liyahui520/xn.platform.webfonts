<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <!-- <Form ref="queryForm" :label-width="90" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="5" v-if="!tenant">
                            <FormItem :label="L('OrgName')+':'" style="width:100%"> 
                                <Select v-model="pagerequest.orgId" @on-change="onChange" :placeholder="L('OrgName')"  filterable> 
                                    <Option v-for="item in pcliments" :value="item.id" :label="item.orgName" :key="item.id">
                                        <span>{{item.orgName}}</span>
                                        <span style="float:right;color:#ccc">{{item.id}}</span>
                                        </Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.CustomerNameOrPhone" :placeholder="L('UserName')+'/'+L('CellPhone')"></Input>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem :label="L('PetName')+':'" style="width:100%">
                                <Input v-model="pagerequest.pPetName" :placeholder="L('PetName')"></Input>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem :label="L('SellerName')+':'" style="width:100%">
                                <Select v-model="pagerequest.sellerId" :placeholder="L('Select')" @on-change="isActiveChange" clearable filterable>
                                    <Option :value="-1">{{L('All')}}</Option>
                                    <Option v-for="item in sellerList" :value="item.id" :key="item.id">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="5">
                            <FormItem :label="L('CreationTime')+':'" style="width:100%">
                                <DatePicker  v-model="creationTime" type="datetimerange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="3">
                        <Button icon="ios-search" type="primary"  @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                        </Col>
                    </Row> 
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :row-class-name="rowClassName"  :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div> -->
            </div>
        </Card>
        <!-- <detail-consumption v-model="detailModalShow"  @save-success="getpage"></detail-consumption> -->
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import DetailConsumption from './detail_consumption.vue'
    import { dragTable } from '@/lib/dragtable'
   
    class PageConsumptionRequest extends PageRequest{
        pPetName: string = '';
        staDateTime: string;
        endDateTime: string;
        pageSize: number;
        pageIndex: number;
        orgId: number;
        sellerId: number;
        customerNameOrPhone: string; 
        detailObj: Object;
    }
    
    @Component({
        components:{DetailConsumption}
    })
    export default class Consumptions extends AbpBase{
       
        creationTime:string[]=[ Util.getDay(-7),Util.getDay(0)];
        pagerequest:PageConsumptionRequest=new PageConsumptionRequest();
        customerNameOrPhone: "";
        pPetName: "";
        detailObj: {};
        detailModalShow:boolean=false;
        get list(){
            return this.$store.state.consumption.list;
        };
        get sellerList(){
            return this.$store.state.consumption.sellerList;
        };
        get loading(){
            return this.$store.state.consumption.loading;
        };
        get pcliments(){
            if(this.$store.state.consumption.pcliments&&this.$store.state.consumption.pcliments[0]){
                this.pagerequest.orgId = this.$store.state.consumption.pcliments[0].id;
                this.GetSellersAll(this.pagerequest.orgId);
            }
            return this.$store.state.consumption.pcliments;
        }
        async detail(data){
            await this.$store.dispatch({
                type: 'consumption/GetDetail',
                data: data
            })
        };
        modalShow(row) { 
            this.detailModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('consumption/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('consumption/setPageSize',pagesize);
            this.getpage();
        }
        isActiveChange(val:number){
            this.pagerequest.sellerId=val
        }
        async getpage(){
            if(!this.tenant){
                if(!this.pagerequest.orgId){
                    this.$Message.error("请选择医院");
                    return
                }
            }
            this.pagerequest.pageSize = this.pageSize
            this.pagerequest.pageIndex = this.currentPage;
            if (this.creationTime.length>0) {
                this.pagerequest.staDateTime=this.creationTime[0];
            }
            if (this.creationTime.length>1) {
                this.pagerequest.endDateTime=this.creationTime[1];
            }
           // this.pagerequest.orgId = 0
            this.pagerequest.customerNameOrPhone = this.customerNameOrPhone
            
            await this.$store.dispatch({
                type:'consumption/getAll',
                data:this.pagerequest
            })
        }
        async GetSellersAll(data){
            await this.$store.dispatch({
                type:'consumption/GetSellersAll',
                data:data
            })
        }
        get tenant(){
            return this.$store.state.session.tenant;
        }
        get pageSize(){
            return this.$store.state.consumption.pageSize;
        }
        get totalCount(){
            return this.$store.state.consumption.totalCount;
        }
        get currentPage(){
            return this.$store.state.consumption.currentPage;
        }
        columns=[{
            title:this.L('CustomerName'),
            key:'customerName',
            fixed:"left",
            width:"80px"
        },{
            title:this.L('SerialNumber'),
            key:'serialNumber',
            fixed:"left",
            width:"110px"
        },{
            title:this.L('CellPhone'),
            key:'cellPhone',
            fixed:"left",
            width:"100px"
        },{
            title:this.L('ActulyPayed'),
            key:'actulyPayed',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.actulyPayed.toFixed(2))
            },
            width:"90px"
        },{
            title:this.L('KeepAccountDiffs'),
            key:'keepAccountDiffs',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.keepAccountDiffs.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('PayedByCashie'),
            key:'payedByCashie',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.payedByCashie.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('PayedByAccount'),
            key:'payedByAccount',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.payedByAccount.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('MemberCard'),
            key:'memberCard',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.memberCard.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('PayedByChainMembercard'),
            key:'payedByChainMembercard',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.payedByChainMembercard.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('KeepAccount'),
            key:'keepAccount',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.keepAccount.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('PayedByCard'),
            key:'payedByCard',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.payedByCard.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('PayedByCard1'),
            key:'payedByCard1',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.payedByCard1.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('Alipay'),
            key:'alipay',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.alipay.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('Wechat'),
            key:'wechat',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.wechat.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('PayedByCard3'),
            key:'payedByCard3',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.payedByCard3.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('PayedByCard2'),
            key:'payedByCard2',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.payedByCard2.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('PayedByPress'),
            key:'payedByPress',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.payedByPress.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('JDPay'),
            key:'jdPay',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.jdPay.toFixed(2))
            },
            width:"88px"
        },{
            title:this.L('SellerName'),
            key:'sellerName', 
            width:"88px"
        },{
            title:this.L('PayedDate'),
            key:'payedDate',
            render:(h:any,params:any)=>{
                return h("span",(this as any).$moment(params.row.payedDate).format("YYYY-MM-DD HH:mm"))
            },
            width:"130px"
        },{
            title:this.L('PaymentDetailsStatus'),
            key:'paymentStatus',
            render:(h:any,params:any)=>{
               if(params.row.paymentStatus==5)
                return h("span","已退单")
                else
                return h("span","已支付")
            },
            width:"70px",
             fixed:"right"
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:80,
            fixed:"right",
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on:{
                            click:()=>{
                                this.detailObj = {
                                    paymengId: params.row.id,
                                    orgId: params.row.orgId
                                }  
                                this.detail(this.detailObj);
                                this.modalShow(params.row)
                            }
                        }
                    },this.L('Details'))
                ])
            }
        }]
        async created(){
            this.pagerequest.sellerId = -1;
            let orgid = Util.abp.multiTenancy.getTenantOrgIdCookie()
            console.log("11",orgid)
            if(orgid){
            this.GetSellersAll(orgid)
            }else{
                await this.$store.dispatch({
                type:'consumption/GetPcliment'
            })
            }
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