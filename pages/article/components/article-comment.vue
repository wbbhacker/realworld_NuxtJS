<template>
  <div>
    <form class="card comment-form">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="commentBody"></textarea>
          </div>
          <div class="card-footer">
            <img :src="user.image" class="comment-author-img" />
            <button class="btn btn-sm btn-primary" @click.prevent="onComment" >
             Post Comment
            </button>
          </div>
        </form>
        
        <div class="card" v-for="comment in comments" :key="comment.id">
          <div class="card-block">
            <p class="card-text">{{ comment.body }}</p>
          </div>
          <div class="card-footer">

            <nuxt-link
              class="comment-author"
              :to="{
                name: 'profile',
                params:{
                  username:comment.author.username
                }
              }"
            >
              <img :src="comment.author.image" class="comment-author-img" />
            </nuxt-link>
            &nbsp;
            <nuxt-link
              class="comment-author"
              :to="{
                name: 'profile',
                params:{
                  username:comment.author.username
                }
              }"
            >
              {{ comment.author.username }}
            </nuxt-link>
            <span class="date-posted">{{  comment.createdAt | data('MMM DD, YYYY') }}</span>
          </div>
        </div>

        
  </div>
</template>

<script>
import { getComments,addComment } from '@/api/article'
import {mapState} from 'vuex'

export default {
  name:'ArticleComment',
  props:{
    article:{
      type:Object,
      required:true
    }
  },
  computed:{
    ...mapState(['user'])
  },
  data(){
    return {
      comments:[], //文章
      commentBody:'',
      commentDisabled:false,
    }
  },
  async mounted(){
    const {data} = await getComments(this.article.slug)
    this.comments  = data.comments
    console.log(data)
  },
  methods:{
    async onComment(){
      if(this.commentDisabled) return
      this.commentDisabled = true
      const { data } = await addComment(this.article.slug, this.commentBody)
      this.comments.unshift(data.comment)
      this.commentDisabled = false

    }
  }
}
</script>

<style>

</style>