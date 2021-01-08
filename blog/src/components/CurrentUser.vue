<template>
    <div>
        <vs-tooltip border-thick shadow not-arrow bottom interactivity>
            <!--头像-->
            <vs-avatar circle size="36" style="border: 2px white solid">
                <img
                        v-if="user.uIcon"
                        :src="user.uIcon"
                />
                <span v-else style="">头像</span>
            </vs-avatar>
            <template #tooltip>
                <div class="content">
                    <div class="name" :title="user.uUsername">
                        {{user.uUsername}}
                    </div>
                    <div class="info">
                        <span style="margin-right: 10px">No.{{user.uId}}</span>
                        <i class="fas fa-male info" v-if="user.uSex == 1" title="男"></i>
                        <i class="fas fa-female info" v-if="user.uSex == 2" title="女"></i>
                    </div>
                    <vs-button shadow block>
                        <i class="fas fa-user"></i>
                        个人中心
                    </vs-button>
                    <vs-button block danger @click="openLogout">
                        <i class="fas fa-sign-out-alt"></i>
                        注销
                    </vs-button>
                </div>
            </template>
        </vs-tooltip>
        <vs-dialog v-model="logoutActive">
            <template #header>
                <h4>
                    确认注销吗？
                </h4>
            </template>
            <template #footer>
                <div style="display: flex">
                    <vs-button danger block @click="logout">确认</vs-button>
                    <vs-button shadow block @click="logoutActive = false">取消</vs-button>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>

<script>
    import {mapMutations, mapState, mapActions} from 'vuex';

    export default {
        name: "CurrentUser",
        data() {
            return {
                logoutActive: false
            }
        },
        computed: {
            ...mapState(["user"])
        },
        methods: {
            ...mapActions(["serverExit"]),
            openLogout(){
                this.logoutActive = true;
            },
            logout() {
                this.serverExit();
            }
        }
    }
</script>

<style scoped lang="scss">
    .content {
        max-width: 200px;
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .name {
            width: 100%;
            font-weight: 700;
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 10px 0;
        }

        .info {
            display: flex;
            justify-content: center;
        }
    }
</style>
