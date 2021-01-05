<template>
  <div class="index">
    <vs-row justify="center">
      <vs-col :lg="3" :md="3" :sm="0" :xs="0" v-if="device !== 'mobile'">
        <LeftSide></LeftSide>
      </vs-col>
      <vs-col :lg="6" :md="6" :sm="12" :xs="12">
          <div ref="articleList">
            <ArticleList
              :articleStore="articleStore"
              @loadData="loadData"
            ></ArticleList>
          </div>
      </vs-col>
      <vs-col :lg="3" :md="3" :sm="12" :xs="12">
        <ArticleSortList @toArticleSort="toArticleSort"></ArticleSortList>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { getArticleData } from "@/api/article";
import ArticleList from "@/components/article/ArticleList";
import ArticleSortList from "../../components/ArticleSortList";
import LeftSide from "../../components/LeftSide";

export default {
  name: "Index",
  components: {LeftSide, ArticleSortList, ArticleList },
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
    await this.getArticleData();
  },
  computed:{
    device() {
      return this.$store.state.app.device;
    },
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
