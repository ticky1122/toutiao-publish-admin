<template>
    <el-menu
            default-active="/"
            class="el-menu-vertical-demo asideMenu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
    >
        <el-menu-item index="/">
                <i class="el-icon-location"></i>
                <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
            <i class="el-icon-menu"></i>
            <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image" >
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
            <i class="iconfont icon-publish"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
            <i class="el-icon-s-comment"></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
            <i class="iconfont icon-fans"></i>
            <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/settings">
            <i class="iconfont icon-setting"></i>
            <span slot="title">个人设置</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "aside",
        methods: {

        }
    }
</script>

<style scoped lang="less">
    .asideMenu{
        height: 100%;

    }
    .iconfont{
        margin-right: 10px;
        font-size: 18px;
    }
</style>