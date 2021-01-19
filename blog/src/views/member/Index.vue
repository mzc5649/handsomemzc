<template>
    <div class="member-center">
        <div id="author" class="magictime">
            <input type="file" id="uploadFile" style="display: none" @change="uploadFileChange">
            <div class="mask-wrapper" :style="'background-image: url('+user.uCover+')'">
                <span v-if="isSelf" class="change-cover-btn">
                    <i class="fas fa-camera"></i>上传封面图片
                </span>
            </div>
            <div class="user-panel">
                <!--头像-->
                <vs-avatar class="user-panel-icon" size="100" style="border: 2px white solid">
                    <img
                            :src="user.uIcon"
                    />
                    <span v-if="isSelf" class="change-icon-btn" @click="changeIconHandler">
                        <i class="fas fa-camera"></i>
                        <span>修改我的头像</span>
                    </span>
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
                            <span>
                                <i :class="item.icon"></i>
                                {{item.title}}
                            </span>
                            <i class="fas fa-angle-right"></i>
                        </div>
                    </div>
                </template>
                <div v-if="isSelf" class="user-sidebar">
                    <div class="user-sidebar-info">
                        <span>
                            <i class="fas fa-cog"></i>
                            设置
                        </span>
                        <i class="fas fa-angle-right"></i>
                    </div>
                </div>
            </div>
            <div class="author-table-right">
                <router-view/>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapMutations} from 'vuex'
    import {getUserInfoById} from '../../api/user'
    import ScrollOut from "scroll-out";

    export default {
        name: "Index",
        data() {
            return {
                user: '',
                userSidebar: [
                    {
                        title: '概览',
                        icon: 'fas fa-address-card',
                        hidden: false
                    }
                ]
            }

        },
        created() {
            getUserInfoById(this.$route.params.id).then(res => {
                this.user = res.data
            })

        },
        mounted() {

        },
        computed: {
            currentUser() {
                return this.$store.state.user
            },
            isSelf() {
                return this.currentUser.uId == this.user.uId
            }
        },
        methods: {
            ...mapMutations(['SET_LOGIN_OR_REGISTER_DIALOG']),
            changeIconHandler() {
                document.getElementById('uploadFile').click()
            },
            uploadFileChange() {
                console.log(document.getElementById('uploadFile').files);
                const formData = new FormData();
                formData.append()
            }
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

        .change-cover-btn {
            position: absolute;
            right: 10px;
            top: 10px;
            color: white;
            padding: 5px;
            border: 1px solid white;
            border-radius: 10px;
            cursor: pointer;
        }
    }

    .user-panel {
        position: relative;
        padding: 0 30px 30px 30px;
        margin-top: -30px;
        display: flex;
        color: var(--primary-color);

        .user-panel-icon:hover .change-icon-btn {
            display: flex;
        }

        .change-icon-btn {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 35%;
            background-color: rgba(0, 0, 0, 0.5);
            font-size: 13px;
            cursor: pointer;
            display: none;
        }


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
