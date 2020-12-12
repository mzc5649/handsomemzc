<template>
    <div class="pa-3">
        <div class="d-flex align-center">
            <div class="mr-2">
                <v-avatar size="36">
                    <v-img :src="comment.user.uIcon"></v-img>
                </v-avatar>
            </div>
            <div>
                <div>
                    <span class="body-2">{{comment.user.uUsername}}</span>
                    <span class="caption" v-if="comment.user.uId==user.uId">(我)</span>
                </div>
                <div class="caption text--secondary d-flex align-center">
                    {{comment.mCreatedTime}}
                    <v-btn color="primary" text x-small @click="handleReply(comment,1)">回复</v-btn>
                </div>
            </div>
        </div>
        <div>
            <div class="text--secondary body-2" v-html="comment.mContent">
            </div>
        </div>
        <div class="comment-reply">
            <div class="mt-3 pl-3 " ref="messageReplies">
                <template v-for="(item,index) in messageReplies">
                    <div :key="index" class="pa-3">
                        <div class="d-flex align-center">
                            <div class="mr-2">
                                <v-avatar size="36">
                                    <v-img :src="item.fromUser.uIcon"></v-img>
                                </v-avatar>
                            </div>
                            <div>
                                <div>
                                    <span class="body-2">
                                        {{item.fromUser.uUsername}}
                                        <span class="caption" v-if="item.fromUid==user.uId">(我)</span>
                                        <span v-if="item.toUid!=comment.user.uId">
                                        回复@{{item.toUser.uUsername}}
                                        </span>
                                    </span>
                                </div>
                                <div class="caption text--secondary d-flex align-center">
                                    {{item.mrCreatedTime}}
                                    <v-btn v-if="item.fromUid!=user.uId" color="primary" text x-small
                                           @click="handleReply(item,2)">回复
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                        <div class="text--secondary body-2" v-html="item.mrContent">
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div v-if="page.total>3&&!pagination" class="caption">
            共{{page.total}}条回复，<a @click="showMore">点击查看</a>
        </div>
        <div v-if="pagination" class="justify-start">
            <v-pagination
                    :length="page.pageTotal"
                    :value="page.currentPage"
                    @input="pageChange"
            >
            </v-pagination>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {Loading} from 'element-ui'
    import {getMessageOfReply} from '@/api/message'

    export default {
        name: "CommentItem",
        data() {
            return {
                pagination: false,
                page: {
                    currentPage: 1,
                    pageSize: 3,
                    pageTotal: 0,
                    total: 0
                },
                messageReplies: []
            }
        },
        props: {
            comment: {
                type: Object,
            }
        },
        created() {
            let that = this;
        },
        mounted() {
            this.getMessageReplyData();
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            handleReply(comment, type) {
                let that = this;
                comment.mId = that.comment.mId;
                this.$emit("reply", comment, type)
            },
            getMessageReplyData() {
                let that = this;
                const loading=Loading.service({
                    target:that.$refs['messageReplies'],
                    text:'努力加载评论中...'
                })
                const params = {
                    currentPage: that.page.currentPage,
                    pageSize: that.page.pageSize
                }
                getMessageOfReply(that.comment.mId, params).then(res => {
                    loading.close()
                    that.messageReplies = res.data.recordList;
                    that.page.total = res.data.recordCount;
                    that.page.pageTotal = res.data.pageTotal;
                })
            },
            async showMore() {
                let that = this;
                that.page.pageSize = 10;
                await that.getMessageReplyData();
                that.pagination = true;
            },
            async pageChange(index) {
                let that = this;
                that.page.currentPage = index;
                that.getMessageReplyData();

            }
        }
    }
</script>

<style scoped>

</style>
