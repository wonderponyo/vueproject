<template>
<div>
    <br><br>
    <el-radio-group id="select" v-model="radio1" @change="selectone">
        <el-radio-button label="1">科目一</el-radio-button>
        <el-radio-button  label="4">科目四</el-radio-button>

    </el-radio-group>
    <br><br>
    <el-table id="table"
            :data="tableData"
            border
            style="width: 28%">
        <el-table-column
                prop="testtime"
                label="考试时间："
                width="180">
        </el-table-column>
        <el-table-column
                prop="score"
                label="考试分数"
                width="180">
        </el-table-column>

    </el-table>
    <br><br>
    <el-pagination
            id="fenye"
            background
            layout="prev, pager, next"
            :page-size="pagesize"
            @current-change="pagechange"
            :total="total">
    </el-pagination>
</div>
</template>

<script>
	import axios from 'axios';
	/* eslint-disable*/
	import '../../utils/jquery-3.4.1.js'
	export default {
		name: "showscore",
     data() {
		return {
			radio1: '1',
			tableData: [],
            kemunow:'',
            total:0,
            pagesize:5

		}
	},
        methods:{
	        selectone:function(res){

                this.kemunow=res;
                let _this=this;
		        axios.get('http://localhost:8181/springboot/selectScore/'+this.kemunow+'/1/2').then(function (resp) {
			        console.log(resp.data);
			        _this.tableData=resp.data.data;
			        _this.total=resp.data.count;

		        });
            },
	        pagechange:function (current) {
		        let _this=this;
		        axios.get('http://localhost:8181/springboot/selectScore/'+this.kemunow+'/'+current+'/2').then(function (resp) {
			        console.log(resp.data);
			        _this.tableData=resp.data.data;
			        _this.total=resp.data.count;

		        });

	        }
        },
    created() {

        const _this=this;
        // 科目/页数/cid
        axios.get('http://localhost:8181/springboot/selectScore/1/1/2').then(function (resp) {
	        console.log(resp.data);
	        _this.tableData=resp.data.data;
            _this.total=resp.data.count;
        });

    }
	}
</script>

<style scoped>
    #table{
        margin-left: 30%;
    }
    #fenye{
        margin-right: 13%;
    }
    #select{
        margin-left: 3%;
    }
</style>