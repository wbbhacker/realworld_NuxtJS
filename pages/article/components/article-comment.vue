<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="commentBody"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary" @click.prevent="onComment">
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
            params: {
              username: comment.author.username
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
            params: {
              username: comment.author.username
            }
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | data('MMM DD, YYYY')
        }}</span>
        <span class="mod-options" @click.prevent="deleteComment(comment.id)">
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment, deleteComment } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArticleComment',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      comments: [], //文章
      commentBody: '',
      commentDisabled: false
    }
  },
  async mounted() {
      this.getComments()
  },
  methods: {
    async onComment() {
      if (this.commentDisabled) return
      this.commentDisabled = true
      const { data } = await addComment(this.article.slug, this.commentBody)
      this.comments.unshift(data.comment)
      this.commentDisabled = false
      this.commentBody = ''
    },
    async deleteComment(comentId){

      const {data} = await deleteComment(this.article.slug,comentId)
      this.getComments()
      this.$router.push({ name:'home'})

    },
    async getComments(){
      const { data } = await getComments(this.article.slug)
      this.comments = data.comments
    }
  }
}
</script>

<style></style>
