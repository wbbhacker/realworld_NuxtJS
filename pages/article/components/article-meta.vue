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
      <a href="" class="author"></a>
      <span class="date">{{ article.createdAt | data('MMM DD, YYYY') }}</span>
    </div>

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
  </div>
</template>

<script>
import { followUser,unfollowUser } from '@/api/user'
import { deleteFavorite,addFavorite } from '@/api/article'

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
  created() {
    console.log(this.article)
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
    }
  }
}
</script>

<style></style>
