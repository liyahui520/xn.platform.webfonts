<template>
    <div>
        <Modal
         :title="L('CreateNewConsumption')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="consumptionForm"  label-position="top" :rules="consumptionRule" :model="consumption">
                <FormItem :label="L('CustomerName')" prop="customerName">
                    <Input v-model="consumption.customerName" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('SerialNumber')" prop="serialNumber">
                    <Input v-model="consumption.serialNumber" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('CellPhone')" prop="cellPhone">
                    <Input v-model="consumption.cellPhone" :maxlength="11"></Input>
                </FormItem>
                <FormItem :label="L('ActulyPayed')" prop="actulyPayed">
                    <Input v-model="consumption.actulyPayed"></Input>
                </FormItem>
                <FormItem :label="L('KeepAccountDiffs')" prop="keepAccountDiffs">
                    <Input v-model="consumption.keepAccountDiffs"></Input>
                </FormItem>
                <FormItem :label="L('payedByCashie')" prop="payedByCashie">
                    <Input v-model="consumption.payedByCashie"></Input>
                </FormItem>
                <FormItem :label="L('PayedByAccount')" prop="payedByAccount">
                    <Input v-model="consumption.payedByAccount"></Input>
                </FormItem>
                <FormItem :label="L('MemberCard')" prop="memberCard">
                    <Input v-model="consumption.memberCard"></Input>
                </FormItem>
                <FormItem :label="L('PayedByChainMembercard')" prop="payedByChainMembercard">
                    <Input v-model="consumption.payedByChainMembercard"></Input>
                </FormItem>
                <FormItem :label="L('KeepAccount')" prop="keepAccount">
                    <Input v-model="consumption.keepAccount"></Input>
                </FormItem>
                <FormItem label="POS" prop="payedByCard">
                    <Input v-model="consumption.payedByCard"></Input>
                </FormItem>
                <FormItem :label="L('PayedByCard1')" prop="PayedByCard1">
                    <Input v-model="consumption.payedByCard1"></Input>
                </FormItem>
                <FormItem :label="L('Alipay')" prop="alipay">
                    <Input v-model="consumption.alipay"></Input>
                </FormItem>
                <FormItem :label="L('Wechat')" prop="wechat">
                    <Input v-model="consumption.wechat"></Input>
                </FormItem>
                <FormItem :label="L('PayedByPress')" prop="payedByPress">
                    <Input v-model="consumption.payedByPress"></Input>
                </FormItem>
                <FormItem :label="L('PayedByCard2')" prop="payedByCard2">
                    <Input v-model="consumption.payedByCard2"></Input>
                </FormItem>
                <FormItem :label="L('PayedByCard3')" prop="payedByCard3">
                    <Input v-model="consumption.payedByCard3"></Input>
                </FormItem>
                <FormItem :label="L('JDPay')" prop="JDPay">
                    <Input v-model="consumption.JDPay"></Input>
                </FormItem>
                <FormItem :label="L('SellerName')" prop="sellerName">
                    <Input v-model="consumption.sellerName"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import Consumption from '@/store/entities/consumption';
    @Component
    export default class CreateConsumption extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        consumption:Consumption=new Consumption();
        get permissions(){
            return this.$store.state.consumption.permissions
        }
        save(){
            (this.$refs.consumptionForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    if(!this.consumption.grantedPermissions){
                        this.consumption.grantedPermissions=[];
                    }
                    await this.$store.dispatch({
                        type:'consumption/create',
                        data:this.consumption
                    });
                    (this.$refs.consumptionForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.consumptionForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
        }
        consumptionRule={
            name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('ConsumptionName')),trigger: 'blur'}],
            displayName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('DisplayName')),trigger: 'blur'}]
        }
    }
</script>

