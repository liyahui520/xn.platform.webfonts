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
                        <Table :loading="loading" :columns="columns" stripe
                            :highlight-row="true"
                            :size="'small'" :no-data-text="L('NoDatas')" border :data="item.cpaymentDetails">
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
          get loading(){
            return this.$store.state.consumption.loading;
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
            width:'62px'
        },{
            title:this.L('CPD_MemberPrice'),
            key:'cpD_MemberPrice',
            width:'62px'
        },{
            title:this.L('DetailTotalAmount'),
            key:'totalAmount',
            width:'62px'
        },{
            title:this.L('DetailDiscountAmount'),
            key:'discountAmount',
            width:'62px'
        },{
            title:this.L('ActlyPayed'),
            key:'actlyPayed',
            width:'62px'
        },{
            title:this.L('ChargeDatetime'),
            key:'chargeDatetime',
            width:'162px'
        },{
            title:this.L('ReturnRemark'),
            key:'remark'
        },{
            title:this.L('DetailSellerName'),
            key:'sellerName',
            width:'162px'
        },{
            title:this.L('PaymentDetailsStatus'),
            key:'paymentDetailsStatus'
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

