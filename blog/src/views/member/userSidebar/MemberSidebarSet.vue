<template>
    <div class="MemberSidebarSet" v-if="isSelf">
        <div class="user-info-item">
            <div class="edit-name">用户名：</div>
            <div class="edit-item" v-if="!setShow.name">
                {{userData.uUsername}}
                <span class="edit-button">
                    <span @click="setShow.name=true">
                         <i class="fas fa-edit"></i>编辑
                    </span>
                </span>
            </div>
            <div v-else>
                <div class="edit-input">
                    <ValidationProvider ref="nameValid" rules="required|user|userLength" v-slot="v">
                        <vs-input
                                :state="v.errors[0]?'danger':''"
                                label-placeholder="用户名可用作登录"
                                v-model="user.uUsername">
                            <template #message-danger>
                                {{v.errors[0]}}
                            </template>
                        </vs-input>
                    </ValidationProvider>
                </div>
                <div class="save-button">
                    <vs-button :loading="loading.name" @click="saveUname">保存</vs-button>
                    <vs-button shadow border @click="setShow.name=false">取消</vs-button>
                </div>
            </div>
        </div>
        <div class="user-info-item">
            <div class="edit-name">性别：</div>
            <div class="edit-item" v-if="!setShow.sex">
                {{userData.uSex | getSex}}
                <span class="edit-button">
                    <span @click="setShow.sex=true">
                         <i class="fas fa-edit"></i>编辑
                    </span>
                </span>
            </div>
            <div v-else>
                <div class="edit-input">
                    <vs-radio v-model="user.uSex" val="1">
                        男
                    </vs-radio>
                    <vs-radio v-model="user.uSex" val="2" style="margin-left: 10px">
                        女
                    </vs-radio>
                </div>
                <div class="save-button">
                    <vs-button :loading="loading.sex" @click="saveSex">保存</vs-button>
                    <vs-button shadow border @click="setShow.sex=false">取消</vs-button>
                </div>
            </div>
        </div>
        <div class="user-info-item">
            <div class="edit-name">一言概之：</div>
            <div class="edit-item" v-if="!setShow.sign">
                {{userData.uSign}}
                <span class="edit-button">
                    <span @click="setShow.sign=true">
                         <i class="fas fa-edit"></i>编辑
                    </span>
                </span>
            </div>
            <div v-else>
                <div class="edit-input">
                    <ValidationProvider ref="signValid" rules="signLength" v-slot="v">
                        <vs-input
                                :state="v.errors[0]?'danger':''"
                                label-placeholder="一句话介绍自己"
                                v-model="user.uSign">
                            <template #message-danger>
                                {{v.errors[0]}}
                            </template>
                        </vs-input>
                    </ValidationProvider>
                </div>
                <div class="save-button">
                    <vs-button :loading="loading.sign" @click="saveSign">保存</vs-button>
                    <vs-button shadow border @click="setShow.sign=false">取消</vs-button>
                </div>
            </div>
        </div>
        <div class="user-info-item">
            <div class="edit-name">绑定邮箱：</div>
            <div class="edit-item" v-if="!setShow.email">
                {{userData.uEmail}}
                <span class="edit-button">
                    <span @click="setShow.email=true">
                         <i class="fas fa-edit"></i>编辑
                    </span>
                </span>
            </div>
            <div v-else>
                <div class="edit-input">
                    <ValidationProvider  ref="emailValid" rules="required|email" v-slot="v">
                    <vs-input
                            :state="v.errors[0]?'danger':''"
                            label-placeholder="邮箱地址可用作登录"
                            v-model="user.uEmail">
                        <template #message-danger>
                            {{v.errors[0]}}
                        </template>
                    </vs-input>
                    </ValidationProvider>
                </div>
                <div class="save-button">
                    <vs-button :loading="loading.email" @click="saveEmail">保存</vs-button>
                    <vs-button shadow border @click="setShow.email=false">取消</vs-button>
                </div>
            </div>
        </div>
        <div class="user-info-item">
            <div class="edit-name">修改密码：</div>
            <div class="edit-item" v-if="!setShow.pwd">
                <span class="edit-button" style="opacity: 1">
                    <span @click="setShow.pwd=true">
                         <i class="fas fa-edit"></i>修改
                    </span>
                </span>
            </div>
            <div v-else>
                <div class="edit-input">
                    <vs-input
                            type="password"
                            v-model="newPwd"
                            label="新密码">
                        <template #message-warn>
                            确保两次密码一致
                        </template>
                    </vs-input>
                    <vs-input
                            type="password"
                            v-model="newPwdAgain"
                            style="margin-left: 10px"
                            label="重复新密码">
                        <template #message-warn>
                            修改密码后需重新登录
                        </template>
                    </vs-input>
                </div>
                <div class="save-button">
                    <vs-button :loading="loading.pwd">保存</vs-button>
                    <vs-button shadow border @click="setShow.pwd=false">取消</vs-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {saveUname, saveSex, saveSign,saveEmail} from '../../../api/user'
    import {ValidationProvider, extend} from 'vee-validate';
    import {email} from "vee-validate/dist/rules";
    //规则：必须存在的字段
    extend('required', {
        validate(value) {
            return {
                required: true,
                valid: ['', null, undefined].indexOf(value) === -1
            }
        },
        computesRequired: true,
        message: '此处不可为空'
    })
    //规则 用户名
    extend('user', {
        validate(value) {
            return /^[_a-zA-Z0-9-.\u4e00-\u9fa5]+$/.test(value);
        },
        message: '包含特殊字符'
    });
    //规则 邮箱
    extend('email', {
        validate(value) {
            return email.validate(value);
        },
        message: '请输入正确的邮箱地址'
    });
    //规则 输入长度
    extend('userLength', {
        validate(value) {
            return value.length <= 20 && value.length >= 3;
        },
        message: '长度应该为3-20之间'
    });
    //规则 输入长度
    extend('signLength', {
        validate(value) {
            return value.length <= 40;
        },
        message: '长度应该为40以内'
    });
    export default {
        name: "MemberSidebarSet",
        props: ['userData'],
        data() {
            return {
                setShow: {
                    name: false,
                    sex: false,
                    sign: false,
                    email: false,
                    pwd: false
                },
                loading: {
                    name: false,
                    sex: false,
                    sign: false,
                    email: false,
                    pwd: false
                },
                user: {},
                newPwd: '',
                newPwdAgain: ''
            }
        },
        components: {ValidationProvider},
        created() {
        },
        watch: {
            userData: function (userData) {
                this.user = JSON.parse(JSON.stringify(userData))
            }
        },
        mounted() {
        },
        filters: {
            getSex(data) {
                return data == 1 ? '男' : '女'
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.user
            },
            isSelf() {
                return this.currentUser.uId == this.userData.uId
            },
            token() {
                return this.$store.state.token
            }
        },
        methods: {
            saveUname() {
                this.$refs['nameValid'].validate().then(success => {
                    if (!success.valid) {
                        return;
                    }
                    const data = {
                        uUsername: this.user.uUsername
                    }
                    this.loading.name = true
                    saveUname(data, this.token).then(res => {
                        this.loading.name = false
                        this.setShow.name = false
                        this.userData.uUsername = this.user.uUsername
                        this.currentUser.uUsername = this.user.uUsername
                    }).catch(() => {
                        this.loading.name = false
                    })
                })

            },
            saveSex() {
                const data = {
                    uSex: this.user.uSex
                }
                this.loading.sex = true
                saveSex(data, this.token).then(res => {
                    this.loading.sex = false
                    this.setShow.sex = false
                    this.userData.uSex = this.user.uSex
                    this.currentUser.uSex = this.user.uSex
                }).catch(() => {
                    this.loading.sex = false
                })

            },
            saveSign() {
                this.$refs['signValid'].validate().then(success => {
                    if (!success.valid) {
                        return;
                    }
                    const data = {
                        uSign: this.user.uSign
                    }

                    this.loading.sign = true
                    saveSign(data, this.token).then(res => {
                        this.loading.sign = false
                        this.setShow.sign = false
                        this.userData.uSign = this.user.uSign
                        this.currentUser.uSign = this.user.uSign
                    }).catch(() => {
                        this.loading.sign = false
                    })
                })
            },
            saveEmail(){
                this.$refs['emailValid'].validate().then(success => {
                    if (!success.valid) {
                        return;
                    }
                    const data = {
                        uEmail: this.user.uEmail
                    }
                    this.loading.email = true
                    saveEmail(data, this.token).then(res => {
                        this.loading.email = false
                        this.setShow.email = false
                        this.userData.uEmail = this.user.uEmail
                        this.currentUser.uEmail = this.user.uEmail
                    }).catch(() => {
                        this.loading.email = false
                    })

                })
            }

        }
    }
</script>

<style scoped lang="scss">
    .MemberSidebarSet {

        .user-info-item {
            padding: 20px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: flex-start;
            width: 100%;

            .edit-name {
                font-weight: 700;
                width: 200px;
                min-width: 200px;

            }

            .edit-item {
                display: flex;
            }

            &:hover .edit-button {
                opacity: 1;
            }

            .edit-button {
                font-size: 14px;
                margin-left: 10px;
                cursor: pointer;
                opacity: 0;
            }

            .edit-input {
                display: flex;
                width: 100%;
            }

            .save-button {
                display: flex;
            }


        }
    }
</style>
