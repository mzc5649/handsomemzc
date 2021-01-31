<template>
    <div class="reply-comment">
        <div class="reply-face">
            <vs-avatar circle size="24">
                <img :src="data.user.uIcon" alt="" style="width: 100%;height: 100%">
            </vs-avatar>
        </div>
        <div class="reply-con">
            <div class="user">
                {{data.user.uUsername}}
                <span class="text-con">{{data.artCmtContent}}</span>
            </div>
            <div class="info">
                <span class="time">{{data.artCmtCreatedTime}}</span>
                <vs-button size="small" @click="openReply($event,data.artCmtId)" class="reply-btn" shadow> 回复</vs-button>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleCommentReplyItem",
        props: {
            data: {
                type: Object,
                default: function () {
                    return {
                        artCmtContent: '',
                        artCmtCreatedTime: '',
                        artCmtId: '',
                        artCmtLike: '',
                        artCmtModifiedTime: '',
                        artCmtParent: '',
                        artCmtRoot: '',
                        artCmtStatus: '',
                        artId: '',
                        replies: [],
                        user: {
                            uCover: '',
                            uIcon: '',
                            uId: '',
                            uRegTime: '',
                            uSex: '',
                            uSign: '',
                            uState: '',
                            uUsername: '',
                        },
                        userId: 0,
                    }
                }
            }
        },
        methods:{
            openReply(e,id){
                this.$emit('openReply2',e,id)
            }
        }
    }
</script>

<style scoped lang="scss">
    .reply-comment {
        padding: 10px 0;

        .reply-face {
            display: inline-block;
            margin-right: 10px;
            position: relative;
            vertical-align: top;
        }

        .reply-con {
            display: inline-block;
            position: relative;
            color: var(--primary-color);
            width: calc(100% - 34px);

            .user {
                font-size: 12px;
                font-weight: bold;
                line-height: 18px;
                padding-bottom: 4px;
                display: block;
                position: relative;
                word-wrap: break-word;

                .text-con {
                    margin-left: 5px;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 20px;
                    white-space: pre-wrap;

                }
            }

            .info {
                color: #99a2aa;
                line-height: 26px;
                font-size: 12px;

                .reply-btn {
                    color: #99a2aa;
                    display: inline-block;
                }
            }
        }

    }
</style>
