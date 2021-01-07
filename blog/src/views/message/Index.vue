<template>
    <div class="index">
<!--        <v-container>-->
<!--            <MessageList :comments="comments"></MessageList>-->
<!--            <div ref="commentList">-->
<!--                <CommentBox :message-loading="messageLoading" :comments="comments"></CommentBox>-->
<!--            </div>-->
<!--            <v-pagination-->
<!--                    :length="page.pageTotal"-->
<!--                    :value="page.currentPage"-->
<!--                    @input="pageChange"-->
<!--            >-->
<!--            </v-pagination>-->
<!--        </v-container>-->
    </div>

</template>

<script>
    import CommentBox from "../../components/CommentBox";
    import {getMessageData} from '@/api/message'
    import MessageList from "../../components/MessageList";

    export default {
        name: "Index",
        components: {MessageList, CommentBox},
        data() {
            return {
                color: 'danger',
                comments: null,
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    pageTotal: 0,
                    total: 0
                },
                messageLoading: true
            }
        },
        created() {
            let that = this;

        },
        mounted() {
            this.getMessageData();
            this.$nextTick(function () {

            })
        },
        methods: {
            pageChange(index) {
                let that = this;
                that.page.currentPage = index;
                that.getMessageData();
            },
            getMessageData() {
                let that = this;
                const params = {
                    currentPage: that.page.currentPage,
                    pageSize: that.page.pageSize
                }
                getMessageData(params).then(function (res) {
                    that.messageLoading = false;
                    that.comments = res.data.recordList
                    that.page.pageTotal = res.data.pageTotal;
                    that.page.total = res.data.recordCount;
                })
            }

        }
    }
</script>

<style scoped>

</style>
<style>
    .vs-alert__content {
        min-height: 0px !important;
    }
</style>
