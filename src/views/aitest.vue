<template>
    <div>
        <el-container style="height: 100%; border: 1px solid #eee">

            <el-main>

<!--                <input type="button" title="开启摄像头" value="开启摄像头" v-on:click="getMedia" />-->

                <el-button type="danger" :disabled="disabled" plain v-on:click="getMedia">开始打卡</el-button>

                <video id="video" width="500px" height="400px" autoplay="autoplay"></video>

                <!--                <button id="snap" v-on:click="takePhoto">拍照</button>-->
                <!--                <el-button type="success" v-on:click="takePhoto" plain>拍照</el-button>-->
                <el-button type="success" v-on:click="stop" plain>结束打卡</el-button>
                <canvas id="canvas" width="500px" height="500px" hidden></canvas>
                <div> <span style="font-size: 30px " id=mytime>本次练车时长：{{str}}</span></div>
            </el-main>

        </el-container>

        <baidu-map @ready="handler" class="map" id="map" refs="allmap">

        </baidu-map>

    </div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: "aitest",
        data(){
			return{
			stopflag:1,
                longitude:0.0,
				latitude: 0.0,
				disabled:false,
				h:0,//定义时，分，秒，毫秒并初始化为0；
				m:0,
				s:0,
				ms:0,
				time:0, //定时器
				str:'00:00:00',
				times:'', //统计共多少秒时间
                kemunow:'' //要计时的科目
			}
        },
        created(){
			// this.ptInRect()
            let _this=this;
	        axios.get('http://localhost:8181/springboot/getschoolPoint/32').then(function (resp) {

            _this.longitude=parseFloat(resp.data.longitude)
                _this.latitude=parseFloat(resp.data.latitude)
	        });
        },
        methods:{
        getMedia:function() {
        	let _this=this;
	        const h = this.$createElement;
	        axios.get('http://localhost:8181/springboot/getkemunow/1').then(function (resp) {
		        _this.kemunow=(parseInt(resp.data)+1).toString();
		        _this.$notify({
			        title: '您当前打卡科目：',
			        message: h('i', { style: 'color: teal'}, '科目'+_this.kemunow)
		        });

	        });
		    let constraints = {
			video: {width: 500, height: 500},
			audio:false
		    };
		//获得video摄像头区域
		let video = document.getElementById("video");

		let promise = navigator.mediaDevices.getUserMedia(constraints);
		promise.then(function (MediaStream) {
			video.srcObject = MediaStream;
			video.play();
		});
	        this.stopflag= setInterval(this.takePhoto,1000);
        },
            handler ({BMap, map}) {

                let _this=this
	            let geolocation = new BMap.Geolocation();
	            geolocation.getCurrentPosition(function(r){
		            if(this.getStatus() == BMAP_STATUS_SUCCESS){
			            // pt = ;//测试点
			            map.centerAndZoom(r.point, 13);

			            var pt1 = new BMap.Point(_this.longitude-0.02, _this.latitude-0.02);//西南脚点
			            var pt2 = new BMap.Point(_this.longitude+0.03, _this.latitude+0.03);//东北脚点
			            var bds = new BMap.Bounds(pt1, pt2); //测试Bounds对象
			            var result = BMapLib.GeoUtils.isPointInRect(r.point, bds);


			            if(result == true){
				            alert("驾校范围内，可打卡");
	                           _this.disabled=false

			            } else {

				            alert("您已超出驾校范围，无法打卡")
				            _this.disabled=true
			            }
			            //演示：将点与矩形添加到地图上
			            map.clearOverlays();
			            var mkr = new BMap.Marker(r.point);
			            var pts = [];
			            //bds的四个脚点坐标
			            var leftTop = new BMap.Point(pt1.lng, pt2.lat);
			            var rightTop = new BMap.Point(pt2.lng, pt2.lat);
			            var leftBottom = new BMap.Point(pt1.lng, pt1.lat);
			            var rightBottom = new BMap.Point(pt2.lng, pt1.lat);
			            pts.push(leftTop);
			            pts.push(rightTop);
			            pts.push(rightBottom);
			            pts.push(leftBottom);
			            var rect = new BMap.Polygon(pts);
			            map.addOverlay(mkr);//添加测试点
			            map.addOverlay(rect);//添加测试矩形
			            // alert('您的位置：'+r.point.lng+','+r.point.lat);
		            }
		            else {
			            alert('failed'+this.getStatus());
		            }
	            })



	        },
	takePhoto : function () {
		//获得Canvas对象
        let _this=this;
		let video = document.getElementById("video");
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, 500, 500);
		let imgSrc = canvas.toDataURL("image/png").split("base64,")[1];
		// alert(imgSrc)
		axios.post('http://localhost:8181/springboot/userfacematch',{
			image:imgSrc
		}).then(function (res) {
			if(parseInt(res.data)>80){
				clearInterval(_this.stopflag);
				_this.$message({
					message: '匹配成功！',
					type: 'success'
				});
				_this.start();
            }else {
				_this.$message({
					message: '匹配失败！',
					type: 'error'
				});
            }

		})
	    },
	        start:function ()
            {  //开始
		        this.time=setInterval(this.timer,400);
	        },

	        stop :function(){  //暂停
		        let _this=this;
		        clearInterval(this.time);
		        clearInterval(this.stopflag)

                 // 通过$once来监听定时器
                 // 在beforeDestroy钩子触发时清除定时器
		        this.$once('hook:beforeDestroy', () => {
			        clearInterval(this.time);
			        clearInterval(this.stopflag)
		        })

		        axios.post('http://localhost:8181/springboot/updateClassHour',{
			        cid:1,
                    kemunow:_this.kemunow,
                    time:_this.str
		        }).then(function (res) {
			        if(res.data==="succ"){
				        _this.$message({
					        message: '学时已上传！',
					        type: 'success'
				        });
				        _this.reset();
			        }else {
				        _this.$message({
					        message: '学时上传失败！！',
					        type: 'error'
				        });
			        }

		        })
	        },
	        reset :function(){  //重置
		        clearInterval(this.time);
		        this.h=0;
		        this.m=0;
		        this.ms=0;
		        this.s=0;
		        this.str="00:00:00";
	        },
	        timer(){
		        this.ms=this.ms+200;        //毫秒
		        if(this.ms>=1000){
			        this.ms=0;
			        this.s=this.s+1;        //秒
		        }
		        if(this.s>=60){
			        this.s=0;
			        this.m=this.m+1;       //分钟
		        }
		        if(this.m>=60){
			        this.m=0;
			        this.h=this.h+1;        //小时
		        }
		        this.str =this.toDub(this.h)+":"+this.toDub(this.m)+":"+this.toDub(this.s);
		        //统计共看了多少秒
		        this.times=this.s + this.m*60 + this.h*3600 ;
	        },
	        toDub(n){  //补0操作
		        if(n<10){
			        return "0"+n;
		        }
		        else {
			        return ""+n;
		        }
	        },
            ptInRect() {
        	    let map=new window.BMap.Map(this.$refs.allmap)
	            var pt = new window.BMap.Point(116.404, 39.915);//测试点

	            var pt1 = new window.BMap.Point(116.400, 39.910);//西南脚点

	            var pt2 = new window.BMap.Point(116.410, 39.920);//东北脚点

	            var bds = new window.BMap.Bounds(pt1, pt2); //测试Bounds对象

	            var result = window.BMapLib.GeoUtils.isPointInRect(pt, bds);

	            if (result == true) {

		            alert("点在矩形内");

	            } else {

		            alert("点在矩形外")

	            }
	            map.clearOverlays();

	            var mkr = new window.BMap.Marker(pt);

	            var pts = [];
	            //bds的四个脚点坐标

	            var leftTop = new window.BMap.Point(pt1.lng, pt2.lat);

	            var rightTop = new window.BMap.Point(pt2.lng, pt2.lat);

	            var leftBottom = new window.BMap.Point(pt1.lng, pt1.lat);

	            var rightBottom = new window.BMap.Point(pt2.lng, pt1.lat);

	            pts.push(leftTop);

	            pts.push(rightTop);

	            pts.push(rightBottom);

	            pts.push(leftBottom);

	            var rect = new window.BMap.Polygon(pts);

	            map.addOverlay(mkr);//添加测试点

	            map.addOverlay(rect);//添加测试矩形
            }

        }
	}
</script>

<style scoped>
    .map {
        width: 100%;
        height: 300px;
    }
</style>