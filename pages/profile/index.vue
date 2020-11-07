<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>

            <template v-if="profile.username === user.username">
              <nuxt-link
                class="btn btn-sm btn-outline-secondary action-btn"
                to="/settings"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </nuxt-link>
            </template>
            <template v-else>
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                @click.prevent="onFollow"
                :disabled="disabledFollow"
              >
                <i class="ion-plus-round"></i>
                &nbsp;
                {{ profile.following ? 'Unfollow' : 'Follow' }} Eric Simons
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="/head.jpg"/></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="/head.jpg"/></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, followUser, unfollowUser } from '@/api/user'
import { mapState } from 'vuex'

export default {
  middleware: 'authenticated',
  name: 'UserProFile',
  data() {
    return {
      disabledFollow: false
    }
  },
  async asyncData({ params }) {
    const { username } = params
    const { data } = await getProfile(username)
    console.log(data)
    return {
      profile: data.profile
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async onFollow() {
      if(this.disabledFollow) return
      this.disabledFollow = true
      const follow = this.profile.following ? unfollowUser : followUser
      const {data} = await follow(this.profile.username)
      this.profile.following = data.profile.following
      this.disabledFollow = false
    }
  }
}
</script>

<style></style>
