<template>
    <div class="index">
            <vs-row>
                <vs-col :lg="8" :md="8" :sm="12" :xs="12">
                        <ArticleList  :articleStore="articleStore" @loadData="loadData"></ArticleList>
                </vs-col>
                <vs-col :lg="4" :md="4" :sm="12" :xs="12">
                    <ArticleSortList :sortId="id" @toArticleSort="toArticleSort"></ArticleSortList>
                </vs-col>
            </vs-row>
    </div>
</template>

<script>
    import ArticleList from "@/components/article/ArticleList";
    import {getArticleDataBySort} from "@/api/sort"
    import ArticleSortList from "@/components/ArticleSortList";

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
                id: 0,
                articleLoading: true
            }
        },
        created() {
            let that = this;
            that.id = that.$route.params.id.toString();
        },
        mounted() {
            this.getArticleData();
        },
        methods: {
            async loadData(data) {
                let that = this;
                if ((that.articleStore.currentPage - 1) * that.articleStore.pageSize < that.articleStore.total) {
                    data.articleLoading = true;
                    that.articleStore.currentPage += 1;
                    await that.getArticleData();
                    data.articleLoading = false;
                }
            },
            async getArticleData() {
                let that = this;
                const params = {
                    currentPage: that.articleStore.currentPage,
                    pageSize: that.articleStore.pageSize
                }
                getArticleDataBySort(that.id, params).then(function (res) {
                    that.articleLoading = false
                    that.articleStore.list = that.articleStore.list.concat(res.data.recordList);
                    that.articleStore.total = res.data.recordCount;
                })
            },
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
            toArticleSort(id) {
                this.id = id.toString()
                this.$router.push({
                    name: "ArticleSort",
                    params: {
                        id: id
                    }
                })
                this.initData()

            }
        }
    }
</script>

<style scoped>

</style>
