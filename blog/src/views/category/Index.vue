<template>
    <div class="index">
        <vs-row>
            <vs-col :lg="9" :md="9" :sm="12" :xs="12">
                <div v-show="articleLoading" style="padding: 12px">
                    <template v-for="item in 3">
                        <content-placeholders style="margin-bottom: 30px">
                            <content-placeholders-img/>
                            <content-placeholders-heading/>
                            <content-placeholders-text :lines="3"/>
                        </content-placeholders>
                    </template>
                </div>
                <ArticleList v-show="!articleLoading" :articleStore="articleStore" @loadData="loadData"></ArticleList>
            </vs-col>
            <vs-col :lg="3" :md="3" :sm="12" :xs="12" v-if="device!='mobile'">
                <RightSide @toArticleSort="toArticleSort"></RightSide>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import ArticleList from "@/components/ArticleList";
    import {getArticleDataBySort} from "@/api/sort"
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
                id: 0,
                articleLoading: true
            }
        },
        created() {
            let that = this;
            that.id = that.$route.params.id;
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
            //加载更多
            async loadData(data) {
                let that = this;
                if ((that.articleStore.currentPage - 1) * that.articleStore.pageSize < that.articleStore.total) {
                    data.articleLoading = true;
                    that.articleStore.currentPage += 1;
                    await that.getArticleData();
                    data.articleLoading = false;
                }
            },
            //获取数据
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
            //跳转分类
            toArticleSort(id) {
                this.id = id.toString()
                this.$router.push({
                    name: "ArticleCategory",
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
