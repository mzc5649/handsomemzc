<template>
    <div>
        <v-container fluid class="py-0">
            <div class="title">
                分类标签
            </div>

            <div v-if="loading" style="display: flex;flex-wrap: wrap">
                <v-skeleton-loader
                        class="ma-2"
                        type="chip">
                </v-skeleton-loader>
                <v-skeleton-loader
                        class="ma-2"
                        type="chip">
                </v-skeleton-loader>
                <v-skeleton-loader
                        class="ma-2"
                        type="chip">
                </v-skeleton-loader>
                <v-skeleton-loader
                        class="ma-2"
                        type="chip">
                </v-skeleton-loader>
                <v-skeleton-loader
                        class="ma-2"
                        type="chip">
                </v-skeleton-loader>
                <v-skeleton-loader
                        class="ma-2"
                        type="chip">
                </v-skeleton-loader>
            </div>
            <template v-else v-for="item in articleSortData">
                <v-chip :key="item.sortId"
                        class="ma-2"
                        :color="sortId==item.sortId ? 'primary' : 'default'"
                        @click="toArticleSort(item.sortId)"
                        :disabled="sortId==item.sortId"
                >
                    {{item.sortName}}
                </v-chip>
            </template>
        </v-container>
    </div>
</template>

<script>
    import {getArticleSortTag} from "@/api/sort"

    export default {
        name: "ArticleSortList",
        props: {
            sortId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                articleSortData: '',
                loading: true
            }
        },
        created() {
            getArticleSortTag().then(res => {
                this.loading = false
                this.articleSortData = res.data
            })
        },
        methods: {
            toArticleSort(id) {
                this.$emit("toArticleSort", id)
            }
        }
    }
</script>

<style scoped>

</style>
