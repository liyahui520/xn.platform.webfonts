<template>
    <div>
        <Modal
         title="消费记录详情"
         :value="value"
         @on-ok="save"
        >
            <Form ref="consumptionForm"  label-position="top" :rules="consumptionRule" :model="consumption">
                <Tabs value="detail">
                    <TabPane :label="L('ConsumptionDetails')" name="detail">
                        <FormItem :label="L('ConsumptionName')" prop="name">
                            <Input v-model="consumption.name" readonly></Input>
                        </FormItem>
                        <FormItem :label="L('DisplayName')" prop="displayName">
                            <Input v-model="consumption.displayName" readonly></Input>
                        </FormItem>
                        <FormItem :label="L('Description')" prop="description">
                            <Input v-model="consumption.description" readonly></Input>
                        </FormItem>
                      </TabPane>
                    <TabPane :label="L('ConsumptionPermission')" name="permission">
                        <CheckboxGroup v-model="consumption.grantedPermissions">
                            <Checkbox :label="permission.name" v-for="permission in permissions" :key="permission.name"><span>{{permission.displayName}}</span></Checkbox>
                        </CheckboxGroup>
                    </TabPane>
                </Tabs>
            </Form>
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
    import Consumption from '@/store/entities/consumption';
    @Component
    export default class DetailConsumption extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        consumption:Consumption=new Consumption();
        get permissions(){
            return this.$store.state.consumption.permissions
        }
        cancel(){
            (this.$refs.consumptionForm as any).resetFields();
            this.$emit('input',false);
        }
        consumptionRule={
            name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('ConsumptionName')),trigger: 'blur'}],
            displayName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('DisplayName')),trigger: 'blur'}]
        }
    }
</script>

