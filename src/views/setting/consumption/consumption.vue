<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="90" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" :placeholder="L('UserName')+'/'+L('Name')"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('IsActive')+':'" style="width:100%">
                                <Select :placeholder="L('Select')" >
                                    <Option value="All">{{L('All')}}</Option>
                                    <Option value="Actived">{{L('Actived')}}</Option>
                                    <Option value="NoActive">{{L('NoActive')}}</Option>
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
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
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
        <add-consumption v-model="createModalShow"  @save-success="getpage"></add-consumption>
        <edit-consumption v-model="editModalShow"  @save-success="getpage"></edit-consumption>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import AddConsumption from './add_consumption.vue'
    import EditConsumption from './edit_consumption.vue'
   
    class PageConsumptionRequest extends PageRequest{
        keyword: string = '';
        pPetName: string = '';
        staDateTime: string = '';
        endDateTime: string = '';
        cityList: Array = []
    }
    
    @Component({
        components:{AddConsumption,EditConsumption}
    })
    export default class Consumptions extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
        creationTime:Date[]=[];
        pagerequest:PageConsumptionRequest=new PageConsumptionRequest();

        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            return this.$store.state.consumption.list;
        };
        get loading(){
            return this.$store.state.consumption.loading;
        }
        create(){
            this.createModalShow=true;
        }
        pageChange(page:number){
            this.$store.commit('consumption/setCurrentPage',page);
            this.getpage();
        }
        pagesizeChange(pagesize:number){
            this.$store.commit('consumption/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            
            this.pagerequest.pageSize = this.pageSize
            this.pagerequest.pageIndex = (this.currentPage-1)*this.pageSize
            if (this.creationTime.length>0) {
                this.pagerequest.staDateTime=this.creationTime[0];
            }
            if (this.creationTime.length>1) {
                this.pagerequest.endDateTime=this.creationTime[1];
            }
            this.pagerequest.orgId = 0
            this.pagerequest.sellerId = -1
            this.pagerequest.customerNameOrPhone = this.customerNameOrPhone
            this.pagerequest.pPetName = this.pPetName
            
            await this.$store.dispatch({
                type:'consumption/getAll',
                data:this.pagerequest
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
            title:this.L('OrgName'),
            key:'name'
        },{
            title:this.L('DisplayName'),
            key:'displayName'
        },{
            title:this.L('Description'),
            key:'description'
        },{
            title:this.L('IsStatic'),
            render:(h:any,params:any)=>{
                return h('span',params.row.isStatic?this.L('Yes'):this.L('No'))
            }
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
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
                                this.$store.commit('consumption/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit')),
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small'
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                        title:this.L('Tips'),
                                        content:this.L('DeleteConsumptionsConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'consumption/delete',
                                                data:params.row
                                            })
                                            await this.getpage();
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
        async created(){
            this.getpage();
            // await this.$store.dispatch({
            //     type:'consumption/getAllPermissions'
            // })
        }
    }
</script>