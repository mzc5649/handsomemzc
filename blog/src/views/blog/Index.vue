<template>
  <div class="index">
    <vs-row>
      <vs-col :lg="8" :md="8" :sm="12" :xs="12">
          <div ref="articleList">
            <div v-if="articleLoading">
              <v-skeleton-loader type="card" class="mb-6" />
              <v-skeleton-loader type="card" class="mb-6" />
            </div>
            <ArticleList
              v-else
              :articleStore="articleStore"
              @loadData="loadData"
            ></ArticleList>
          </div>
      </vs-col>
      <v-col :lg="4" :md="4" :sm="12" :xs="12">
        <ArticleSortList @toArticleSort="toArticleSort"></ArticleSortList>
      </v-col>
    </vs-row>
  </div>
</template>

<script>
import { getArticleData } from "@/api/article";
import ArticleList from "@/components/article/ArticleList";
import ArticleSortList from "../../components/ArticleSortList";

export default {
  name: "Index",
  components: { ArticleSortList, ArticleList },
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
    const that = this;
    await this.getArticleData();
  },
  async mounted() {},
  methods: {
    // 加载更多
    async loadData(data) {
      const that = this;
      if (
        that.articleStore.currentPage * that.articleStore.pageSize <
        that.articleStore.total
      ) {
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
      getArticleData(params).then(function(res) {
        that.articleLoading = false;
        that.articleStore.list = that.articleStore.list.concat(
          res.data.recordList
        );
        that.articleStore.total = res.data.recordCount;
      });
    },
    toArticleSort(id) {
      this.$router.push({
        name: "ArticleSort",
        params: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
  .text{
  color: var(--theme-text,#2C3E50);
  }
</style>
