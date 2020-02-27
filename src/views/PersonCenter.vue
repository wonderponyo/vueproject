<template>
    <div>
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" height="100%"style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1', '3']" mode="vertical" router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-user-solid"></i>个人信息</template>

                            <el-menu-item index="/faceadd">照片添加</el-menu-item>


                    </el-submenu>
<!--                    <el-submenu index="/aitest">-->
<!--                        <template slot="title"><i class="el-icon-s-claim"></i>在线打卡</template>-->

                            <el-menu-item index="/aitest"><i class="el-icon-s-claim"></i>在线打卡</el-menu-item>
<!--                            <el-menu-item index="/aitest">科目三</el-menu-item>-->
                    <el-menu-item index="/hourstatistic"><i class="el-icon-s-flag"></i>学时统计</el-menu-item>

<!--                    </el-submenu>-->

                        <el-menu-item index="/showscore"><i class="el-icon-s-data"></i>模拟考试</el-menu-item>

                    <el-menu-item index="/examschedule"><i class="el-icon-s-marketing"></i>考试情况</el-menu-item>

                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-s-comment"></i>评价</template>
                        <el-menu-item index="/schoolrate">驾校评价</el-menu-item>
                        <el-menu-item index="/coachrate">教练评价</el-menu-item>
                    </el-submenu>


                </el-menu>

            </el-aside>
            <el-main><router-view/></el-main>
        </el-container>


    </div>
</template>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
	export default {
		data() {
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
				tableData: Array(20).fill(item)
			}
		}
	};
</script>