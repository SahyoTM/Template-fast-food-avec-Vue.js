<template lang="html">
  <div class="loading-page" v-if="loading">
    <div class='d-flex justify-center'>
        <lottie  :height="400" :options="lottieOptions" @animCreated="handleAnimation" />
    </div>
  </div>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "@/assets/animation/loading_bruger.json";

  export default {
    components: {
      lottie
    },
    data(){
    return {
        anim: null, // for saving the reference to the animation
        lottieOptions: {
            animationData: animationData.default
        },
        loading: false
        }
    },
    mounted(){
      const loader = this.$cookies.get('loading')
      if(loader === undefined){
        console.log("loader = ", loader)
        finish()
        console.log("loading = ", this.loading)
    }
    },
    methods: {
      start() {
        this.loading = true
        this.$cookies.set('loading', 'played', {
          maxAge: 60 * 60
      });
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
    z-index: 1000;
  }
</style>