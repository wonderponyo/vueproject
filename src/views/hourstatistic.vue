<template>
    <div>

        <el-progress type="circle" :percentage=ky></el-progress><div>科一总学时：{{this.kytime}}</div>
        <el-progress type="circle" :percentage=ke></el-progress><div>科二总学时：{{this.ketime}}</div>
        <el-progress type="circle" :percentage=ksan></el-progress>  <div>科三总学时：{{this.ksantime}}</div>
        <el-progress type="circle" :percentage=ks> </el-progress>  <div>科四总学时：{{this.kstime}}</div>


    </div>
</template>

<script>
	import axios from 'axios';
	/* eslint-disable*/
	import '../../utils/jquery-3.4.1.js'
	export default {
		data(){
			return{
                ky:0,
				ke: 0,
				ksan:0 ,
                ks:0,
                kytime:'',
                ketime:'',
                ksantime:'',
                kstime:''

			}
		},
		created() {

			const _this=this;
			axios.get('http://localhost:8181/springboot/getclasshours/1').then(function (resp) {

				_this.kytime=resp.data.eclasshour1,
                    _this.ketime=resp.data.eclasshour2,
                _this.ksantime=resp.data.eclasshour3,
					_this.kstime=resp.data.eclasshour4,
				_this.ky=parseInt(resp.data.eclasshour1)/12*100;
				_this.ke=parseInt(resp.data.eclasshour2)/16*100;
				_this.ksan=parseInt(resp.data.eclasshour3)/24*100;
				_this.ks=parseInt(resp.data.eclasshour4)/10*100;
				console.log(resp.data);

			});





		}
	}
</script>

<style scoped>

</style>