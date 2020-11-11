<template>

    <el-container class="layout-container">
        <el-aside width="200px">
            <aside-menu/>
        </el-aside>
        <el-container >
            <el-header>
                <div class="head-content">
                    <div>
                        <i class="el-icon-s-fold"></i>
                        晋级赛黑马头条发布系统
                    </div>
                    <el-dropdown >
                        <div class="head-right">
                            <img src="{{user.photo}}" alt="">
                            <span class="username">{{user.name}}</span>
                            <i class="el-icon-arrow-down"></i>
                        </div>
<!--                      <span class="el-dropdown-link">-->
<!--                          -->
<!--                      </span>-->
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>


            </el-header>
            <el-main>Main</el-main>
        </el-container>
    </el-container>

</template>

<script>
    import AsideMenu from './components/aside'
    import {getUserProfile} from '@/api/user'
    export default {
        name: "index",
        data(){
          return {
              user: {}
          }
        },
        components:{
            AsideMenu
        },
        created() {
            this.loadUserProfile()
        },
        methods:{
            loadUserProfile(){
                getUserProfile().then(res=>{
                    this.user = res.data.data
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .el-header{
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    .layout-container{
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
    }
    .head-content{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .head-right img{
        width: 50px;
        height:50px;
        border-radius: 50%;
    }
    .head-right{
        .username{
            margin-right: 10px;
        }
    }
    el-dropdown{
        width:150px;
        font-size: 10px;
        line-height:60px;
        span{
            margin-right: 10px;
        }
    }
</style>