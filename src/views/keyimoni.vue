<template>
    <div>

        <div id="content" class="content">
            <div class="left l">
                <fieldset>
                    <legend>驾驶员考试</legend>
                    <span>第 4 考台</span>
                </fieldset>
                <div class="h8"></div>
                <fieldset>
                    <legend>考生信息</legend>

                    <p>考生姓名：英格<br>
                        性　　别：男<br>
                        考试科目：科目一<br>
                        考试车型：C1、C2<br>
                        考试原因：初次申领<br>
                    </p>
                </fieldset>
                <div class="h8"></div>
                <fieldset>
                    <legend>剩余时间</legend>
                    <div id="viewtime"><font id="id_time" color="red"><b>{{min}}：{{second}}</b> </font></div>
                </fieldset>
            </div>
            <div class="centerks l">
                <fieldset>
                    <legend>本项练习共计 <font id="id_count"><b>100</b> </font> 题</legend>
                    <div class="st">
                        <p hidden id="iid">{{kaotis[numflag-1].iid}}</p>
                        <p class="title"><font id="id_qus"><b id="numshow">{{numflag}}.{{kaotis[numflag-1].icontent}}</b> </font></p>
                        <p id="id_ans1">{{kaotis[numflag-1].ioption1}}</p>
                        <p id="id_ans2">{{kaotis[numflag-1].ioption2}}</p>
                        <p id="id_ans3">{{kaotis[numflag-1].ioption3}}</p>
                        <p id="id_ans4">{{kaotis[numflag-1].ioption4}}</p>

                    </div>
                    <div class="da">
