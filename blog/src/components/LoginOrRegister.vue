<template>
    <div>
        <vs-dialog
                v-model="LoginOrRegisterDialog"
                blur
                overflow-hidden
                not-center

                prevent-close>
            <template #header>
                <h1>
                    欢迎你
                </h1>
            </template>
            <div class="login-form">
                <h3 style="margin: 10px 0">请填写以下信息进行{{type|typeName}}</h3>
                <div v-show="isLogin">
                    <ValidationObserver ref="loginForm">
                        <ValidationProvider rules="required" v-slot="v">
                            <vs-input dark :state="v.errors[0]?'danger':''" v-model="loginForm.login"
                                      placeholder="用户名/邮箱">
                                <template #icon>
                                    <i class="fas fa-user"></i>
                                </template>
                                <template slot="message-danger">
                                    {{v.errors[0]}}
                                </template>
                            </vs-input>
                        </ValidationProvider>
                        <ValidationProvider rules="required" v-slot="v">
                            <vs-input dark :state="v.errors[0]?'danger':''" v-model="loginForm.pass" placeholder="密码"
                                      type="password">
                                <template #icon>
                                    <i class="fas fa-lock"></i>
                                </template>
                                <template slot="message-danger">
                                    {{v.errors[0]}}
                                </template>
                            </vs-input>
                        </ValidationProvider>
                        <vs-checkbox dark v-model="isRemember">
                            <div style="font-weight: 700">
                                十天内免登录
                            </div>
                        </vs-checkbox>
                    </ValidationObserver>
                </div>
                <div v-show="isRegister">
                    <ValidationObserver ref="registerForm">

                        <ValidationProvider rules="required|user|userLength" v-slot="v">
                            <vs-input dark :state="v.errors[0]?'danger':''" v-model="registerForm.login"
                                      placeholder="用户名">
                                <template #icon>
                                    <i class="fas fa-user"></i>
                                </template>
                                <template #message-danger>
                                    {{v.errors[0]}}
                                </template>
                            </vs-input>
                        </ValidationProvider>
                        <ValidationProvider ref="email" rules="required|email" v-slot="v">
                            <vs-input dark :state="v.errors[0]?'danger':''" v-model="registerForm.email"
                                      placeholder="邮箱">
                                <template #icon>
                                    <i class="fas fa-envelope"></i>
                                </template>
                                <template #message-danger>
                                    {{v.errors[0]}}
                                </template>
                            </vs-input>
                        </ValidationProvider>
                        <ValidationProvider rules="required" v-slot="v">
                            <div style="display: flex;">
                                <vs-input dark :state="v.errors[0]?'danger':''" v-model="registerForm.code"
                                          placeholder="验证码" style="width: 100%">
                                    <template #icon>
                                        <i class="fas fa-keyboard"></i>
                                    </template>
                                    <template #message-danger>
                                        <div>
                                            {{v.errors[0]}}
                                        </div>
                                    </template>
                                </vs-input>
                                <vs-button
                                        icon
                                        shadow
                                        border
                                        dark
                                        @click="handleGetCode"
                                        :disabled="email.isSend"
                                        :loading="email.loading"
                                        style="width: 50px;height: 36.4px;margin-top: 10px" animation-type="vertical">
                                    <span v-show="!email.isSend"><i class="fas fa-comment-alt"></i></span>
                                    <span v-show="email.isSend">{{email.num}}</span>
                                    <template #animate>
                                        Send
                                    </template>
                                </vs-button>
                            </div>
                        </ValidationProvider>

                        <ValidationProvider rules="required|pwdLength" v-slot="v">
                            <vs-input dark :state="v.errors[0]?'danger':''" v-model="registerForm.pass" placeholder="密码"
                                      type="password">
                                <template #icon>
                                    <i class="fas fa-lock"></i>
                                </template>
                                <template #message-danger>
                                    {{v.errors[0]}}
                                </template>
                            </vs-input>
                        </ValidationProvider>
                    </ValidationObserver>
                </div>

            </div>
            <template #footer>
                <vs-button dark block @click="handleSubmit" :loading="submitBtnLoading" animation-type="vertical">
                    继续
                    <template #animate>
                        {{type|typeName}}
                    </template>
                </vs-button>
                <div class="new">
                    <span v-show="isLogin">还没有账号，</span>
                    <span v-show="isRegister">已有账号，</span>
                    <a @click="setType(type==1?2:1)">去{{type|typeNameReserve}}</a>
                </div>
            </template>
        </vs-dialog>
    </div>
