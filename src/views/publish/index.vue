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
            <el-form
            ref="publish-form"
            :model="article"
            :rules="formRules"
            label-width="60px"
            >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
<!--                    <el-input type="textarea" v-model="article.content"></el-input>-->
                    <el-tiptap
                            v-model="article.content"
                            :extensions="extensions"
                            height="400"
                            placeholder="请输入内容"></el-tiptap>
                </el-form-item>
                <el-form-item label="封面">
                    <el-radio-group v-model="article.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道" prop="channel_id">
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
    import {uploadImage} from "@/api/image";
    import {
        ElementTiptap,
        Doc,
        Text,
        Paragraph,
        Heading,
        Bold,
        Underline,
        Italic,
        Strike,
        ListItem,
        BulletList,
        OrderedList,
        Image,
        TextColor
    } from 'element-tiptap';

    export default {
        name: "publicIndex",
        components:{
            'el-tiptap': ElementTiptap,
        },
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
                extensions: [
                    new Doc(),
                    new Text(),
                    new Paragraph(),
                    new Heading({ level: 5 }),
                    new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
                    new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
                    new Italic(),
                    new Strike(),
                    new ListItem(),
                    new BulletList(),
                    new OrderedList(),
                    //自定义图片上传
                    new Image({
                        uploadRequest(file){
                            const fd=new FormData()
                            fd.append('image',file)
                            return uploadImage(fd).then(res=>{
                                console.log(res)
                                return res.data.data.url
                            })

                        }
                    }),
                    new TextColor()
                ],
                formRules:{
                    title:[
                        {required:true,message:'请输入标题',trigger:'blur'},
                        { min: 5, max:30, message: '长度 5 到 30 个字符', trigger: 'blur' },
                    ],
                    content:[
                        {
                            validator(rule,value,callback){
                            if(value==='<p></p>'){
                                callback(new Error('请输入文章内容'))
                            }else{
                                callback()
                            }
                            }
                        }
                    ],
                    channel_id:[
                        {required:true,message:'请选择频道'},

                    ]
                },

            }
        },
        methods: {
            onSubmit(draft=false) {
                this.$refs['publish-form'].validate(valid=>{
                    if(!valid) return
                })
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
                    this.article=res.data.data
                })
            }
        },
        created() {
            this.loadArticleChannels()
            if(this.$route.query.id){
                this.loadArticle()
            }

        }
    }
</script>

<style scoped>

</style>