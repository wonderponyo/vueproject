<template>
    <div>

            <el-main>

                <!--                <input type="button" title="开启摄像头" value="开启摄像头" v-on:click="getMedia" />-->



                <video id="video" width="500px" height="500px" autoplay="autoplay"></video>

                <canvas id="canvas" width="500px" height="400px" ></canvas>

                <div>
                <el-button type="success" v-on:click="takePhoto" plain>拍照</el-button>
                <el-button type="danger" plain v-on:click="upload">确认上传</el-button>
                </div>

            </el-main>





    </div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: "aitest",
		data(){
			return{
				stopflag:1,
                imgSrc:""

			}
		},
        mounted(){
			this.getMedia();
        },
		methods:{
			getMedia:function() {
				let constraints = {
					video: {width: 500, height: 500},
					audio: true
				};
				//获得video摄像头区域
				let video = document.getElementById("video");
				//这里介绍新的方法，返回一个 Promise对象
				// 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
				// then()是Promise对象里的方法
				// then()方法是异步执行，当then()前的方法执行完后再执行then()内部的程序
				// 避免数据没有获取到
				let promise = navigator.mediaDevices.getUserMedia(constraints);
				promise.then(function (MediaStream) {
					video.srcObject = MediaStream;
					video.play();
				});


			},
            upload:function(){
	            let _this=this;
	            axios.post('http://localhost:8181/springboot/userfaceadd',{
		            image:_this.imgSrc
	            }).then(function (res) {
		            if(res.data==="succ"){
			            clearInterval(_this.stopflag);
			            _this.$message({
				            message: '照片已上传',
				            type: 'success'
			            });
			            _this.start();
		            }else {
			            _this.$message({
				            message: '上传失败！',
				            type: 'error'
			            });
		            }

	            })
            },
			takePhoto : function () {
				//获得Canvas对象
                // this.getMedia();
				let video = document.getElementById("video");
				let canvas = document.getElementById("canvas");
				let ctx = canvas.getContext('2d');
				ctx.drawImage(video, 0, 0, 500, 500);
				this.imgSrc = canvas.toDataURL("image/png").split("base64,")[1];


			}


		}
	}
</script>

<style scoped>

</style>