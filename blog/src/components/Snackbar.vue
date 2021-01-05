<template>
    <vs-alert
            relief
            v-if="visible"
            v-model="visible"
            :color="color"
            style="position: fixed;top: 0;z-index: 99999">
        <template #title>
            错误
        </template>
        {{ msg }}
        <span style="float: right;display: flex;align-items: center"><i class="fas fa-clock"></i>{{progress}}</span>
    </vs-alert>
</template>
<script>
    export default {
        data() {
            return {};
        },
        computed: {
            visible: {
                get() {
                    return this.$store.state.snackbar.visible;
                },
                set(val) {
                    this.$store.state.snackbar.visible = val;
                }

            },
            color() {
                return this.$store.state.snackbar.color;
            },
            progress() {
                return this.$store.state.snackbar.progress / 1000;
            },
            msg() {
                return this.$store.state.snackbar.msg;
            }
        },
        methods: {
            close() {
                this.$store.commit("snackbar/CLOSE_SNACKBAR");
            },
        },
    };
</script>
