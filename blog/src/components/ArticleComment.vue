<template>
    <div id="article-comment" ref="articleComment" class="article-comment">
        <div class="head">
            <span class="result">{{recordCount}}</span>评论
        </div>
        <ArticleCommentSend :articleId="articleId" :list="recordList"></ArticleCommentSend>
        <div id="comment-list" class="comment-list">
            <template v-for="(item,index) in recordList">
                <ArticleCommentItem :key="item.artCmtId" :data="item"></ArticleCommentItem>
            </template>
            <div v-if="recordList.length == 0" class="no-more-comment">
                空空如也~
            </div>
        </div>
        <div class="page" v-if="recordCount > 1">
            <vs-pagination dark not-margin :dotted-number="10" v-model="page.currentPage" :length="pageTotal"/>
        </div>
        <div @click="emojiOut" v-if="emojiBoxShow" class="emoji-box" :style="emojiPos">
            <div class="emoji-title">
                {{currentEmojiPackage.text}}
            </div>
            <div class="emoji-wrap">
                <template v-for="item in currentEmojiPackage.emojiList">
                    <a :class="emojiClass"
                       :key="item.id"
                       class="emoji-list emoji-text"
                       :data-pid="currentEmojiPackage.id"
                       :data-id="item.id"
                       @click="selectEmoji(item.text)"
                    >
                        <img v-if="currentEmojiPackage.type == 1" :src="item.url" :title="item.text"/>
                        <template v-else>{{item.text}}</template>
                    </a>
                </template>
            </div>
            <div class="emoji-tabs">
                <div class="tab-container">
                    <template v-for="item in emojiPackageList">
                        <span class="tab-link" @click="changeEmojiPackage(item.id)"
                              :class="{active:currentEmojiPackageId==item.id}" :data-id="item.id">
                            <img :src="item.url" :title="item.text"/>
                        </span>
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {getArticleComment} from '../api/articleComment'
    import {getEmojiList} from '../api/emoji';
    import ArticleCommentItem from "./ArticleCommentItem";
    import ArticleCommentSend from "./ArticleCommentSend";

    export default {
        name: "ArticleComment",
        components: {ArticleCommentSend, ArticleCommentItem},
        props: ['articleId'],
        data() {
            return {
                isLoaded: false,
                recordList: [],
                recordCount: 0,
                pageTotal: 0,
                page: {
                    currentPage: 1,
                    pageSize: 10,
                },
                emojiPackageMap: [],
                emojiPackageList: [
                    {
                        id: '',
                        text: '',
                        url: '',
                        size: 1,
                        emojiList: [{
                            id: '',
                            text: '',
                            url: '',
                        }]
                    }
                ],
                currentEmojiPackageId: 1,
                currentEmojiPackage: {
                    id: '',
                    text: '',
                    url: '',
                    size: 1,
                    emojiList: [{
                        id: '',
                        text: '',
                        url: '',
                    }]
                },
                emojiClass: {}
            }
        },
        created() {


        },
        mounted() {

            this.$nextTick(() => {
                document.addEventListener('scroll', this.scroll)
                document.addEventListener('click', this.closeEmojiBox)
            })
        },
        watch: {
            pageIndex: function (val) {
                $("html, body").animate({
                    scrollTop: $("#article-comment").offset().top - 44
                }, {duration: 500, easing: "swing"});
                this.fetchData()
            },
            emojiBoxShow(data) {
                console.log('切换' + data)
                if (data) {

                }
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            pageIndex() {
                return this.page.currentPage
            },
            emojiPos() {
                return this.$store.state.app.emojiPos;
            },
            emojiBoxShow() {
                return this.$store.state.app.emojiBoxShow;
            }
        },
        methods: {
            fetchData() {
                const commentLoading = this.$vs.loading({
                    target: this.$refs.articleComment,
                    type: "points",
                    text: "加载中",
                    color: '#1E1E1E'
                });
                const data = {
                    aid: this.articleId,
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize
                }
                getArticleComment(data).then(res => {
                    this.recordList = res.data.recordList;
                    this.pageTotal = res.data.pageTotal;
                    this.recordCount = res.data.recordCount;
                    commentLoading.close()
                })
            },
            fetchEmojiData() {
                getEmojiList().then(res => {
                    const map = new Map();
                    //当前emojiPackage id
                    this.currentEmojiPackageId = 1
                    //emoji map
                    this.emojiPackageList = res.data
                    res.data.forEach(e => {
                        map.set(e.id, e);
                    })
                    this.emojiPackageMap = map;
                    //当前 emoji package
                    this.currentEmojiPackage = res.data[0]
                    // class
                    this.emojiClass = {
                        'emoji-pic': this.currentEmojiPackage.type == 1,
                        "emoji-small": this.currentEmojiPackage.size == 1 && this.currentEmojiPackage.type == 1,
                        'emoji-default': this.currentEmojiPackage.type == 2,
                    }
                })
            },
            /*关闭表情窗口*/
            closeEmojiBox(){
                this.$store.commit('app/TOGGLE_EMOJIBOXSHOW', false)
            },
            //点击表情窗口阻止消失
            emojiOut(e) {
                e.stopPropagation()
            },
            //切换表情按钮
            changeEmojiPackage(id) {
                this.currentEmojiPackageId = id
                this.currentEmojiPackage = this.emojiPackageMap.get(id)
                // class
                this.emojiClass = {
                    'emoji-pic': this.currentEmojiPackage.type == 1,
                    "emoji-small": this.currentEmojiPackage.size == 1 && this.currentEmojiPackage.type == 1,
                    'emoji-default': this.currentEmojiPackage.type == 2,
                }
            },
            //选择表情
            selectEmoji(text) {
                this.$store.state.app.commentContent.focus()
                const end = this.$store.state.app.commentContent.selectionEnd
                this.$store.state.app.commentContent.value =
                    this.$store.state.app.commentContent.value.substr(0, end) +
                    text +
                    this.$store.state.app.commentContent.value.substr(end)
                this.$store.state.app.commentContent.selectionEnd = end + text.length
            },
            scroll() {
                const rect = document.getElementById('article-comment').getBoundingClientRect()
                const isShow = rect.top < window.innerHeight
                if(isShow && !this.isLoaded){
                    this.isLoaded = true
                    this.fetchData()
                    this.fetchEmojiData()
                }

            }
        },
        destroyed() {
            document.removeEventListener('scroll', this.scroll)
            document.removeEventListener('click', this.closeEmojiBox)
        }
    }
</script>

<style scoped lang="scss">
    .article-comment {
        position: relative;
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 20px;
        border: 1px solid var(--border-color);
    }

    .head {
        font-size: 18px;
        margin-bottom: 20px;
        color: var(--primary-color);

        .result {
            margin-right: 10px;
        }
    }


    .comment-list {
        padding-top: 20px;

        .no-more-comment {
            color: #99a2aa;
            text-align: center;
            padding: 30px 0;
            font-size: 12px;
        }
    }


    .page {
        margin: 20px 0;
    }

    .emoji-box {
        max-width: 370px;
        box-shadow: 0 11px 12px 0 rgba(106, 115, 133, 0.3);
        border-radius: 8px;
        position: absolute;
        background-color: var(--card-background-color);
        z-index: 2;
        font-size: 12px;

        .emoji-title {
            line-height: 16px;
            margin: 13px 15px 0;
            color: #757575;
        }

        .emoji-wrap {
            margin: 6px 11px 0 11px;
            max-height: 196px;
            font-size: 10px;
            overflow: auto;
            word-break: break-word;

            img {
                margin: 4px;
                width: 56px;
                height: 56px;
            }


            .emoji-default {
                font-size: 12px;
                line-height: 22px;
            }

            .emoji-text {
                color: #111;
                border-radius: 4px;
                transition: background 0.2s;
                display: inline-block;
                padding: 3px 5px;
                margin: 2px 3px;
                outline: 0;
                text-decoration: none;
                cursor: pointer;

                &:hover {
                    background-color: #ddd;
                }
            }

            .emoji-pic {
                margin: 0;
                padding: 0;
                font-size: 0;
            }

            .emoji-small {
                img {
                    margin: 4px;
                    width: 24px;
                    height: 24px;
                }

            }

        }

        .emoji-tabs {
            position: relative;
            height: 36px;
            overflow: hidden;
            background-color: #f4f4f4;
            border-radius: 0 0 4px 4px;

            .tab-container {
                width: 100%;
                height: 100%;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
                display: flex;

                .active {
                    background-color: white;
                }

                .tab-link {
                    padding: 7px 18px;
                    max-width: 22px;
                    max-height: 22px;
                    transition: background 0.2s;
                    cursor: pointer;

                    img {
                        max-width: 22px;
                        max-height: 22px;
                    }
                }

                .tab-link:hover {
                    background-color: #e7e7e7;
                }


            }

        }
    }

</style>
