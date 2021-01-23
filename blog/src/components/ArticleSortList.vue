<template>
    <div class="sort-list">
        <div style="padding: 12px" class="" >
            分类标签
        </div>
        <content-placeholders v-if="loading">
            <content-placeholders-heading></content-placeholders-heading>
            <content-placeholders-heading></content-placeholders-heading>
            <content-placeholders-img></content-placeholders-img>
        </content-placeholders>
        <div style="display:flex;" v-if="!loading">
            <template v-for="item in articleSortData">
                <vs-button :key="item.sortId"
                           dark
                           border
                           shadow
                           @click="toArticleSort(item.sortId)"
                           :disabled="sortId == item.sortId"
                >
                    {{item.sortName}}
                </vs-button>
            </template>
        </div>
        <svg  class="pie-chart "></svg>
    </div>
</template>

<script>
    import {getArticleSortTag} from "@/api/sort"
    export default {
        name: "ArticleSortList",
        props: {},
        data() {
            return {
                articleSortData: '',
                loading: true,
                sortId: 0

            }
        },
        computed:{
            device(){
                return this.$store.state.app.device;
            }
        },
        async created() {
            this.sortId = this.$route.params.id;
            
        },
        mounted() {
            this.$nextTick(() => {
                if(this.device=='desktop'){
                    getArticleSortTag().then(res => {
                        this.articleSortData = res.data
                        this.getChart()
                    })
                }

            })
        },
        methods: {
            //跳转分类
            toArticleSort(id) {
                this.sortId = id
                this.$router.push({
                    name: "ArticleCategory",
                    params: {
                        id: id
                    }
                })
            },
            getChart() {
                const svg = document.querySelector('.pie-chart');
                var chartData = {
                    title: '',
                    data: {
                        labels: [],
                        datasets: []
                    },
                    options: { // optional
                        innerRadius: 0.5,
                        legendPosition: chartXkcd.config.positionType.upLeft,
                    }
                };
                chartData.title = '';
                let labels = new Array();
                let datasets1 = {
                    data:[]
                };
                this.articleSortData.forEach(item => {
                    labels.push(item.sortName)
                    datasets1.data.push(item.sortNumber)
                })
                chartData.data.labels=labels;
                chartData.data.datasets.push(datasets1);
                const pieChart = new chartXkcd.Pie(svg, chartData);
                this.loading = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .sort-list {
        color: var(--primary-color);
        background-color: var(--card-background-color);
        border-radius: 20px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 20px 0px;
        margin-bottom: 10px;
        padding-bottom: 10px;
    }

    .pie-chart {
        width: 100%;
        background: var(--theme-card-bg) !important;

        text {
            color: var(--theme-text) !important;
        }
    }
</style>
