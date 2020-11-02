<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in': 'Sign up'}} </h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"> Need an account? </nuxt-link>
            <nuxt-link v-else to="/login"> Have an account? </nuxt-link>
          </p>

          <ul class="error-messages">
            <!-- template 不会被渲染出来 -->
            <template v-for="(errorItems, itemsName) in errors">  
               <li v-for="(errorReason , errorIndex) in errorItems" :key="errorIndex">
                 {{itemsName}} {{errorReason}}
               </li>
            </template>
          </ul>

          <form @submit.prevent="submitClick">
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email"  class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required maxlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
             {{ isLogin ? 'Sign in': 'Sign up'}} 
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import { login, register } from '@/api/user'

import request from '@/utils/request'
export default {
  name: 'loginIndex',
  data(){
    return {
      user:{
        username:'',
        email:'',
        password:''
      },
      errors:{} // 错误信息
    }
  },
  created(){
    // console.log(request)
  },
  computed:{
    isLogin(){
      return this.$route.name === 'login'
    }
  },
  methods:{

    async submitClick(){

      try {
        const data = this.isLogin ?  
        await login({
          user:this.user
        }) :
        await register({
          user:this.user
        })

        this.errors = {}
        this.$router.push('/')

      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
      }
    }
    
  }
}
</script>

<style>

</style>