<template>
    <div class="index">
        <vs-row justify="center">
            <vs-col :lg="9" :md="9" :sm="12" :xs="12">
                <div ref="articleList">
                    <div v-show="articleLoading" style="padding: 12px">
                        <template v-for="item in 3">
                            <content-placeholders style="margin-bottom: 30px">
                                <content-placeholders-img/>
                                <content-placeholders-heading/>
                                <content-placeholders-text :lines="3"/>
                            </content-placeholders>
                        </template>
                    </div>
                    <ArticleList
                            v-show="!articleLoading"
                            :articleStore="articleStore"
                            @loadData="loadData"
                    ></ArticleList>
                </div>
            </vs-col>
            <vs-col :lg="3" :md="3" :sm="0" :xs="0" v-if="device=='desktop'">
                    <RightSide></RightSide>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import {getArticleData} from "@/api/article";
    import ArticleList from "@/components/ArticleList";
    import RightSide from "../../components/RightSide";

    export default {
        name: "Index",
        components: {RightSide, ArticleList},
        data() {
            return {
                articleStore: {
                    list: [],
                    total: 0,
                    currentPage: 1,
                    pageSize: 5
                },
                articleLoading: true
            };
        },
        async created() {
            await this.initData();
        },
        computed: {
            device() {
                return this.$store.state.app.device;
            },
        },
        async mounted() {
        },
        methods: {
            // 加载更多
            async loadData(data) {
                const that = this;
                if (that.articleStore.currentPage * that.articleStore.pageSize < that.articleStore.total) {
                    data.articleLoading = true;
                    that.articleStore.currentPage += 1;
                    await that.getArticleData();
                    data.articleLoading = false;
                }
            },
            // 获取数据
            async getArticleData() {
                const that = this;
                const params = {
                    currentPage: that.articleStore.currentPage,
                    pageSize: that.articleStore.pageSize
                };
                    getArticleData(params).then(function (res) {
                        that.articleLoading = false;
                        that.articleStore.list = that.articleStore.list.concat(
                            res.data.recordList
                        );
                        that.articleStore.total = res.data.recordCount;
                    });
            },
            //初始化数据
            initData() {
                this.articleStore = {
                    list: [],
                    total: 0,
                    currentPage: 1,
                    pageSize: 5
                }
                this.articleLoading = true
                this.getArticleData()
            },
        },
    };
</script>

<style scoped>
    .text {
        color: var(--primary-color);
    }
</style>
