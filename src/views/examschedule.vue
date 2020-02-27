<template>
    <div>
        <br><br>

       <table id="datatable" align="center" border="solid 1px">
           <tr>
               <td>科目</td>
               <td class="time">考试时间</td>
               <td>考试分数</td>
               <td class="time">通过时间</td>
           </tr>
           <tr>
               <td>科目一</td>
               <td class="time"> {{this.tableData.eadopttime1}}</td>
               <td>{{this.tableData.etestscore1}}</td>
               <td class="time">{{this.tableData.eadopttime1}}</td>
           </tr>
           <tr>
               <td>科目二</td>
               <td class="time">{{this.tableData.eadopttime2}}</td>
               <td>{{this.tableData.etestscore2}}</td>
               <td class="time">{{this.tableData.eadopttime2}}</td>
           </tr>
           <tr>
               <td>科目三</td>
               <td class="time">{{this.tableData.eadopttime3}}</td>
               <td>{{this.tableData.etestscore3}}</td>
               <td class="time">{{this.tableData.eadopttime3}}</td>
           </tr>
           <tr>
               <td>科目四</td>
               <td class="time">{{this.tableData.eadopttime4}}</td>
               <td>{{this.tableData.etestscore4}}</td>
               <td class="time">{{this.tableData.eadopttime4}}</td>
           </tr>
       </table>
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

		created() {

			const _this=this;
			axios.get('http://localhost:8181/springboot/selectExamschedule/2').then(function (resp) {
				console.log(resp.data);
				_this.tableData=resp.data;
				// _this.total=resp.data.count;
			});

		}
	}
</script>

<style scoped>
    #datatable{
       font-size: 20px;
    }
    td{
        width: 150px;
        height: 40px;
    }
    .time{
        width: 220px;
    }
</style>