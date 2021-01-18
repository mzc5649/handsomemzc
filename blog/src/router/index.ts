import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";

Vue.use(VueRouter);
//路由懒加载
const Index = () => import('@/views/Index.vue');
const Blog = () => import('@/views/Blog.vue')
const BlogIndex = () => import('@/views/blog/Index.vue')
const BlogMessage = () => import('@/views/message/Index.vue')
const Article = () => import('@/views/article/Index.vue')
const ArticleCategory = () => import('@/views/category/Index.vue')
const Member = () => import('@/views/member/Index.vue')
const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Index",
        component: Index
    },
    {
        path: '/404',
        name: '404',
        meta: {title: '404'},
        component: () => import('@/views/404.vue'),
    },
    {
        path: '/blog',
        name: 'Blog',
        redirect: "/blog",
        component: Blog,
        meta: {
            title: '博客'
        },
        children: [
            {path: '404',meta: {title: '未找到页面'} , component: () => import('@/views/404.vue')},
            {path: '', name: 'BlogIndex', meta: {title: '博客首页', keepAlive: false}, component: BlogIndex},
            {path: 'msg', name: 'BlogMessage', meta: {title: '留言', keepAlive: false}, component: BlogMessage},
            {path: 'article/:id', name: 'Article', meta: {title: '文章详情', keepAlive: false}, component: Article},
            {
                path: 'category/:id',
                name: 'ArticleCategory',
                meta: {title: '分类详情', keepAlive: false},
                component: ArticleCategory
            },
            {
                path: 'member/:id',
                name: 'Member',
                meta: {title: '用户中心', keepAlive: false},
                component: Member,
                redirect:'/blog/member',
                children: [
                    {
                        path: '',
                        component: () => import('@/views/member/userSiderbar/Index.vue')
                    }
                ]
            },
        ]

    },
    {path: '*', redirect: '/404'}
];

const router = new VueRouter({
    scrollBehavior: () => {
        return {x: 0, y: 0}
    },
    routes,
});

export default router;
