<template>
    <div class="member-center">
        <vs-row justify="center">
            <div id="author" class="magictime">
                <input type="file" id="uploadIcon" style="display: none" @change="uploadFileChange(1)">
                <input type="file" id="uploadCover" style="display: none" @change="uploadFileChange(2)">
                <div ref="cover" class="mask-wrapper" :style="'background-image: url('+user.uCover+')'">
                <span v-if="isSelf" class="change-cover-btn" @click="changeCoverHandler" title="修改封面">
                    <i class="fas fa-camera"></i>上传封面图片
                </span>
                </div>
                <div class="user-panel">
                    <!--头像-->
                    <vs-avatar ref="avatar" class="user-panel-icon" size="100" style="border: 2px white solid">
                        <img
                                :src="user.uIcon"
                                style="width: 100%;height: 100%"

                        />
                        <span v-if="isSelf" class="change-icon-btn" @click="changeIconHandler" title="修改头像">
                        <i class="fas fa-camera"></i>
                        <span>修改我的头像</span>
                    </span>
                    </vs-avatar>
                    <div class="user-panel-info">
                        <div>
                            <h1>
                                {{user.uUsername}}
                                <span class="info" :title="'本站第'+user.uId+'位用户'">No.{{user.uId}}</span>
                                <span class="info" title="男" v-if="user.uSex==1">
                                男
                            </span>
                                <span class="info" title="女" v-if="user.uSex==2">
                                女
                            </span>
                            </h1>
                            <p>{{user.uSign}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </vs-row>

        <div class="author-table">
            <vs-row justify="space-between">
                <vs-col :lg="3" :md="3" :sm="12" :xs="12">
                    <div class="author-table-left">
                        <template v-for="item in userSidebar">
                            <div class="user-sidebar" :class="{active:$route.name==item.to}"
                                 @click="jumpToSidebar(item.to)">
                                <div class="user-sidebar-info">
                                    <span>
                                        <i :class="item.icon"></i>
                                        {{item.title}}
                                    </span>
                                    <span v-if="device=='desktop'">
                                    <i class="fas fa-angle-right"></i>
                                    </span>
                                </div>
                            </div>
                        </template>
                        <div v-if="isSelf" class="user-sidebar">
                            <div class="user-sidebar-info"
                                 :class="{active:$route.name=='MemberSidebarSet'}"
                                 @click="jumpToSidebar('MemberSidebarSet')">
                        <span>
                            <i class="fas fa-cog"></i>
                            设置
                        </span>
                                <span v-if="device=='desktop'">
                                    <i class="fas fa-angle-right"></i>
                                </span>

                            </div>
                        </div>
                    </div>
                </vs-col>
                <vs-col :lg="9" :md="9" :sm="12" :xs="12">
                    <div class="author-table-right">
                        <transition
                                :duration="500"
                                name="custom-classes-transition"
                                enter-active-class="animate__animated animate__fadeIn"
                                leave-active-class="animate__animated animate__fadeOut"
                                mode="out-in"
                        >
                            <RouterView :userData="user"></RouterView>
                        </transition>
                    </div>
                </vs-col>
            </vs-row>
        </div>


    </div>

</template>

<script>
    import {mapMutations} from 'vuex'
    import {getUserInfoById, saveAvatar, saveCover} from '../../api/user'
    import {uploadFile} from '../../api/image'
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
                        show: false,
                        to: 'MemberSidebarIndex'
                    }
                ],
                uploadProgress: 0,
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
            },
            token() {
                return this.$store.state.token
            },
            device() {
                return this.$store.state.app.device
            }
        },
        filters: {
            getSexIcon(data) {
                return data == 1 ? "fa-male" : 'fa-female'
            }
        },
        methods: {
            ...mapMutations(['SET_LOGIN_OR_REGISTER_DIALOG']),
            changeIconHandler() {
                document.getElementById('uploadIcon').click()
            },
            changeCoverHandler() {
                document.getElementById('uploadCover').click()
            },
            uploadFileChange(type) {
                if (type != 1 && type != 2) return;
                const formData = new FormData();
                let img;
                if (type == 1) {
                    img = document.getElementById('uploadIcon').files[0]
                } else if (type == 2) {
                    img = document.getElementById('uploadCover').files[0]
                }
                if (img == null) return;
                formData.append('image', img)
                // loading
                const loading = this.$vs.loading({
                    target: type == 1 ? this.$refs['avatar'] : this.$refs['cover'],
                    scale: '1',
                    opacity: 1,
                })
                uploadFile(formData, this.token, e => {
                    const completeProgress = ((e.loaded / e.total * 100) | 0)
                    this.uploadProgress = completeProgress
                    loading.changePercent(`${this.uploadProgress}%`)
                }).then(res => {
                    const data = {
                        id: res.data.id,
                        url: res.data.url
                    }
                    if (type == 1) {
                        saveAvatar(data, this.token).then(res => {
                            this.currentUser.uIcon = res.data
                            this.user.uIcon = res.data
                            loading.close()
                        }).catch(err => {
                            loading.close()
                        })
                    } else if (type == 2) {
                        saveCover(data, this.token).then(res => {
                            this.currentUser.uCover = res.data
                            this.user.uCover = res.data
                            loading.close()
                        }).catch(err => {
                            loading.close()
                        })
                    }
                }).catch(err => {
                    loading.close()
                    if (type == 1) {
                        document.getElementById('uploadIcon').value = null
                    } else if (type == 2) {
                        document.getElementById('uploadCover').value = null
                    }
                })
            },
            jumpToSidebar(to) {
                this.$router.push({
                    name: to
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .member-center {
        padding: 12px;
    }

    #author {
        width: 100%;
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
            color: var(--primary-color);
            padding: 5px;
            border: 1px solid var(--primary-color);
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
        width: 100%;

        .author-table-left {
            background-color: var(--card-background-color);
            color: var(--primary-color);
            box-sizing: border-box;
            margin-right: 10px;

            .user-sidebar {
                border-bottom: 1px solid var(--border-color);
                cursor: pointer;

                .user-sidebar-info {
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }

        .author-table-right {
            border-radius: 20px;
            background-color: var(--card-background-color);
            color: var(--primary-color);
            padding: 20px;

        }
    }

    .active {
        color: rgba(26, 92, 255,0.5);
    }

    @media screen and (max-width: 900px) {
        .author-table-left {
            display: flex;
            margin-right: 0px !important;
            margin-bottom: 10px !important;
            .user-sidebar {
                width: 20%;
                border: 0 !important;
            }
        }

    }

</style>
