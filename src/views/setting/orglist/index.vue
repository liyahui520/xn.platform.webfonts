<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="90" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="8">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.orgName" :placeholder="L('OrgName')"/>
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
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import MyPageRequest from '@/store/entities/mypage-request' 
   
    class PageOrgListRequest extends MyPageRequest{
        id:number;
        orgName:string;
    }
    
    @Component({ 
    })
    export default class OrgList extends AbpBase{ 

        pagerequest:PageOrgListRequest=new PageOrgListRequest();

        get list(){
            console.log("请求的数据为",this.$store.state.orglist.list)
            return this.$store.state.orglist.list;
        };
        get loading(){
            return this.$store.state.orglist.loading;
        }
        pageChange(page:number){
            this.$store.commit('orglist/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('orglist/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            
            this.pagerequest.pageSize=this.pageSize;
            this.pagerequest.pageIndex=this.currentPage;
            
            await this.$store.dispatch({
                type:'orglist/getAll',
                data:this.pagerequest
            })
        }
        get pageSize(){
            return this.$store.state.orglist.pageSize;
        }
        get totalCount(){
            console.log(this.$store.state.orglist.totalCount)
            return this.$store.state.orglist.totalCount;
        }
        get currentPage(){
            return this.$store.state.orglist.currentPage;
        }
        columns=[{
            title:this.L('OrgName'),
            key:'orgName'
        },{
            title:this.L('Telephone'),
            key:'telephone'
        },{
            title:this.L('ContactName'),
            key:'contactName'
        },{
            title:this.L('UserNumber'),
            key:'userNumber'
        },{
            title:this.L('Address'),
            key:'address'
        },{
            title:this.L('SerialNumber'),
            key:'serialNumber'
        },{
            title:this.L('SmsCount'),
            key:'smsCount'
        },{
            title:this.L('MainOrg'),
            key:'mainOrg',
            render:(h:any,params:any)=>{
                console.log("行数据为",params.row.mainOrg)
                return h("span",(params.row.mainOrg?"是":"否"))
            },
        }];
        async created() {
          console.log("页面加载函数");
          this.getpage();
        };
    }
</script>