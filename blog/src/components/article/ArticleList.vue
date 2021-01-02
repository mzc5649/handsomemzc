<template>
  <div class="ArticleList">
    <ArticleItem
      v-for="item in articleStore.list"
      :article="item"
      :key="item.artInfoId"
    ></ArticleItem>
    <v-btn
      v-if="hasMore"
      elevation="0"
      color="error"
      rounded
      :loading="articleLoading"
      @click="loadData"
      >加载更多
    </v-btn>
    <v-btn v-else disabled elevation="0" rounded>没有更多了</v-btn>
  </div>
</template>

<script>
import ArticleItem from "@/components/article/ArticleItem";

export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    articleStore: {
      required: true,
      type: Object,
      default() {
        return {
          list: [],
          total: 0,
          currentPage: 1,
          pageSize: 5
        };
      }
    }
  },
  data() {
    return {
      articleLoading: false
    };
  },
  methods: {
    loadData() {
      const that = this;
      this.$emit("loadData", that.$data);
    }
  },
  computed: {
    //加载更多按钮的显示计算
    hasMore() {
      const that = this;
      return (
        that.articleStore.currentPage * that.articleStore.pageSize <
        that.articleStore.total
      );
    }
  }
};
</script>

<style scoped></style>
