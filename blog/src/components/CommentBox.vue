<template>
    <div>
        <CommentEditor @handlerUnReply="handlerUnReply" @send="handlerSend" :loading="sendBtnLoading"
                       :reply="reply"></CommentEditor>
        <v-card tile elevation="0">
            <template v-for="(item,index) in comments">
                <v-divider color="white"></v-divider>
                <CommentItem :key="index" :comment="item" @reply="handlerReply"></CommentItem>
            </template>
        </v-card>
    </div>

</template>

<script>
    import CommentEditor from "./CommentEditor";
    import {mapState, mapActions, mapMutations} from 'vuex'
    import axios from 'axios'
    import CommentItem from "./CommentItem";

    export default {
        name: "CommentBox",
        components: {CommentItem, CommentEditor},
        props: {
            comments: {
                type: Array
            }
        },
        data() {
            return {
                sendBtnLoading: false,
                reply: null,
                replyType: null,
            }
        },
        computed: {
            ...mapState(["user", "token"])
        },
        methods: {
            ...mapMutations(["SET_LOGIN_OR_REGISTER_DIALOG"]),
            ...mapActions(["serverInit"]),
            handlerSend(content) {
                let that = this;
                that.sendBtnLoading = true;
                //回复
                if (that.reply == null) {
                    const data = {
                        uId: that.user.uId,
                        mContent: content
                    }
                    axios.post('/blog/msg', data, {
                        headers: {
                            token: that.token
                        }
                    }).then(function (res) {
                        that.sendBtnLoading = false;
                        that.serverInit(that);
                        if (res.data.code == 0) {
                            alert("success")

                        } else {
                            alert("发表失败")
                        }

                    }).catch(function (error) {
                        that.sendBtnLoading = false;
                        if (error.response.code == 401) {
                            alert("用户失效，请重新登录")
                            that.SET_LOGIN_OR_REGISTER_DIALOG();
                        }
                    })
                } else {
                    const data = {};
                    //回复评论
                    if (that.replyType == 1) {
                        data.mId = that.reply.mId;
                        data.mrContent = content;
                        data.fromUid = that.user.uId;
                        data.toUid = that.reply.user.uId
                    } else if (that.replyType == 2) {
                        data.mId = that.reply.mId;
                        data.mrContent = content;
                        data.fromUid = that.user.uId;
                        data.toUid = that.reply.fromUid;
                    }
                    axios.post('/blog/msgr', data, {
                        headers: {
                            token: that.token
                        }
                    }).then(function (res) {
                        that.sendBtnLoading = false;
                        that.serverInit(that);
                        if (res.data.code == 0) {
                            alert("回复成功")
                        } else {
                            alert("回复失败")
                        }
                    }).catch(function (error) {
                        that.sendBtnLoading = false;
                        if (error.response.code == 401) {
                            alert("用户失效，请重新登录")
                            that.SET_LOGIN_OR_REGISTER_DIALOG();
                        }
                    })
                }

            },
            handlerReply(comment, type) {
                let that = this;
                that.reply = comment
                that.replyType = type;
            },
            handlerUnReply() {
                let that = this;
                that.reply = null;


            }
        }
    }
</script>

<style scoped>

</style>
