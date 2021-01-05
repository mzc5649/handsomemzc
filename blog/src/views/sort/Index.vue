<template>
    <div class="index">
        <vs-row>
            <vs-col :lg="3" :md="3" :sm="0" :xs="0" v-if="device !== 'mobile'">
                <LeftSide></LeftSide>
            </vs-col>
            <vs-col :lg="6" :md="6" :sm="12" :xs="12">
                <ArticleList :articleStore="articleStore" @loadData="loadData"></ArticleList>
            </vs-col>
            <vs-col :lg="3" :md="3" :sm="12" :xs="12">
                <ArticleSortList :sortId="id" @toArticleSort="toArticleSort"></ArticleSortList>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import ArticleList from "@/components/article/ArticleList";
    import {getArticleDataBySort} from "@/api/sort"
    import ArticleSortList from "@/components/ArticleSortList";
    import LeftSide from "../../components/LeftSide";

    export default {
        name: "Index",
        components: {LeftSide, ArticleSortList, ArticleList},
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
        computed: {
            device() {
                return this.$store.state.app.device;
            },
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
