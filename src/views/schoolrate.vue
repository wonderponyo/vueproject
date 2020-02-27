<template>
    <div>
        <br><br> <br><br>
        <span id="msg">您当前驾校为：{{schoolname}}</span><br> <br><br>
        <el-rate
                :disabled="flag"
                @change="rated"
                v-model="value2"
                :colors="colors">
        </el-rate>
        <br><br>
        <el-input
                id="inputarea"
                :disabled="flag"
                style="width: 40%"
                type="textarea"
                :autosize="{ minRows:3, maxRows: 5}"
                placeholder="请输入评价内容"
                v-model="textarea2">
        </el-input> <br><br> <br><br>
        <el-button  :disabled="flag" type="danger" v-on:click="submit" round>提交</el-button>
    </div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				score:'',
				value1: null,
				value2: null,
                flag:false,
                schoolid:'',
                schoolname:'',
                state:'',

				textarea2: '',
				colors: ['#99A9BF', '#F7BA2A', '#ff6810']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
			}
		},
        methods:{
	        rated:function (res) {
                this.score=res;
	        },
            submit:function () {
	        	let _this=this;
	        	let content=document.getElementById("inputarea").value;
	            alert(content);
	        	if (this.score==="") {
			        this.$confirm('请先打分！',{
				        // confirmButtonText: '确定',
				        type: 'warning'
			        });
			        return;
                }
	            axios.post('http://localhost:8181/springboot/insertrate',{
	            	cid:2,
		            // did:this.schoolid,
		            score:this.score,
		            content:content,
                    type:'school'
	            }).then(function (res) {
		           if (res.data==="succ") {
			           _this.$message({
				           message: '评价成功！',
				           type: 'success'
			           });
                   }else {
			           _this.$message({
				           message: '评价提交失败！',
				           type: 'error'
			           });
                   }

	            })
            }
        },
		created() {

			const _this=this;
			// 科目/页数/cid
			axios.get('http://localhost:8181/springboot/getdrivingschool/2').then(function (resp) {
				console.log(resp.data);
				_this.schoolid=resp.data.did;
				_this.schoolname=resp.data.dname;
				if (resp.data.schoolrated==="1") {
					_this.$notify.error({
						title: '您已完成评价,无法再次评价!',
						offset: 200
						// message: h('i', { style: 'color: teal'}, '科目'+_this.kemunow)
					});
					_this.flag=true;
                }else if (parseInt(resp.data.eorderstate)<5) {
					_this.$notify.error({
						title: '您尚未完成全部考试，无法进行评价！',
						offset: 200
						// message: h('i', { style: 'color: teal'}, '科目'+_this.kemunow)
					});
					_this.flag=true;
                }

			});

		}
	}
</script>

<style scoped>
#msg{
    font-size: 20px;
}
</style>