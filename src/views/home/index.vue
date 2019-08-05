<template>
  <el-container class="wrapper">
      <!-- 默认false就是导航栏默认的宽度为200px，点击按钮切换为64px -->
    <el-aside :width="isCollapse?'64px':'200px'">
        <!-- 小logo图片 -->
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <!-- 导航菜单 -->
      <el-menu
          :collapse = isCollapse
          :collapse-transition = "false"
          :default-active="$route.path"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="my-dropdown" @command="changeMenu">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            {{ name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登陆</el-dropdown-item> 跳转页面的方法一 -->
             <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    // 按钮切换时导航栏所显示的大小 iscollapse为false默认宽度为200px
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  // 获取本地用户信息
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    /*   click是原生的点击事件要想在elementui中使用click相当于自定义事件，无法跳转
    //   解决方法一把事件绑定位原生的事件在click后加事件修饰符 .native
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.clearUser()
      this.$router.push({ name: 'login' })
    } */

    // 方法二给el-dropdown绑定自定义事件command事件不加括号是为了接受elementui给的默认参数
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.clearUser()
      this.$router.push({ name: 'login' })
    },
    changeMenu (menuType) {
      // menuType 是变量  值 setting  logout
      this[menuType]()
    }
  }
}
</script>

<style scoped lang='less'>
//标签的名称就是解析后标签的类名
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
}
.my-dropdown {
  float: right;
  img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .el-dropdown-link {
    font-weight: 700;
  }
}
.logo {
  width: 100%;
  height: 60px;
  background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
    140px auto;
}
.miniLogo {
  background-image: url(../../assets/images/logo_admin_01.png);
  background-size: 36px auto;
}
.el-menu {
    border-right: none;
}
</style>
