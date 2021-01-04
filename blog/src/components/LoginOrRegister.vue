<template>
    <div>
        <vs-dialog
                v-model="LoginOrRegisterDialog"
                blur
                overflow-hidden
                not-center
                @close="SET_LOGIN_OR_REGISTER_DIALOG"
                prevent-close>
            <template #header>
                <h4>
                    欢迎你
                </h4>
            </template>
            <div class="login-form">
                <h3 style="margin: 10px 0">请填写以下信息进行{{type|typeName}}</h3>
                <div v-show="isLogin">
                    <ValidationObserver ref="loginForm">
                        <ValidationProvider rules="required" v-slot="v">
                            <vs-input v-model="loginForm.login" placeholder="用户名/邮箱">
                                <template #icon>
                                    <i class="fas fa-user"></i>
                                </template>
                                <template slot="message-danger">
                                    {{v.errors[0]}}
                                </template>
                            </vs-input>
                        </ValidationProvider>
                        <ValidationProvider rules="required" v-slot="v">
                            <vs-input v-model="loginForm.pass" placeholder="密码" type="password">
                                <template #icon>
                                    <i class="fas fa-lock"></i>
                                </template>
                                <template slot="message-danger">
                                    {{v.errors[0]}}
                                </template>
                            </vs-input>
                        </ValidationProvider>
                    </ValidationObserver>
                </div>
                <div v-show="isRegister">
                    <ValidationObserver ref="registerForm">

                        <ValidationProvider rules="required|user|userLength" v-slot="v">
                            <vs-input v-model="registerForm.login" placeholder="用户名">
                                <template #icon>
                                    <i class="fas fa-user"></i>
                                </template>
                                <template #message-danger>
                                    {{v.errors[0]}}
                                </template>
                            </vs-input>
                        </ValidationProvider>
                        <ValidationProvider rules="required|email" v-slot="v">
                            <vs-input v-model="registerForm.email" placeholder="邮箱">
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
                                <vs-input v-model="registerForm.code" placeholder="验证码" style="width: 100%">
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
                            <vs-input v-model="registerForm.pass" placeholder="密码" type="password">
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
                <vs-button dark block @click="handleSubmit">
                    继续
                </vs-button>
                <div class="new">
                    <span v-show="isLogin">还没有账号，</span>
                    <span v-show="isRegister">已有账号，</span>
                    <a @click="setType(type==1?2:1)">去{{type|typeNameReserve}}</a>
                </div>
            </template>
        </vs-dialog>
        <!--        <v-dialog :z-index="9999" persistent width="400" v-model="LoginOrRegisterDialog">-->
        <!--            <v-card>-->
        <!--                <div class="back-btn-box">-->
        <!--                    <v-btn elevation="0" text @click="SET_LOGIN_OR_REGISTER_DIALOG">-->
        <!--                        <v-icon>fa-arrow-left</v-icon>-->
        <!--                    </v-btn>-->
        <!--                </div>-->
        <!--                <div class="login-box">-->
        <!--                    <header>-->
        <!--                        <h2 class="login-box-header">欢迎你，-->
        <!--                            <v-btn color="#E91E63" text class="login-box-header-btn" @click="setType(type==1?2:1)">-->
        <!--                                去{{type|typeNameReserve}}-->
        <!--                            </v-btn>-->
        <!--                        </h2>-->
        <!--                        <h3>请填写以下信息进行{{type|typeName}}</h3>-->
        <!--                    </header>-->
        <!--                    &lt;!&ndash;登录&ndash;&gt;-->
        <!--                    <v-form v-show="isLogin" ref="loginForm" v-model="loginValid" lazy-validation>-->
        <!--                        <div class="form-filed">-->
        <!--                            <label>用户名/邮箱</label>-->
        <!--                            <v-text-field v-model="loginForm.login" :rules="validators.LOGINUSERNAME"></v-text-field>-->
        <!--                        </div>-->
        <!--                        <div class="form-filed">-->
        <!--                            <label>密码</label>-->
        <!--                            <v-text-field v-show="loginForm.pwdType" v-model="loginForm.pass" type="password"-->
        <!--                                          :rules="validators.PASSWORD">-->
        <!--                                <div slot="append">-->
        <!--                                    <v-btn elevation="0" text @click="setLoginPwdType">-->
        <!--                                        <v-icon>fa-eye-slash</v-icon>-->
        <!--                                    </v-btn>-->
        <!--                                </div>-->
        <!--                            </v-text-field>-->
        <!--                            <v-text-field v-show="!loginForm.pwdType" v-model="loginForm.pass"-->
        <!--                                          :rules="validators.PASSWORD">-->
        <!--                                <div slot="append">-->
        <!--                                    <v-btn elevation="0" text @click="setLoginPwdType">-->
        <!--                                        <v-icon>fa-eye</v-icon>-->
        <!--                                    </v-btn>-->
        <!--                                </div>-->
        <!--                            </v-text-field>-->
        <!--                        </div>-->
        <!--                    </v-form>-->
        <!--                    &lt;!&ndash;注册&ndash;&gt;-->
        <!--                    <v-form v-show="isRegister" ref="registerForm" v-model="registerValid" lazy-validation>-->
        <!--                        <div class="form-filed">-->
        <!--                            <label>用户名</label>-->
        <!--                            <v-text-field v-model="registerForm.login" :rules="validators.USERNAME"></v-text-field>-->
        <!--                        </div>-->
        <!--                        <div class="form-filed">-->
        <!--                            <label>邮箱</label>-->
        <!--                            <v-text-field v-model="registerForm.email" :rules="validators.EMAIL"></v-text-field>-->
        <!--                        </div>-->
        <!--                        <div class="form-filed">-->
        <!--                            <label>验证码</label>-->
        <!--                            <v-text-field v-model="registerForm.code" :rules="validators.REQUIRED">-->
        <!--                                <div class="email_box" slot="append-outer">-->
        <!--                                    <v-btn-->
        <!--                                            text-->
        <!--                                            :loading="email.loading"-->
        <!--                                            :disabled="email.isSend"-->
        <!--                                            @click="handleGetCode"-->
        <!--                                    >-->
        <!--                                        <v-icon v-if="!email.isSend">fa-envelope</v-icon>-->
        <!--                                        <span v-else>{{email.num}}</span>-->
        <!--                                    </v-btn>-->
        <!--                                </div>-->
        <!--                            </v-text-field>-->
        <!--                        </div>-->

        <!--                        <div class="form-filed">-->
        <!--                            <label>密码</label>-->
        <!--                            <v-text-field v-show="registerForm.pwdType" v-model="registerForm.pass"-->
        <!--                                          :rules="validators.PASSWORD"-->
        <!--                                          type="password" required>-->
        <!--                                <div slot="append">-->
        <!--                                    <v-btn elevation="0" text @click="setRegPwdType">-->
        <!--                                        <v-icon>fa-eye-slash</v-icon>-->
        <!--                                    </v-btn>-->

        <!--                                </div>-->
        <!--                            </v-text-field>-->
        <!--                            <v-text-field v-show="!registerForm.pwdType" v-model="registerForm.pass"-->
        <!--                                          :rules="validators.PASSWORD"-->
        <!--                                          required>-->
        <!--                                <div slot="append">-->
        <!--                                    <v-btn elevation="0" text @click="setRegPwdType">-->
        <!--                                        <v-icon>fa-eye</v-icon>-->
        <!--                                    </v-btn>-->
        <!--                                </div>-->
        <!--                            </v-text-field>-->
        <!--                        </div>-->
        <!--                    </v-form>-->
        <!--                    <div class="d-flex justify-center mt-4">-->
        <!--                        <v-btn @click="handleSubmit" large elevation="0" class="continue-btn">-->
        <!--                            继续-->
        <!--                        </v-btn>-->
        <!--                    </div>-->

        <!--                </div>-->
        <!--            </v-card>-->
        <!--        </v-dialog>-->
        <!--        <v-snackbar-->
        <!--                v-model="snackbar.show"-->
        <!--                top-->
        <!--                :timeout="2000"-->
        <!--        >-->
        <!--            <v-icon>fa-lightbulb-o</v-icon>-->
        <!--            ：{{snackbar.msg}}-->

        <!--        </v-snackbar>-->
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
    extend('email',{
        validate(value){
            return email.validate(value);
        },
        message:'请输入正确的邮箱地址'
    });
    //规则 用户名
    extend('user',{
        validate(value){
            return /^[_a-zA-Z0-9-.\u4e00-\u9fa5]+$/.test(value);
        },
        message:'包含特殊字符'
    });
    //规则 输入长度
    extend('userLength',{
        validate(value){
            return value.length <= 20 && value.length >= 3;
        },
        message:'长度应该为3-20之间'
    });
    //规则 输入长度
    extend('pwdLength',{
        validate(value){
            return value.length <= 20 && value.length >= 6;
        },
        message:'长度应该为6-20之间'
    });
    export default {
        name: "LoginOrRegister",
        components: {ValidationProvider, ValidationObserver},
        data() {
            return {
                type: 1, // 1 登录 2 注册
                loginValid: true,
                loginForm: {
                    login: '',
                    pass: '',
                    pwdType: true,
                },
                registerValid: false,
                registerForm: {
                    login: '',
                    pass: '',
                    email: '',
                    code: '',
                    pwdType: true,
                },
                validators: {
                    REQUIRED: [v => !!v || '不能为空'],
                    LOGINUSERNAME: [v => !!v || '不能为空', v => /^[_a-zA-Z0-9-@.]+$/.test(v) || '包含特殊字符', v => (v && v.length <= 20) || '超过最大长度'],
                    USERNAME: [v => !!v || '不能为空', v => /^[_a-zA-Z0-9-]+$/.test(v) || '包含特殊字符', v => (v && v.length <= 20) || '超过最大长度'],
                    PASSWORD: [v => !!v || '不能为空', v => (v && v.length <= 20) || '超过最大长度'],
                    EMAIL: [v => !!v || '不能为空', v => /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(v) || '邮箱格式不正确']
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
            }
        },
        created() {
        },
        computed: {
            ...mapState(["LoginOrRegisterDialog", "token"]),
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

                // let that = this;
                const refFormName = this.type == 1 ? 'loginForm' : 'registerForm';
                this.$refs[refFormName].validate().then(success => {
                    if (!success) return;

                    //具体操作

                })

                // // 验证
                // const isValidate = that.$refs[formElName].validate();
                //
                // if (isValidate) {
                //     if (formElName == 'loginForm') {
                //         //登录
                //         const data = {
                //             login: that.loginForm.login,
                //             pass: that.loginForm.pass
                //         }
                //         login(data).then(function (res) {
                //             that.$store.dispatch("snackbar/openSnackbar", {
                //                 msg: '登录成功',
                //                 color: 'success'
                //             })
                //             that.$store.commit('SET_LOGIN_OR_REGISTER_DIALOG');
                //             that.$store.commit('SET_TOKEN', res.data.token);
                //             that.$cookies.set("token", res.data.token, 3600)
                //             that.serverInit(that)
                //         })
                //     } else if (formElName == 'registerForm') {
                //         //验证注册
                //         const data = {
                //             tamp: localStorage.getItem("email_tamp"),
                //             hash: localStorage.getItem("email_hash"),
                //             user: {
                //                 uUsername: that.registerForm.login,
                //                 uPwd: that.registerForm.pass,
                //                 uEmail: that.registerForm.email,
                //             }
                //         }
                //         register(that.registerForm.code, data).then(function (res) {
                //             that.$store.dispatch("snackbar/openSnackbar", {
                //                 msg: res.msg,
                //                 color: 'success'
                //             })
                //         })
                //     }
                // }

            },
            //发送邮件
            handleGetCode() {
                const email = this.registerForm.email;
                let flag = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email);
                if (!flag) {
                    this.$vs.notification({
                        progress: "auto",
                        color: 'danger',
                        position: "top-center",
                        title: '错误',
                        text: "请输入正确格式的邮箱地址"
                    });
                    return;
                }
                const mailDto = {
                    to: email
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
                )
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
