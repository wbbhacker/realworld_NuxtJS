<template>
  <div class="article-meta">
    <nuxt-link
      class="author"
      :to="{ name: 'profile', params: { username: article.author.username } }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{ name: 'profile', params: { username: article.author.username } }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | data('MMM DD, YYYY') }}</span>
    </div>
    <template v-if="user.username === article.author.username">
      <!-- 我的文章 可编辑删除 -->
      <nuxt-link 
        class="btn btn-outline-secondary btn-sm"
        :to="{name: 'editor', params:{article:article}}"
      >

        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
       <!-- <a class="btn btn-outline-secondary btn-sm"  href="#/editor/test333-6r0ssw">
      </a> -->

      <button class="btn btn-outline-danger btn-sm" @click.prevent="deleteArticle">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <!-- 其他人文章  -->
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
        @click="onFollowing"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{article.author.following ? 'Unfollow' : 'Follow'}} {{ article.author.username }}
      </button>
      &nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
        @click ="onFavourite"
      >
        <i class="ion-heart"></i>
        &nbsp; {{ article.favorited ? 'Unfavorite' : 'Favorite' }} Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script>
import { followUser,unfollowUser } from '@/api/user'
import { deleteFavorite,addFavorite, deleteArticle } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed:{
    ...mapState(['user'])
  },
  created() {
    this.article.author.followDisabled = false
    this.article.favoriteDisabled = false
  },
  methods:{
    async onFollowing(){

      const { author } = this.article

      if(!author.followDisabled){

        author.followDisabled = true
        const isFollow = author.following ? unfollowUser : followUser
        const {data} = await isFollow(author.username)
        author.following = data.profile.following

      }
      author.followDisabled = false

    },
    async onFavourite(){
      const { article } = this
      if(!article.favoriteDisabled ){

        article.favoriteDisabled = true
        const isFavorited = !article.favorited ? addFavorite : deleteFavorite
        const {data} = await isFavorited(article.slug)
        article.favoritesCount += article.favorited ? -1 : 1
        article.favorited = data.article.favorited

      }
      article.favoriteDisabled = false
    },
    async deleteArticle(){
      const {data} = await deleteArticle(this.article.slug)
      this.$router.push({name:'/home'})
    }
  }
}
</script>

<style></style>
