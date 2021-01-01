<template>
    <div class="index">
        <v-container>
            <v-row>
                <v-col :md="8" :sm="12" :cols="12">
                    <v-container fluid class="py-0">
                        <div class="title">
                            全部文章
                        </div>
                        <div ref="articleList">
                            <div v-if="articleLoading">
                                <v-skeleton-loader
                                        type="card"
                                        class="mb-6"
                                />
                                <v-skeleton-loader
                                        type="card"
                                        class="mb-6"
                                />
                            </div>
                            <ArticleList v-else :articleStore="articleStore" @loadData="loadData"></ArticleList>
                        </div>
                    </v-container>
                </v-col>
                <v-col :md="4" :sm="12" :cols="12 ">
                    <ArticleSortList @toArticleSort="toArticleSort"></ArticleSortList>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
    import {getArticleData} from '@/api/article'
    import ArticleList from "@/components/article/ArticleList";
    import ArticleSortList from "../../components/ArticleSortList";

    export default {
        name: "Index",
        components: {ArticleSortList, ArticleList},
        data() {
            return {
                articleStore: {
                    list: [],
                    total: 0,
                    currentPage: 1,
                    pageSize: 5
                },
                articleLoading: true
            }
        },
        async created() {
            let that = this;
            await this.getArticleData();
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
                }
                getArticleData(params).then(function (res) {
                    that.articleLoading = false
                    that.articleStore.list = that.articleStore.list.concat(res.data.recordList);
                    that.articleStore.total = res.data.recordCount;
                })
            },
            toArticleSort(id) {
                this.$router.push({
                    name: "ArticleSort",
                    params: {
                        id: id
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
