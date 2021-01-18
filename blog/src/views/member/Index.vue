<template>
    <div class="member-center">
        <div v-if="user">
            <div id="author">
                <div class="mask-wrapper" :style="'background-image: url('+user.uCover+')'"></div>
                <div class="user-panel">
                    <!--头像-->
                    <vs-avatar size="100" style="border: 2px white solid">
                        <img
                                :src="user.uIcon"
                        />
                    </vs-avatar>
                    <div class="user-panel-info">
                        <div>
                            <h1>
                                {{user.uUsername}}
                                <span class="info">No.{{user.uId}}</span>
                                <i class="fas fa-male info" v-if="user.uSex == 1"></i>
                                <i class="fas fa-female info" v-if="user.uSex == 2"></i>
                            </h1>
                            <p>{{user.uSign}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="author-table">
                <div class="author-table-left">
                    <template v-for="item in userSidebar">
                        <div class="user-sidebar">
                            <div class="user-sidebar-info">
                                <span>{{item.title}}</span>
                                <span> > </span>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="author-table-right">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapMutations} from 'vuex'
    import {getUserInfoById} from '../../api/user'

    export default {
        name: "Index",
        data() {
            return {
                user:'',
                userSidebar: [
                    {
                        title: '概览',
                    },
                    {
                        title: '设置',
                    }
                ]
            }

        },
        created() {
            getUserInfoById(this.$route.params.id).then(res => {

                this.user = res.data
            })

        },
        computed: {
            user1() {
                return this.$store.state.user
            }
        },
        methods: {
            ...mapMutations(['SET_LOGIN_OR_REGISTER_DIALOG'])
        }
    }
</script>

<style scoped lang="scss">
    .member-center {
        padding: 12px;
    }

    #author {
        box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 20px 0px;
        border-radius: 20px;
        background-color: var(--card-background-color);
    }

    .mask-wrapper {
        height: 0;
        width: 100%;
        position: relative;
        padding-bottom: 20%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .user-panel {
        position: relative;
        padding: 0 30px 30px 30px;
        margin-top: -30px;
        display: flex;
        color: var(--primary-color);

        .user-panel-info {
            padding: 30px 0 0 20px;

            h1 {
                margin: 0;

                .info {
                    margin-left: 10px;
                    font-size: 13px;
                    color: #A0A0A0;
                }
            }

            p {
                background-color: var(--background-color);
                padding: 4px 6px;
            }
        }
    }

    .author-table {
        margin-top: 20px;
        display: flex;

        .author-table-left {
            margin-right: 30px;
            width: 300px;
            background-color: var(--card-background-color);
            color: var(--primary-color);

            .user-sidebar {
                border-bottom: 1px solid var(--border-color);

                .user-sidebar-info {
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
    }
</style>
