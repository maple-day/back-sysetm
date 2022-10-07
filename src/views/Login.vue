<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-button :icon="User"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter="submitForm(login)">
            <template #prepend>
              <el-button :icon="Lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm(login)">登录</el-button>
        </div>
        <!--        <p class="login-tips">Tips : 用户名和密码随便填。</p>-->
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import {useTagsStore} from '../stores/tags';
import {usePermissStore} from '../stores/permiss';
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import type {FormInstance, FormRules} from 'element-plus';
import {Lock, User} from '@element-plus/icons-vue';
import {user_info_key} from '../const/cachekey'
import {login_uri} from '../const/httpuri'
import {httpPost} from "../api";
import {loginToken, ResponseData, userInfo} from "../dto";
import {ResponsEnum} from "../enums/httpEnum";


interface LoginInfo {
  username: string;
  password: string;
}

const router = useRouter();
const param = reactive<LoginInfo>({
  username: 'admin',
  password: '123123'
});

const rules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [{required: true, message: '请输入密码', trigger: 'blur', min: 5}]
};


const permiss = usePermissStore();
const login = ref<FormInstance>();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {

    if (valid) {
      // const result = await loginHttp({username: "admin", password: "123123"});

      const loginData: ResponseData<loginToken> = await httpPost(param, login_uri);

      if (loginData.data && loginData.code === ResponsEnum.SUCCESS) {
        // console.log("返回:", result);
        localStorage.setItem("token", loginData.data)
        console.log("token:", loginData.data);
        // const result2: ResponseData<userInfo> = await httpPost({username: "admin", password: "123123"}, "/userInfo");
        // console.log("返回address:", result2.data.address)
        // console.log("返回phone:", result2.data.phone)
        // console.log("登录成功")

        ElMessage.success('登录成功');
        localStorage.setItem(user_info_key, param.username);
        const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'user'];
        permiss.handleSet(keys);
        localStorage.setItem('ms_keys', JSON.stringify(keys));
        await router.push('/');
      } else {
        ElMessage.error(loginData.msg);
        return false;
      }
    } else {
      ElMessage.error('登录失败');
      return false;
    }
  });


};

const tags = useTagsStore();
tags.clearTags();

</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
