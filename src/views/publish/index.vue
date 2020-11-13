<template>
    <div class="publish-container">
<!--        卡片 start-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!--        面包屑导航 start-->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item >{{$route.query.id?'修改文章':'发布文章'}}</el-breadcrumb-item>
                </el-breadcrumb>
                <!--        面包屑导航 end-->
            </div>
<!--            表单start-->
            <el-form ref="form" :model="article" label-width="40px">
                <el-form-item label="标题">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="article.content"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="article.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="article.channel_id" placeholder="请选择活动区域">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option
                                v-for="(channel,index) in channels"
                                :key="index"
                                :label="channel.name"
                                :value="channel.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(false)">发表</el-button>
                    <el-button @click="onSubmit(true)">存入草稿</el-button>
                </el-form-item>
            </el-form>
<!--            表单end-->
        </el-card>
<!--        卡片end-->
    </div>
</template>

<script>
    import {getArticleChannels,addArticle,updateArticle,getArticle} from "@/api/article";

    export default {
        name: "index",
        data() {
            return {
                article:{
                    title:'',
                    content:'',
                    cover:{
                        type:0,
                        images:[],
                    },
                    channel_id:null
                },
                channels:[],

            }
        },
        methods: {

            onSubmit(draft=false) {
                if(this.$route.query.id){
                    updateArticle(this.$route.query.id,this.article)
                    .then(res=>{
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                    })
                    return false
                }

                addArticle(this.article,draft).then(res=>{
                    console.log(res);
                    this.$message({
                        message:'发布成功',
                        type:'success'
                    })

                }).catch((error)=>{
                    console.log(error);
                })
            },
            loadArticleChannels(){
                getArticleChannels().then(res=>{
                    this.channels=res.data.data.channels
                })
            },
            loadArticle(){
                getArticle(this.$route.query.id).then(res=>{
                    console.log(res);
                    this.article=res.data.data
                })
            }
        },
        created() {
            console.log(this.$route.query.id)
            this.loadArticleChannels()
            if(this.$route.query.id){
                this.loadArticle()
            }

        }
    }
</script>

<style scoped>

</style>