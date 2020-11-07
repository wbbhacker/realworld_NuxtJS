<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <!-- TODO :to="{name:'home'}" 的时候 失效 -->
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>

              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                  >Global Feed</nuxt-link
                >
              </li>

              <li class="nav-item" v-if="tag" :class="{ active: tag }">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag'
                    }
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
                ><img src="/head.jpg" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | data('MMM DD, YYYY')
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onFavourite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.body }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ active: pageNum === page }"
                v-for="pageNum in totalPage"
                :key="pageNum"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: pageNum,
                      tag: tag,
                      tab: tab
                    }
                  }"
                >
                  {{ pageNum }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- / 分页列表 -->
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                :to="{ name: 'home', query: { tag: tag, tab: 'tag' } }"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getTag,
  getFeed,
  deleteFavorite,
  addFavorite
} from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'homeIndex',
  async asyncData({ query, store }) {
    const limit = 20
    const page = Number.parseInt(query.page) || 1
    const { tag } = query
    const tab = query.tab || 'global_feed'
    const loadArticles =
      store.state.user && tab === 'your_feed' ? getFeed : getArticles
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        tag,
        limit,
        offset: (page - 1) * limit
      }),
      getTag()
    ])
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data

    articles.forEach(article => (article.favoriteDisabled = false))

    return {
      articles,
      articlesCount,
      limit,
      page, //当前页
      tag, // 当前tag
      tags, // 总tag
      tab: tab // 区分tab
    }
  },
  data: () => {
    return {}
  },
  watchQuery: ['page', 'tag', 'tab'], // 监听tab，以区分Your Feed 和 Global Feed
  computed: {
    ...mapState(['user']),
    totalPage: function() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavourite(article) {
      // console.dir(article)
      article.favoriteDisabled = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style></style>
