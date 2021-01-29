<template>
    <div class="Index">
        <div class="navbar">
            <span class="sidebarbox magictime twisterInUp" @click="openSidebar"><i class="fas fa-bars"></i></span>
            <span class="brand magictime vanishIn">Handsomemzc</span>
            <span class="nav-item" @click="jumpTo('BlogIndex')">
                <i class="fas fa-door-open"/>
                进入博客
            </span>
        </div>
        <div v-show="showSentence" class="sentence animate__animated animate__fadeIn">
            <div class="content">
                {{sentence.hitokoto}}
            </div>
            <div class="from">
                ——
                <span style="margin-left: 5px" v-show="sentence.from_who">
                   {{sentence.from_who}}
                </span>
                『{{sentence.from}}』
            </div>
        </div>
        <div id='background' class="background">
        </div>
        <div class="sidebar">
            <div class="sidebar-item" @click="jumpTo('BlogIndex')">
                <i class="fas fa-door-open"/>
                进入博客
            </div>
        </div>
        <div class="shadow" @click="closeSidebar"></div>
    </div>
</template>

<script>
    import ResizeHandler from "../utils/mixins/ResizeHandler";
    import Axios from 'axios'

    export default {
        name: "Index",
        components: {},
        data() {
            return {
                showSentence: true,
                bgInterval: null,
                currentIndex: 0,
                sentence: {
                    commit_from: "",
                    created_at: "",
                    creator: "",
                    creator_uid: 0,
                    from: "",
                    from_who: "",
                    hitokoto: "",
                    id: 0,
                    length: 0,
                    reviewer: 0,
                    type: "",
                    uuid: ""
                }
            }
        },
        mixins: [ResizeHandler],
        computed: {
            device() {
                return this.$store.state.app.device;
            },
        },
        created() {
            this.getOneSentence();

        },
        mounted() {
            let that = this;
            const option = {
                width: 1920,
                height: 1080,
                transparent: false,
            }
            let app = new PIXI.Application(option);
            // 把 Pixi 应用中创建出来的 canvas 添加到页面上
            //document.body.appendChild(app.view);
            // 获取渲染器
            var renderer = app.renderer;
            renderer.view.style.objectFit = 'cover';
            renderer.view.style.position = 'absolute';
            renderer.view.style.width = '100%';
            renderer.view.style.height = '100%';
            renderer.view.style.top = '50%';
            renderer.view.style.left = '50%';
            renderer.view.style.webkitTransform = 'translate(-50%,-50%) scale(1)';
            renderer.view.style.transform = 'translate(-50%,-50%) scale(1)';
            // 图片精灵
            var preview1;
            var preview2;
            var preview3;
            // 置换图精灵
            var displacementSprite;
            // 滤镜
            var displacementFilter;
            var playground = document.getElementById('background');
            var stage = new PIXI.Container();

            function setScene() {
                // renderer.view 是 Pixi 创建的一个canvas
                // 创建舞台（一个容器），这里面包括了图片精灵、置换图精灵

                // 根据图片的 url，创建图片精灵
                preview1 = PIXI.Sprite.from("https://cdn.jsdelivr.net/gh/mzc5649/CDN/images/background1.jpg");
                preview2 = PIXI.Sprite.from("https://cdn.jsdelivr.net/gh/mzc5649/CDN/images/background2.jpg");
                preview3 = PIXI.Sprite.from("https://cdn.jsdelivr.net/gh/mzc5649/CDN/images/background3.jpg");
                // 创建置换图精灵，在创建置换滤镜时会用到这个精灵
                displacementSprite = PIXI.Sprite.from('https://cdn.jsdelivr.net/gh/mzc5649/CDN/images/sprite-displace2.jpg');
                // 设置置换图精灵为平铺模式
                displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
                // 创建一个置换滤镜
                displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
                displacementSprite.scale.x = 2;
                displacementSprite.scale.y = 2;
                // 添加 图片精灵 到舞台
                stage.addChild(preview1);
                preview2.alpha = 0;
                stage.addChild(preview2);
                preview3.alpha = 0;
                stage.addChild(preview3);
                // 添加 置换图精灵 到舞台
                stage.addChild(displacementSprite);
                // 设置舞台的滤镜
                stage.filters = [displacementFilter];
                // 把 stage 添加到根容器上
                app.stage.addChild(stage);
                // 把 Pixi 创建的 canvas 添加到页面上
                playground.appendChild(renderer.view);

            }

            setScene();
            var velocityX = 10;
            var velocityY = 3;
            //监听器
            // var ticker = new PIXI.ticker.Ticker();
            var ticker = app.ticker;
            ticker.autoStart = true;
            ticker.add(function () {
                displacementSprite.x += velocityX
                displacementSprite.y += velocityY
            });
            var slideImages = stage.children;

            //更改背景
            function changeBG(pre, next) {
                var baseTimeline = new TimelineMax({
                    onComplete: function () {
                    }, onUpdate: function () {
                    }
                });
                baseTimeline.to(displacementFilter.scale, 1, {x: 200, y: 70})
                    .to(slideImages[pre], 0.5, {alpha: 0})
                    .to(slideImages[next], 0.5, {alpha: 1})
                    .to(displacementFilter.scale, 1, {x: 20, y: 20});
            };
            this.bgInterval = setInterval(() => {
                this.showSentence = false;
                if (this.currentIndex >= 0 && this.currentIndex < 2) {
                    this.currentIndex++;
                    changeBG(this.currentIndex - 1, this.currentIndex);
                } else {
                    this.currentIndex = 0;
                    changeBG(2, this.currentIndex);
                }

                this.getOneSentence()
            }, 10000);
        },
        updated() {
        },
        methods: {
            jumpTo(to) {
                this.$router.push({
                    name: to
                })
            },
            openSidebar() {
                $('.sidebar').animate({'left': 0})
                $('.shadow').show()
            },
            closeSidebar() {
                $('.sidebar').animate({'left': '-300px'})
                $('.shadow').hide()
            },
            getOneSentence() {
                Axios.get('https://v1.hitokoto.cn/?c=a&c=b').then(res => {
                    this.sentence = res.data
                    this.showSentence = true;
                })
            }
        },
        beforeDestroy() {
            clearInterval(this.bgInterval)
        }
    }


</script>
<style scoped lang="scss">
    .navbar {
        background-color: transparent;
        position: relative;
        display: flex;
        justify-content: space-between;
        z-index: 9999;
        height: 60px;
        line-height: 60px;
        color: white;
        padding: 0 40px 0 80px;

        .brand {
            font-size: 20px;
        }

        .nav-item {
            cursor: pointer;
        }

        .nav-item:hover {
            color: rgba(255, 255, 255, .9);
        }

    }

    .sidebarbox {
        position: fixed;
        left: 0;
        top: 0;
        width: 80px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
    }

    .sidebar {
        position: fixed;
        left: -300px;
        top: 0;
        height: 100%;
        width: 300px;
        border-bottom-right-radius: 10%;
        border-top-right-radius: 10%;
        z-index: 10001;
        background-color: white;

        .sidebar-item {
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            padding-left: 10px;
        }

        .sidebar-item:hover {
            height: 50px;
            line-height: 50px;
            background-color: rgba(0, 0, 0, 0.2);
            color: rgba(255, 255, 255, 0.9);
        }
    }

    .shadow {
        display: none;
        position: fixed;
        z-index: 10000;
        background-color: rgba(0, 0, 0, .5);
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .sentence {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10000;
        transform: translate(-50%, -50%);
        color: white;

        .content {
            font-size: 30px;

        }

        .from {
            padding: 20px 0;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>
<style>
</style>
