
<template>
    <div>

        <div id="content" class="content">
            <div class="left l">
                <fieldset>
                    <legend>驾驶员考试</legend>
                    <span>第 1 考台</span>
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
                    <legend>输入题号跳转</legend>
                    <div id="viewtime">到 <input id="numinput" ref="numflag" type="text" style="border: 1px solid rgb(238, 102, 0); width: 30px; height: 20px;" v-on:keyup="configflag"> 题</div>
                </fieldset>
            </div>
            <div class="centerlx l">
                <fieldset>
                    <legend>错题练习共计 <font id="id_count"><b>{{kaotis.length}}</b> </font> 题 回答正确自动进入下一题</legend>
                    <div class="st">
                        <p class="title"><font id="id_qus"><b id="numshow">{{numflag}}.{{kaotis[numflag-1].icontent}}</b>       </font>  </p>
                        <p id="id_ans1">{{kaotis[numflag-1].ioption1}}</p>
                        <p id="id_ans2">{{kaotis[numflag-1].ioption2}}</p>
                        <p id="id_ans3">{{kaotis[numflag-1].ioption3}}</p>
                        <p id="id_ans4">{{kaotis[numflag-1].ioption4}}</p>

                    </div>
                    <div class="da">

                        <div class="dati">您的答案: <font id="id_myans" size="4" color="red"><b id="myanswer"></b></font> <font id="id_myans_tf"></font></div>
                        <div id="id_myans_select" style="padding-right:5px;" align="right">
                            <span style="color: #2c629e">本题做错：{{kaotis[numflag-1].sum}}次</span>
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
                            <div><select id="id_config" name="id_config" >
                                <option value="1">自动</option>
                                <option value="2">手动</option>
                            </select> 跳转下一题 | 本功能需练习5小时 | 当前为<font color="#FF0000;">C1\C2小车</font>题库 <select name="select" style="width:90px;font-size:12px;" language="javascript" onchange="location.href=this.value ">
                                <option selected="selected">可切换题库</option>
                                <option value="http://km1.jsyst.cn/b/kt/">A2\B2货车</option>
                                <option value="http://km1.jsyst.cn/a/kt/">A1\B1\A3客车</option>
                            </select></div>
                        </fieldset>
                    </dt>
                    <dd><a v-on:click="last" ><img src="http://image.jsyst.cn/jiaxiao/km/pre.gif" border="0"></a> <a v-on:click="next" ><img src="http://image.jsyst.cn/jiaxiao/km/next.gif" border="0"></a></dd></dl>
            </div>
            <div class="clear"></div>
            <div class="h8"></div>
            <fieldset>
                <legend>考试图片信息</legend>
                <div id="id_bmp" style="padding-right:20px;"><img alt v-bind:src="picurl" border="0"></div>
            </fieldset>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: "keyishunxu",
		data(){
			return{
				msg:'hello',
				numflag:1,
				kaotis:[1200],
				picurl:""
			}
		},
		created() {

			const _this=this;
			axios.get('http://localhost:8181/springboot/selectWrong/2/ky').then(function (resp) {
				_this.kaotis=resp.data

			})
			this.picurl=this.kaotis[this.numflag-1].picurl

		},
		methods:{
			selected:function (msg) {
				if (msg===this.kaotis[this.numflag-1].irightkey) {
					this.next();
				}else {
					document.getElementById("myanswer").innerHTML=msg+"<img src='http://image.jsyst.cn/jiaxiao/error.gif' border='0'>";
					document.getElementById("id_myans_tf").innerHTML="正确答案是: <font size='4' color='blue'><b>"+this.kaotis[this.numflag-1].irightkey+"</b></font>";
				}
			},
			configflag:function () {
				if (this.$refs.numflag.value!=="") {

					this.numflag= parseInt(this.$refs.numflag.value);
					this.picurl=this.kaotis[this.numflag-1].picurl;
					document.getElementById("myanswer").innerHTML="";
					document.getElementById("id_myans_tf").innerHTML="";
				}
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
				document.getElementById("numinput").value="";
				this.picurl=this.kaotis[this.numflag-1].picurl;
				document.getElementById("myanswer").innerHTML="";
				document.getElementById("id_myans_tf").innerHTML="";
			}
		}
	}
</script>

<style scoped>

</style>