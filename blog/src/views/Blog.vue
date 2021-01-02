<template>
  <div>
    <vs-navbar
      padding-scroll
      fixed
      shadow
      v-model="active"
    >
      <template #left> handsomemzc</template>
      <vs-navbar-item :active="active == 'welcome'" to="/" id="welcome">
        Welcome
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'blog'" to="/blog/index" id="blog">
        博客
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'message'" to="/blog/msg" id="message">
        留言
      </vs-navbar-item>
      <template #right>
        <vs-tooltip v-if="dark" bottom>
          <vs-button icon shadow @click="handleChangeTheme">
            <i class="fa fa-sun-o"></i>
          </vs-button>
          <template #tooltip>
            日间模式
          </template>
        </vs-tooltip>
        <vs-tooltip v-else bottom>
          <vs-button icon shadow @click="handleChangeTheme">
            <i class="fa fa-moon-o"></i>
          </vs-button>
          <template #tooltip>
            夜间模式
          </template>
        </vs-tooltip>
        <vs-tooltip bottom v-if="!user">
          <vs-button icon shadow v-if="!user">
            <i class="fa fa-user-o" />
          </vs-button>
          <template slot="tooltip">
            登录
          </template>
        </vs-tooltip>
        <template v-else>
          <CurrentUser></CurrentUser>
        </template>
      </template>
    </vs-navbar>
    <div style="margin-top: 84px">
      <vs-row justify="center">
        <vs-col :lg="10" :md="10" :sm="12" :xs="12">
          <transition
            :duration="1000"
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
          >
            <router-view class="animate__animated animate__fadeIn" />
          </transition>
        </vs-col>
      </vs-row>
    </div>
    <!--        <v-footer app absolute padless>-->
    <!--            <Footer></Footer>-->
    <!--        </v-footer>-->
    <div id="aplayer" ref="aplayer" class="aplayer"></div>
    <div
      ref="audioLoading"
      v-if="!audios"
      style="position: fixed;z-index: 100;bottom: 0;left: 0;width: 84px;height: 66px;background-color: white"
    ></div>
    <!--        <LoginOrRegister></LoginOrRegister>-->
    <!--        <Snackbar/>-->
    <!--        <Navigation v-if="device === 'mobile'"></Navigation>-->
  </div>
</template>

<script>
import axios from "axios";
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";
import { mapMutations, mapState, mapActions } from "vuex";
import LoginOrRegister from "../components/LoginOrRegister";
import CurrentUser from "../components/CurrentUser";
import Snackbar from "@/components/Snackbar.vue";
import ResizeHandler from "../utils/mixins/ResizeHandler";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Music from "../api/music";

export default {
  name: "Blog",
  components: { Footer, Navigation, CurrentUser, LoginOrRegister, Snackbar },
  data() {
    return {
      active: "blog",
      isSideNavShow: false,
      audios: ""
    };
  },
  mixins: [ResizeHandler],
  created() {
    const that = this;
    that.serverInit(that);
  },
  mounted() {
    const that = this;
    const audioLoading = this.$vs.loading({
      target: this.$refs["audioLoading"],
      type: "square",
      // color: "#d5397b",
      text: "Loading..."
    });
    const h = new Date().getHours();
    const flag = (h >= 19 && h <= 24) || (h >= 0 && h <= 7);
    if (flag) {
      this.$store.dispatch("app/toggleDark", flag);
      if (!document.body.hasAttribute("vs-theme")) {
        document.body.setAttribute("vs-theme", "dark");
      }
      //通知
       that.$vs.notification({
        progress: 'auto',
        position: 'bottom-right',
        title: '夜间模式',
        text: '夜晚到了，已自动为您开启夜间模式，右上角可切换。'
      })

    }
    const music = new Music();
    music.getAplayerDataById({ id: "5197713080" }).then(res => {
      this.audios = res;
      const options = {
        container: document.getElementById("aplayer"),
        lrcType: 2,
        fixed: true,
        autoplay: false,
        listFolded: false,
        order: "list",
        preload: "auto",
        audio: this.audios
      };
      const ap = new APlayer(options);
    });
  },
  computed: {
    ...mapState(["user"]),
    device() {
      return this.$store.state.app.device;
    },
    dark() {
      return this.$store.state.app.dark;
    }
  },
  methods: {
    ...mapMutations(["SET_LOGIN_OR_REGISTER_DIALOG"]),
    ...mapActions(["serverInit"]),
    //改变主题
    handleChangeTheme() {
      if (!document.body.hasAttribute("vs-theme")) {
        document.body.setAttribute("vs-theme", "dark");
        this.$store.dispatch("app/toggleDark", true);
      } else {
        document.body.removeAttribute("vs-theme");
        this.$store.dispatch("app/toggleDark", false);
      }
      const aplayer = this.$refs.aplayer;
      if (this.$store.state.app.dark) {
        aplayer.style.background = "#151515";
        aplayer.getElementsByClassName("aplayer-body")[0].style.background =
          "#151515";
        document.documentElement.style.setProperty("--theme-background",'rgb(30, 32, 35)');
      } else {
        aplayer.style.background = "#fff";
        aplayer.getElementsByClassName("aplayer-body")[0].style.background =
          "#fff";
        document.documentElement.style.setProperty("--theme-background",'rgb(244, 244, 244)');
      }
    },
    openSideNav() {
      this.$store.dispatch("app/toggleSideNav", true);
    }
  }
};
</script>
<style lang="scss">
  :root{
    --theme-background:#f4f4f4;
    --theme-text:#2C3E50;

  }
#aplayer {
}

html {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

}
body{
  background-color: var(--theme-background,rgb(244, 244, 244));
}
::-webkit-scrollbar {
  width: 8px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #cbcbcb;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(187, 187, 187);
}

::-webkit-scrollbar-track-piece {
  background: #eee;
}
</style>
<style lang="scss" scoped></style>
