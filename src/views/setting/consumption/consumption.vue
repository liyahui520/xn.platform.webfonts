<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="90" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.pPetName" :placeholder="L('UserName')+'/'+L('Name')"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('sellerId')+':'" style="width:100%">
                                <Select :placeholder="L('Select')" @on-change="isActiveChange" clearable>
                                    <Option value="-1">{{L('All')}}</Option>
                                    <Option v-for="item in sellerList" :value="item.id">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('CreationTime')+':'" style="width:100%">
                                <DatePicker  v-model="creationTime" type="datetimerange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <detail-consumption v-model="detailModalShow"  @save-success="getpage"></detail-consumption>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import DetailConsumption from './detail_consumption.vue'
   
    class PageConsumptionRequest extends PageRequest{
        pPetName: string = '';
        staDateTime: Date;
        endDateTime: Date;
        pageSize: number;
        pageIndex: number;
        orgId: number;
        sellerId: number;
        customerNameOrPhone: string; 


    }
    
    @Component({
        components:{DetailConsumption}
    })
    export default class Consumptions extends AbpBase{
        detail(){
            this.detailModalShow=true;
        }
        creationTime:Date[]=[];
        pagerequest:PageConsumptionRequest=new PageConsumptionRequest();
        customerNameOrPhone: "";
        pPetName: "";
        detailModalShow:boolean=false;
        get list(){
            return this.$store.state.consumption.list;
        };
        get sellerList(){
            return this.$store.state.consumption.sellerList;
        };
        get loading(){
            return this.$store.state.consumption.loading;
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
            
            this.pagerequest.pageSize = this.pageSize
            this.pagerequest.pageIndex = this.currentPage;
            if (this.creationTime.length>0) {
                this.pagerequest.staDateTime=this.creationTime[0];
            }
            if (this.creationTime.length>1) {
                this.pagerequest.endDateTime=this.creationTime[1];
            }
            this.pagerequest.orgId = 0
            this.pagerequest.customerNameOrPhone = this.customerNameOrPhone
            
            await this.$store.dispatch({
                type:'consumption/getAll',
                data:this.pagerequest
            })
        }
        async GetSellersAll(){
            await this.$store.dispatch({
                type:'consumption/GetSellersAll'
            })
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
            key:'customerName'
        },{
            title:this.L('SerialNumber'),
            key:'serialNumber'
        },{
            title:this.L('CellPhone'),
            key:'cellPhone'
        },{
            title:this.L('ActulyPayed'),
            key:'actulyPayed'
        },{
            title:this.L('KeepAccountDiffs'),
            key:'keepAccountDiffs'
        },{
            title:this.L('PayedByCashie'),
            key:'payedByCashie'
        },{
            title:this.L('PayedByAccount'),
            key:'payedByAccount'
        },{
            title:this.L('MemberCard'),
            key:'memberCard'
        },{
            title:this.L('PayedByChainMembercard'),
            key:'payedByChainMembercard'
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:80,
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
                                this.$store.commit('consumption/detail',params.row);
                                this.detail();
                            }
                        }
                    },this.L('detail'))
                ])
            }
        }]
        async created(){
            this.GetSellersAll()
        }
    }
</script>