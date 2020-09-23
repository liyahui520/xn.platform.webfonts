<template>
    <div>
        <Modal
         :title="L('EditConsumption')"
         :value="value"
         @on-visible-change="visibleChange"
         :width="'70%'"
          
        >
            <Collapse v-for="item in detailList"  :value=" ''+ item.petId" :key="item.petId">
                <Panel :name="''+item.petId">
                   {{L('PetName')}}： {{item.petName}}
                     <p slot="content">  
                        <Table :columns="columns" 
                            
                            :size="'small'" :row-class-name="rowClassName" :loading="Detailloading" :no-data-text="L('NoDatas')" border :data="item.cpaymentDetails">
                    </Table>
                       <!-- <p class="df" >
                           <span>{{ val.feeItemName}}</span>
                           <span class="text-right">金额：¥{{val.amount}}   折扣：{{val.discountAmount}}</span>
                        </p>
                        <p class="df">
                            <span>数量</span>
					        <span class="text-right">X {{val.count}}</span>
                        </p> -->
                    </p>
                </Panel>
            </Collapse>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import Consumption from '../../../store/entities/consumption'
    @Component
    export default class EditConsumption extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        consumption:Consumption=new Consumption();
        cancel(){
            this.$emit('input',false);
        }
          get Detailloading(){
            return this.$store.state.consumption.Detailloading;
        };
        columns=[{
            title:this.L('FeeItemName'),
            key:'feeItemName',
            ellipsis:true,
            width:'162px'
        },{
            title:this.L('CategoryName'),
            key:'categoryName',
             ellipsis:true,
             width:'100px'
        },{
            title:this.L('Count'),
            key:'count',
            width:'62px'
        },{
            title:this.L('StoreUnitName'),
            key:'storeUnitName',
             ellipsis:true,
             width:'62px'
        },{
            title:this.L('Amount'),
            key:'amount',
            width:'62px',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.amount.toFixed(2))
            }
        },{
            title:this.L('CPD_MemberPrice'),
            key:'cpD_MemberPrice',
            width:'92px',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.cpD_MemberPrice.toFixed(2))
            }
        },{
            title:this.L('DetailTotalAmount'),
            key:'totalAmount',
            width:'92px',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.totalAmount.toFixed(2))
            }
        },{
            title:this.L('DetailDiscountAmount'),
            key:'discountAmount',
            width:'92px',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.discountAmount.toFixed(2))
            }
        },{
            title:this.L('ActlyPayed'),
            key:'actlyPayed',
            width:'92px',
            render:(h:any,params:any)=>{
                return h("span",'￥'+params.row.actlyPayed.toFixed(2))
            }
        },{
            title:this.L('ChargeDatetime'),
            key:'chargeDatetime',
            width:'162px',
            render:(h:any,params:any)=>{
                return h("span", (this as any).$moment(params.row.chargeDatetime).format("YYYY-MM-DD HH:mm"))
            }
        },{
            title:this.L('ReturnRemark'),
            key:'remark',
            width:'82px'
        },{
            title:this.L('DetailSellerName'),
            key:'sellerName',
            width:'92px'
        },{
            title:this.L('PaymentDetailsStatus'),
            key:'paymentDetailsStatus',
            render:(h:any,params:any)=>{
                if(params.row.paymentDetailsStatus==5)
                return h("span","已退单")
                else
                return h("span","已支付")
            }
        }]
        get detailList(){
            return this.$store.state.consumption.detailList;
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                this.consumption=Util.extend(true,{},this.$store.state.consumption.editConsumption);
            }
        }
        rowClassName(row, index){
            if(row.paymentDetailsStatus==5){
                return "demo-table-error-row"
            }
            return "";
        }
    }
</script>
<style scoped>
.df {
    display: flex;
}
.df span {
    flex: 1;
}
.text-right {
    text-align: right;
}

</style>

<style>
.ivu-table .demo-table-error-row td{
        background-color: #d5d5d5;
        color: red;
    }
</style>