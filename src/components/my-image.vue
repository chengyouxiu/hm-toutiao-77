<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <div class="img-btn">
      <img :src="value || defaultImage" @click=" openDialog()" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <span>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="image">
            <el-radio-group v-model="reqParams.collect" @change="collectChange" size="mini">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <div class="img-list">
              <div
                class="img-item"
                :class="{selected:selectedImageUrl===item.url}"
                @click="selectedIamge(item.url)"
                v-for="item in images"
                :key="item.id"
              >
                <img :src="item.url" alt />
              </div>
            </div>
            <el-pagination
              v-if="total > reqParams.per_page"
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="changePager"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="upload">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :show-file-list="false"
              :on-success="handleSuccess"
              :headers="uploadHeaders"
              name="image"
            >
              <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>>
<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      // 记录选择图片的地址
      selectedImageUrl: null,
      uploadHeaders: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传的地址
      uploadImageUrl: null,
      defaultImage
    }
  },
  methods: {
    confirmImage () {
      this.dialogVisible = false
      if (this.activeName === 'image') {
        this.$emit('input', this.selectedImageUrl)
      } else {
        this.$emit('input', this.uploadImageUrl)
      }
    },
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    selectedIamge (url) {
      this.selectedImageUrl = url
    },
    openDialog () {
      this.dialogVisible = true
      this.uploadImageUrl = null
      this.selectedImageUrl = null
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    }
  }
}
</script>
<style scoped lang="less">
.my-image {
    display: inline-block;
    margin-right: 20px;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  position: relative;
  width: 140px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  &.selected {
    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