</template>
<script>
    import {mapMutations, mapState, mapActions} from 'vuex';
    import {login, register, sendMailCode} from '@/api/user'
    import store from "../store";
    import {ValidationProvider, extend, ValidationObserver, validate} from 'vee-validate';
    import {regex, email} from 'vee-validate/dist/rules';
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
    //规则 邮箱
    extend('email', {
        validate(value) {
            return email.validate(value);
        },
        message: '请输入正确的邮箱地址'
    });
    //规则 用户名
    extend('user', {
        validate(value) {
            return /^[_a-zA-Z0-9-.\u4e00-\u9fa5]+$/.test(value);
        },
        message: '包含特殊字符'
    });
    //规则 输入长度
    extend('userLength', {
        validate(value) {
            return value.length <= 20 && value.length >= 3;
        },
        message: '长度应该为3-20之间'
    });
    //规则 输入长度
    extend('pwdLength', {
        validate(value) {
            return value.length <= 20 && value.length >= 6;
        },
        message: '长度应该为6-20之间'
    });
    export default {
        name: "LoginOrRegister",
        components: {ValidationProvider, ValidationObserver},
        data() {
            return {
                type: 1, // 1 登录 2 注册
                loginForm: {
                    login: '',
                    pass: '',
                    pwdType: true,
                },
                registerForm: {
                    login: '',
                    pass: '',
                    email: '',
                    code: '',
                    pwdType: true,
                },
                email: {
                    loading: false,
                    isSend: false,
                    num: -1
                },
                emailValid: {
                    tamp: '',
                    hash: ''
                },
                submitBtnLoading: false,
                isRemember: false
            }
        },
        created() {

        },
        computed: {
            ...mapState(["token"]),
            LoginOrRegisterDialog: {
                get() {
                    return this.$store.state.LoginOrRegisterDialog;
                },
                set(value) {
                    this.$store.state.LoginOrRegisterDialog = value;
                }
            },
            isLogin() {
                return this.isType(1)
            },
            isRegister() {
                return this.isType(2)
            }
        },
        filters: {
            typeName: function (type) {
                return type == 1 ? '登录' : '注册';
            },
            typeNameReserve: function (type) {
                return type == 1 ? '注册' : '登录';
            }
        },
        methods: {
            ...mapMutations(["SET_LOGIN_OR_REGISTER_DIALOG"]),
            ...mapActions(["serverInit"]),
            isType(type) {
                return this.type == type;
            },
            setType(type) {
                let that = this;
                that.type = type;
            },
            setRegPwdType() {
                let that = this;
                that.registerForm.pwdType = !that.registerForm.pwdType;
            },
            setLoginPwdType() {
                let that = this;
                that.loginForm.pwdType = !that.loginForm.pwdType;
            },
            //提交按钮
            handleSubmit() {
                //按钮loading
                this.submitBtnLoading = true;
                const refFormName = this.type == 1 ? 'loginForm' : 'registerForm';
                this.$refs[refFormName].validate().then(success => {
                    if (!success) {
                        this.submitBtnLoading = false;
                        return;
                    }
                    //具体操作 登录
                    if (refFormName == 'loginForm') {
                        const data = {
                            login: this.loginForm.login,
                            pass: this.loginForm.pass
                        }
                        login(data).then(res => {
                            if (this.isRemember) {
                                this.$cookies.set('login', this.loginForm.login, '10D' )
                                this.$cookies.set('pass', this.loginForm.pass, '10D' )
                            }
                            this.$vs.notification({
                                progress: "auto",
                                color: 'success',
                                position: "bottom-right",
                                title: "成功",
                                text: "登陆成功"
                            });
                            //按钮loading
                            this.submitBtnLoading = false;
                            //关闭登录窗口
                            this.$store.commit('SET_LOGIN_OR_REGISTER_DIALOG');
                            //存储信息
                            this.$store.commit('SET_USER', res.data.userinfo);
                            this.$cookies.set("token", res.data.token, 3600)

                        }).catch(err => {
                            //按钮loading
                            this.submitBtnLoading = false;
                        });

                    } else if (refFormName == 'registerForm') {
                        //验证注册
                        const data = {
                            tamp: localStorage.getItem("email_tamp"),
                            hash: localStorage.getItem("email_hash"),
                            user: {
                                uUsername: this.registerForm.login,
                                uPwd: this.registerForm.pass,
                                uEmail: this.registerForm.email,
                            }
                        };
                        register(this.registerForm.code, data).then(res => {
                            this.$vs.notification({
                                progress: "auto",
                                color: 'success',
                                position: "bottom-right",
                                title: "成功",
                                text: "注册成功"
                            });
                            //切换为登录
                            this.type = 1;
                            //按钮loading
                            this.submitBtnLoading = false;
                        }).catch(err => {
                            //按钮loading
                            this.submitBtnLoading = false;
                        });
                    }
                })
            },
            //发送邮件
            handleGetCode() {
                const that = this;
                this.$refs['email'].validate().then(success => {
                    if (!success.valid) {
                        return;
                    }
                    const mailDto = {
                        to: this.registerForm.email
                    }
                    this.email.loading = true;
                    //正在发送邮件
                    sendMailCode(mailDto).then(res => {
                            this.email.loading = false;
                            this.$vs.notification({
                                progress: "auto",
                                color: 'success',
                                position: "top-center",
                                title: '成功',
                                text: "验证码发送成功，请注意查收"
                            });
                            localStorage.setItem("email_tamp", res.data.tamp);
                            localStorage.setItem("email_hash", res.data.hash);
                            this.email.isSend = true;
                            this.email.num = 60;
                            //计时开始 60秒
                            let timer = setInterval(() => {
                                this.email.num--;
                                if (this.email.num == 0) {
                                    this.email.isSend = false;
                                    clearInterval(timer);
                                }
                            }, 1000)
                        }
                    ).catch(()=>{
                        this.email.loading = false;
                        this.email.isSend = false;
                    })
                })

            }
        }
    }
</script>

<style lang="scss" scoped>


    .back-btn-box {
        padding: 8px 6px;
    }

    .login-box {
        padding: 12px 28px 34px;

        .login-box-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .login-box-header-btn {
                font-size: 16px;
            }

        }

        h3 {
            color: #999999;
            margin-bottom: 12px;
        }

        .form-filed {
            label {
                font-weight: 700;
                font-size: 14px;
                margin: 14px 0 6px;

                display: block;

                &::after {
                    content: '*';
                    color: #f00;
                    font-size: 14px;
                    margin-left: 4px;
                }
            }

        }

        .continue-btn {
            width: 240px;
        }
    }
</style>
<style lang="scss">
    .login-form {
        width: 100%;

        .vs-input-content {
            margin: 10px 0px;
            width: calc(100%);

            .vs-input {
                width: 100%
            }
        }


    }

    .new {
        font-size: .7rem;
        margin-top: 20px;
        display: flex;
        justify-content: center;

        a {
            cursor: pointer;

            &:hover {
                text-decoration: underline
            }
        }
    }

</style>
