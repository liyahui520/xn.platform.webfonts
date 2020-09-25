<template>
    <div>
        <Modal
         :title="L('EditFY')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="fyForm"  label-position="top" :rules="FYRule" :model="fy"> 
                        <FormItem :label="L('OrgName')" prop="name">
                            <Input v-model="orglist.orgName" disabled ></Input>
                        </FormItem>
                        <FormItem :label="L('OrgId')" prop="displayName">
                            <Input v-model="orglist.id" disabled ></Input>
                        </FormItem>
                         <FormItem :label="L('mchnt_cd')" prop="description">
                            <Input v-model="fy.mchnt_cd" ></Input>
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
    import OrgList from '@/store/entities/orglist';
    import store from '../../../store';
import MerchnoEntity from '../../../store/entities/MerchnoEntity';
    @Component
    export default class EditOrgList extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        orglist:OrgList=new OrgList(); 
        fy={
            mchnt_cd:""
        }
        updateData={};
        save(){ 
            (this.$refs.fyForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    console.log(valid)
                }
            })
        }
        cancel(){
            (this.$refs.fyForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            console.log("value",this.$store.state.orglist.dataLists)
            if(!value){
                this.$emit('input',value);
            }else{
                this.orglist=Util.extend(true,{},this.$store.state.orglist.dataLists); 
                this.fy.mchnt_cd = this.orglist.merchnoEntity.mchnt_cd==undefined?"":this.orglist.merchnoEntity.mchnt_cd;
            }
        }
        FYRule={
            mchnt_cd:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('RoleName')),trigger: 'blur'}]
        }
        async created(){  
        }
    }
</script>

