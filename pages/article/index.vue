<template>
<div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{ article.title }}</h1>

     
      <ArticleMeta :article="article" ></ArticleMeta>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.bodyMarkdown">
      </div>
    </div>

    <hr />

    <div class="article-actions">

      <ArticleMeta :article="article" ></ArticleMeta>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <ArticleComment :article="article" ></ArticleComment>
        
      </div>

    </div>

  </div>

</div>
</template>

<script>

import { getArticle} from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComment from './components/article-comment'

export default {
  name: 'ArticleIndex',
  components:{
    ArticleMeta,
    ArticleComment
  },
  data(){

    return {
    }
  },
  async asyncData({params, store}){
    const { slug } = params
    const { data }= await getArticle(slug) 
    const {  article } =  data
    const md = new MarkdownIt()
    // article.body = md.render(article.body)
    article.bodyMarkdown = md.render(article.body)
    // console.log(article)
    return {
      article
    }
  },
   head() {
      return {
        title: `${this.article.title} - RealWorld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    },
   
}
</script>

<style>

</style>