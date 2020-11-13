<template>
    <div class="article-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!--        面包屑导航 start-->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item >内容管理</el-breadcrumb-item>
                </el-breadcrumb>
                <!--        面包屑导航 end-->
            </div>
            <!--        数据筛选表单 start-->
            <el-form ref="form"
                     v-loading="loading"
                     :model="form"
                     label-width="40px"
                     size="mini">
                <el-form-item label="状态">
                    <el-radio-group v-model="status">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="currentChannel" placeholder="请选择">
                        <el-option label="全部" :value="null"></el-option>
                        <el-option
                                v-for="(channel,index) in channels"
                               :label="channel.name"
                               :value="channel.id"
                                :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <div class="block">
                        <el-date-picker
                                v-model="rangeDate"
                                type="datetimerange"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loadArticle(1)">查询</el-button>
                </el-form-item>
            </el-form>
            <!--        数据筛选表单 end-->
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>根据条件，查询到 {{totalCount}} 条数据</span>
            </div>
            <!--        数据列表-->
<!--            table表格组件
                1.把需要展示的数组列表数据绑定给table的data属性
                2.设计表格列
-->
            <el-table
                    v-loading="loading"
                    :data="articles"
                    stripe
                    style="width: 100%"
                    size="small">
                <el-table-column
                        label="封面"
                        width="180">
                    <template slot-scope="scope">
<!--                        <el-image-->
<!--                            :src="scope.row.cover.images[0]"-->
<!--                            fit="cover">-->
<!--                        </el-image>-->
                        <img
                                v-if="scope.row.cover.images[0]"
                                :src="scope.row.cover.images[0]" alt="" >
                        <img v-else src="./nocover.jpg" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题"
                        width="180"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status==0">草稿</el-tag>
                        <el-tag v-else-if="scope.row.status==1">待审核</el-tag>
                        <el-tag v-else-if="scope.row.status==2">审核通过</el-tag>
                        <el-tag v-else-if="scope.row.status==3">审核失败</el-tag>
                        <el-tag v-else-if="scope.row.status==4">已删除</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="pubdate"
                        label="发布时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                size="mini"
                                circle
                                icon="el-icon-edit"
                                @click="$router.push('/publish?id='+scope.row.id)"></el-button>
                        <el-button
                                type="danger"
                                size="mini"
                                circle
                                icon="el-icon-delete"
                                @click="onDeleteArticle(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--        数据列表-->

            <!--        分页-->
            <el-pagination
                    :disabled="disabled"
                    class="pager"
                    layout="prev, pager, next"
                    :total="totalCount"
                    background
            @current-change="onCurrentChange"
            :page-size="pageSize"
            :current-page.sync="page">
            </el-pagination>
            <!--        分页-->
        </el-card>
    </div>
</template>

<script>
    import {getAritcle,getArticleChannels,deleteArticle} from "@/api/article";

    export default {
        name: "articleIndex",
        data(){
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                tableData: [
                    {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                articles:[],
                totalCount:0,
                pageSize:10,
                status:null,
                channels:[],
                currentChannel:null,
                rangeDate:null,
                loading:true,
                disabled:true,
                page:1,
            }
        },
        methods:{
            loadArticle(page=1){
                this.loading=true
                this.disabled=true
                getAritcle({
                    page,
                    per_page:this.pageSize,
                    status:this.status,
                    channel_id:this.currentChannel,
                    begin_pubdate:this.rangeDate?this.rangeDate[0]:null,
                    end_pubdate:this.rangeDate?this.rangeDate[1]:null,

                }).then(res=>{
                    this.articles=res.data.data.results
                    this.totalCount=res.data.data.total_count
                    this.loading=false
                    this.disabled=false
                    console.log(res)
                })
            },
            onCurrentChange(page){
                this.loadArticle(page)
            },
            loadChannels(){
                getArticleChannels().then(res=>{
                    console.log(res);
                    this.channels=res.data.data.channels
                })
            },
            onDeleteArticle(id){
                console.log(id.toString());
                this.$confirm('确认删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteArticle(id.toString()).then(res=>{
                        this.loadArticle(this.page)//更新列表
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })

                })
            }
        },
        computed:{

        },
        created() {
            this.loadArticle()
            this.loadChannels()
        },
    }
</script>

<style scoped>
    .box-card{
        margin-bottom: 30px;
    }
    .pager{
        margin-top: 20px;
    }
    img{
        width:100px;
        background-size: cover;
    }
</style>