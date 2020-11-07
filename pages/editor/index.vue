<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  :disabled="editorDisable"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  :disabled="editorDisable"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  :disabled="editorDisable"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tags"
                  :disabled="editorDisable"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                :disabled="editorDisable"
                @click.prevent="createArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createArticle , updateArticle } from '@/api/article'

export default {
  middleware: 'authenticated',
  name: 'EditorIndex',
  data: () => {
    return {
      update:false,
      editorDisable:false,
      tags:'',
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  created(){
    const { article } = this.$route.params
    if(article){
      this.article.title = article.title
      this.article.description = article.description
      this.article.body = article.body
      this.slug = article.slug
      this.update = true
    }
  },
  watch:{
    tags:function(tags){
      this.article.tagList = tags.split(',')
    }
  },
  methods:{
    async createArticle(){
      if(this.editorDisable) return
      this.editorDisable = true
      const { title,  description, body,tagList } = this.article

      const { data } = this.update ? 
                await updateArticle(this.slug ,{
                  title,
                  description,
                  body,
                  tagList
                }) :
                await createArticle({
                  title,
                  description,
                  body,
                  tagList
                })
      this.editorDisable = false
      this.$router.push({ name:'article',params: { slug: data.article.slug}})
    }
  },
}
</script>

<style></style>