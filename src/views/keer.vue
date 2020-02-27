<template>
    <div class="vd">

        <el-row :gutter="20" v-for="(item) in this.videoArr">

            <el-col :span="6"  ><div class="grid-content bg-purple">

                <iframe  v-bind:src="item.url" frameborder=0 allowfullscreen>
                </iframe>
                <div class="text">{{item.info}}</div>
                <div class="time">{{item.addtime}}</div>
            </div>
            </el-col>



        </el-row>
    </div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				videoArr:new Array(4),

			}

		},created() {
            this.pagereload()


		},watch:{
			"$route":function(to,from){ //监听路由变化
				this.videoArr=[];
				this.pagereload()
			}
		},
        methods:{
			pagereload:function () {
				const _this=this;
				let subject="";

				if (this.$route.path==="/keer") {
					subject="2";
				}else {
					subject="3";
				}

				axios.get('http://localhost:8181/springboot/getVideo/'+subject).then(function (resp) {
					_this.videoArr=resp.data;
					console.log(resp.data);

				});
			}
        }
	}
</script>

<style scoped>
    .text{
        height: 30px;
        text-align: center;
        color: #4c4c4c;
        font-size: 20px;
    }
    .time{
        height: 20px;
        text-align: center;
        color: #4c4c4c;
        font-size: 15px;
    }
    iframe{
        width: 100%;
        height: 250px;
    }
    .vd{
        margin-top:30px;
        margin-left: 30%;
        width: 500px;
        height: 300px;
    }
    .el-row {
        padding: 0px;

        margin-bottom: 20px;
        width: 1080px;
    }
    .el-col {
        border-radius: 4px;
        width: 500px;
        height: 300px;

    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>