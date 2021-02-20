<template>
  <div>
    <Modal
      :title="L('ThridLogin')"
      :value="value"
      @on-ok="save"
      :mask-closable="false"
      draggable
      @on-visible-change="visibleChange"
    >
      <Form ref="loginModel" :rules="loginModelrules" :model="loginModel">
        <FormItem
          style="
  display: flex;
  display: -webkit-flex;
  align-items:center; 
  justify-content:center;"
        >
          <img
            src="../images/FskCtjBRVK_5EjSWlv4hgpSip478.png"
            style="text-align:center:width:180px"
          />
        </FormItem>
        <FormItem :label="L('ThirdName')" prop="loginName">
          <Input
            v-model="loginModel.loginName"
            :maxlength="32"
            :minlength="2"
          ></Input>
        </FormItem>
        <FormItem :label="L('ThirdPwd')" prop="loginPwd">
          <Input
            v-model="loginModel.loginPwd"
            :maxlength="32"
            :minlength="2"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{ L('Cancel') }}</Button>
        <Button @click="changeTenant" type="primary">{{ L('OK') }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop } from 'vue-property-decorator'
// import iView from 'iview';
import AbpBase from '../lib/abpbase'
@Component
export default class ThirdLogin extends AbpBase {
  @Prop({ type: Boolean, default: false }) value: boolean
  loginModel = {
    loginName: '',
    loginPwd: '',
    authProvider: 'XNMiniProgram',
  }
  async save() {
    ;(this.$refs.loginModel as any).validate(async (valid: boolean) => {
      console.log('valid', valid)
      if (valid) {
        this.$Message.loading({
          content: this.L('LoginPrompt'),
          duration: 10,
        })
        await this.$store.dispatch({
          type: 'app/ThirdLogin',
          data: this.loginModel,
        })
        this.$emit('save-success')
        this.$emit('input', false)
        // location.reload()
      }
    })
  }
  changeTenant() {
    ;(this.$refs.loginModel as any).validate(async (valid: boolean) => {
      console.log('valid', valid)
      if (valid) {
        this.$Message.loading({
          content: this.L('LoginPrompt'),
          duration: 10,
        })
        let aa = await this.$store.dispatch({
          type: 'app/ThirdLogin',
          data: this.loginModel,
        })
        this.$emit('save-success')
        this.$emit('input', false)
        location.reload()
      }
    })
  }
  cancel() {
    ;(this.$refs.loginModel as any).resetFields()
    this.$emit('input', false)
  }
  visibleChange(value: boolean) {
    if (!value) {
      this.$emit('input', value)
    }
  }
  loginModelrules = {
    loginName: [
      {
        required: true,
        message: this.L('FieldIsRequired', undefined, this.L('drugsName')),
        trigger: 'blur',
      },
    ],
    loginPwd: [
      {
        required: true,
        message: this.L('FieldIsRequired', undefined, this.L('drugsName')),
        trigger: 'blur',
      },
    ],
  }
  created() {}
}
</script>
