<template>
    <div>
        <Card dis-hover:true>
            <Row style="margin:0 auto;">
                <Col span="24">
                <Form :label-width="80" inline>
                    <Row :gutter="16">
                        <Col span="5">
                        <FormItem class="ItemVerticalCenter" label="机构Id">
                            <Input placeholder="请输入机构Id"></Input>
                        </FormItem>
                        </Col>
                        <Col span="2">
                        <Button icon="ios-search" type="primary" class="toolbar-btn" @click="serch">查询</Button>
                        </Col>
                        <Col span="2">
                        <Button icon="md-checkmark" type="primary" class="toolbar-btn" v-if="show" @click="doit">确定</Button>
                        </Col>
                    </Row>
                </Form>
                </Col>
            </Row>
        </Card>

        <Card dis-hover:true class="Content">
            <Row>
                <Col span="24">
                <!-- <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border ref="cleanTable"
                    :data="list" draggable stripe @on-selection-change="TableChange">
                </Table>
                <Page show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange"
                    @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page> -->
                </Col>
            </Row>


        </Card>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator'
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import ViewUI from 'view-design'

    @Component({})
    export default class psysList extends AbpBase {
        show: Boolean = false
        dataList: any = []
        async created() {

        };
        async serch() {
            this.show = true
        }

        async doit() {
            this.$Modal.confirm({
                // title: this.L('Tips'),
                // content: this.L('DeleteUserConfirm'),
                title:"提示",
                content:"确认执行吗?",
                okText: this.L('Yes'),
                cancelText: this.L('No'),
                onOk: async () => {
                    // await this.$store.dispatch({
                    //     type: 'user/delete',
                    //     data: params.row
                    // })
                    // await this.getpage();
                    this.show=false
                    console.log("yes success")
                }
            })
        }

        columns = [
            {
                type: 'selection',
                width: 40,
                key: 'id',
                tooltip: true,
                fixed: 'left',
                align: 'center',
            },
            {
                title: this.L('itemCode'),
                key: 'itemCode',
                tooltip: true,
                fixed: 'left',
                resizable: true,
                width: 120,
            }
        ]
    }
</script>

<style scoped>
    .Content {
        margin-top: 10px;
    }

    /* 垂直自适应居中 */
    .ItemVerticalCenter {
        margin-top: auto;
        margin-bottom: auto;
    }
</style>