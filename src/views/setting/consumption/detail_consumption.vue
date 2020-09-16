<template>
    <div>
        <Modal
         :title="L('EditConsumption')"
         :value="value"
         @on-visible-change="visibleChange"
        >
            <Collapse v-for="item in detailList"  :value=" ''+ item.petId" >
                <Panel :name="''+item.petId">
                    {{item.petName}}
                    <p slot="content" v-for="val in item.cpaymentDetails" >
                        {{val}}
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

