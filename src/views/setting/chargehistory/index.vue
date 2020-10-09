<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="90" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('OrgId')+':'" style="width:100%">
                                <Input v-model="pagerequest.CustomerName" :placeholder="L('OrgId')"/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('OrgName')+':'" style="width:100%">
                                <Input v-model="pagerequest.orgName" :placeholder="L('OrgName')"/>
                            </FormItem>
                        </Col>
                        <Col span="6">
                           <Button icon="ios-search" type="primary" size="large" @click="find" class="toolbar-btn">{{L('Find')}}</Button>
                        </Col>
                    </Row> 
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card> 
        <!-- <UpdateFY v-model="detailModalShow"  @save-success="getpage"></UpdateFY> -->
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import MyPageRequest from '@/store/entities/mypage-request' 
    class PageChargeHistoryRequest extends MyPageRequest{
        OrgId:number;
        CustomerName:string;
        CellPhone:string;
        CustomerID:number;
    }
    
    // @Component({ 
    //     components:{UpdateFY}
    // })
    export default class ChargeHistory extends AbpBase{ 
        detailModalShow:boolean=false;
        pagerequest:PageChargeHistoryRequest=new PageChargeHistoryRequest();

        get list(){
            return this.$store.state.chargehistory.list;
        };
        get loading(){
            return this.$store.state.chargehistory.loading;
        }
        pageChange(page:number){
            this.$store.commit('chargehistory/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('chargehistory/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            console.log("页面加载时是否会执行")
            this.pagerequest.pageSize=this.pageSize;
            this.pagerequest.pageIndex=this.currentPage;
            
            await this.$store.dispatch({
                type:'chargehistory/GetChargeHistoryAll',
                data:this.pagerequest
            })
        }
        async find(){ 
            console.log("此处是find方法")
             this.$store.commit('chargehistory/setCurrentPage',1);
            this.getpage();
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
            title:this.L('OrgId'),
            key:'id',
            width: 60,
            fixed:"left",
        },{
            title:this.L('OrgName'),
            key:'orgName',
            width: 150,
            fixed:"left",
        },{
            title:this.L('CellPhone'),
            key:'telephone',
            width: 100
        },{
            title:this.L('CustomerName'),
            key:'contactName',
            width: 100
        }]
        async update(){
            this.detailModalShow = true;
        };
         async created() {
          console.log("页面加载函数");
          this.find();
        };
    }
</script>