<!--                        <div class="dati">您的答案:<b style="color: #2c629e">{{this.userans[numflag-1]}}</b>-->
<!--

                        </div>-->
                        <div class="dati">您的答案: <font id="id_myans" size="4" color="#8a2be2">{{this.userans[numflag-1]}}<b id="myanswer"></b></font> <font id="id_myans_tf"></font>
                            <font  size="4" v-show="userans[numflag-1]===kaotis[numflag-1].irightkey" style="color: #0FCE40"><b>√</b></font>
                        <font size="4" v-show="userans[numflag-1]!==undefined&&userans[numflag-1]!==kaotis[numflag-1].irightkey" style="color: #FF0000">      正确答案：{{kaotis[numflag-1].irightkey}}</font>

                        </div>
                        <div v-if="userans[numflag-1]==null" id="id_myans_select" style="padding-right:5px;" align="right">
                            <a v-on:click="selected('A')"><img src="http://image.jsyst.cn/jiaxiao/km/A.gif" border="0"></a>
                            <a v-on:click="selected('B')"><img src="http://image.jsyst.cn/jiaxiao/km/B.gif" border="0"></a>
                            <a v-on:click="selected('C')" v-show="kaotis[numflag-1].ioption3!==''"><img src="http://image.jsyst.cn/jiaxiao/km/C.gif" border="0"></a>
                            <a v-on:click="selected('D')" v-show="kaotis[numflag-1].ioption4!==''"><img src="http://image.jsyst.cn/jiaxiao/km/D.gif" border="0"></a>
                    </div>
                    </div>
                </fieldset>
                <div class="h8"></div>
                <dl>
                    <dt>
                        <fieldset>
                            <legend>提示信息</legend>
                            <div>交卷后通过题号颜色显示回答正确错误，便于学员查看考试情况。</div>
                        </fieldset>
                    </dt>
                    <dd><a v-on:click="last" ><img src="http://image.jsyst.cn/jiaxiao/km/pre.gif" border="0"></a>
                        <a v-on:click="next" ><img src="http://image.jsyst.cn/jiaxiao/km/next.gif" border="0"></a>
                        <a v-on:click="open"><img src="http://image.jsyst.cn/jiaxiao/km/Commit.gif" border="0"></a>
                    </dd></dl>
            </div>
            <div class="right r">
                <fieldset>
                    <legend>答题信息</legend>
                    <dl >
                        <dd  v-for="count in 100" v-bind:id="count" v-on:click="configflag(count)" ><strong>{{count}}</strong>
                            <div></div>
                        </dd>

                        <dt class="clear"></dt>
                    </dl>
                </fieldset>
            </div>
            <div class="clear"></div>
            <div class="h8"></div>
            <div id="id_fsum" style="color:red;font-size:14px;" align="center">
            </div>

            <fieldset>
                <legend>考试图片信息</legend>
                <div id="id_bmp" style="padding-right:20px;"><img alt v-bind:src="picurl" border="0"></div>
            </fieldset>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script >
	import axios from 'axios';
	/* eslint-disable*/
	import '../../utils/jquery-3.4.1.js'
	import { Message} from 'element-ui';
	export default {
		name: "keyishunxu",
		data(){
			return{
				msg:'hello',
				numflag:1,
				kaotis:[100],
                nowid:1,
                userans:new Array(100),
				picurl:"",
				score:0,
                wrongsum:0,
				day: '0',
				hour: '00',
				min: '00',
				second: '00',
                isOver:false,
                end:'',
			}
		},
		created() {

			const _this=this;
			axios.get('http://localhost:8181/springboot/byRand/1').then(function (resp) {
				_this.kaotis=resp.data;
				//console.log(resp.data);
			});
			this.picurl=this.kaotis[this.numflag-1].picurl;
			this.initalert();



		},
        watch:{
            "$route":function(to,from){ //监听路由变化
	            this.isOver=true;
            }
        },
		methods:{

			initalert:function(){
				this.$alert('按交管部门通知，科目一考试系统全面更新。全真模拟考试下不能修改答案，每做一题，系统自动计算错误题数，及格标准为90分。', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						let date = new Date();
						// 设置截止时间
						let endDate = new Date(date.setMinutes(date.getMinutes()+50)) // this.curStartTime需要倒计时的日期
						this.end = endDate.getTime();
						this.countTime();
					}

                });
            },
			countTime:function () {
				// 获取当前时间
				let date = new Date();
				let now = date.getTime();
				// 时间差
				let leftTime = this.end - now;

				// 定义变量 d,h,m,s保存倒计时的时间
				if (leftTime >= 0&&this.isOver===false) {

					// 天
					this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
					// 时
					let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
					this.hour = h < 10 ? '0' + h : h
					// 分
					let m = Math.floor(leftTime / 1000 / 60 % 60)
					this.min = m < 10 ? '0' + m : m
					// 秒
					let s = Math.floor(leftTime / 1000 % 60)
					this.second = s < 10 ? '0' + s : s
				} else {
					this.day = 0
					this.hour = '00'
					this.min = '00'
					this.second = '00'
				}
				// 等于0的时候不调用
				if (Number(this.min) === 0 && Number(this.second) === 0) {
					if (this.isOver===false) {
						this.isOver=true;
						alert("时间到！自动交卷");
						this.open();
					}
				} else {
					// 递归每秒调用countTime方法，显示动态时间效果,
					setTimeout(this.countTime, 1000)
				}
			},
			selected:function (msg) {
				if (this.isOver){
					this.$confirm('您已交卷，无法继续做题！是否重新考试？',{
						confirmButtonText: '重新考试',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						window.location.reload()
					}).catch(() => {

					});
					return;
                }
				this.userans[this.numflag-1]=msg;
				if (msg===this.kaotis[this.numflag-1].irightkey) {
                    this.score+=1;
					document.getElementById(this.numflag).style.backgroundColor="#5eac11";
				}else {

					document.getElementById(this.numflag).style.backgroundColor="#ac1f11";
					axios.post('http://localhost:8181/springboot/cuotiAdd',{
						cid:'2',
                        iid:document.getElementById("iid").innerText,
                        kemu:'ky'
                    }).then(function (res) {
                        console.log(res);
					})
				}

				this.next();
			},
			configflag:function (msg) {
					this.numflag= parseInt(msg);
					this.picurl=this.kaotis[this.numflag-1].picurl;


			},

			open:function() {
				let msg;
				let _this=this;
				if (this.score<90) {
					msg="很遗憾考试未通过/(ㄒoㄒ)/~~"
                }else{
					msg="考试成功！<(￣︶￣)↗[GO!]"
                }
				this.$alert('确定交卷吗？', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						this.isOver=true;
						axios.post('http://localhost:8181/springboot/insertscore',{
							cid:'2',
							score:_this.score,
							kemu:'1'
						}).then(function (res) {
							console.log(res);
						});
						this.$confirm('您的考试成绩为：【'+this.score+"】"+msg, '得分', {
							confirmButtonText: '重新考试',
							cancelButtonText: '知道了',
							type: 'warning'
						}).then(() => {
							window.location.reload()
						}).catch(() => {

						});
					}
				})
			},
			last:function () {
				if (this.numflag>=1) {

					this.numflag-=1;
					this.pagereload();
				}else {
					alert("已到第一题")
				}
			},
			next:function () {

				if (this.numflag<this.kaotis.length) {
					this.numflag+=1;
					this.pagereload();

				}else{
					alert("已到最后一题")
				}
			},
			pagereload:function () {

				this.picurl=this.kaotis[this.numflag-1].picurl;
				document.getElementById("myanswer").innerHTML="";
				//document.getElementById("id_myans_tf").innerHTML="";

			}
		}
	}
</script>

<style scoped>

</style>