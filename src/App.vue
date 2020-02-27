<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
      <el-container>
          <el-header>
              <span>学员端</span>
          </el-header>

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router @select="handleSelect">

          <el-submenu  index="1">
              <template slot="title">科目一</template>
              <el-menu-item index="/keyimoni">模拟考试</el-menu-item>
              <el-menu-item index="/keyicuoti">错题练习</el-menu-item>
              <el-menu-item index="/keyikanti">看题模式</el-menu-item>
              <el-menu-item index="/keyishunxu">顺序练题</el-menu-item>
<!--              <el-submenu index="2-4">-->
<!--                  <template slot="title">选项4</template>-->
<!--                  <el-menu-item index="2-4-1">选项1</el-menu-item>-->
<!--                  <el-menu-item index="2-4-2">选项2</el-menu-item>-->
<!--                  <el-menu-item index="2-4-3">选项3</el-menu-item>-->
<!--              </el-submenu>-->
          </el-submenu>
          <el-menu-item index="/keer">科目二</el-menu-item>
          <el-menu-item index="/kesan">科目三</el-menu-item>
          <el-submenu index="4">
              <template slot="title">科目四</template>
              <el-menu-item index="/kesimoni">模拟考试</el-menu-item>
              <el-menu-item index="/kesicuoti">错题练习</el-menu-item>
              <el-menu-item index="/kesikanti">看题模式</el-menu-item>
              <el-menu-item index="/kesishunxu">顺序练题</el-menu-item>

          </el-submenu>

          <el-menu-item index="/personcenter"><a href="/personcenter">个人中心</a></el-menu-item>

      </el-menu>
      <div class="line"></div>
      </el-container>
      <router-view/>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
<style scoped>
  @import './assets/css/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .el-menu{
      display:flex;
      justify-content: space-between;
      align-items: center;
  }
.el-header{
    background-color: #67c5c0;
    display:flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
