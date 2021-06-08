<template>
  <v-app id="index">
    <LikeBar />
    <br>
    <div class="container">
      <h1 class="title_articles">ALL</h1>
      <input type="text" v-model="search" placeholder="🔎 Recherchez le plat que vous souhaitez">
      <span v-if="search && filteredPlats.length >= 1" style="color:#30334F;font-size:1.5rem;font-weight:700;" class="text-uppercase">
        {{filteredPlats.length}} Résultat<span v-if="filteredPlats.length >= 2">s</span>
      </span>
      <v-row no-gutters>
        <v-col v-for="plat in filteredPlats" :key="plat.post_name" cols="6" md="4" max-height="300px">
          <v-scroll-x-transition appear>
            <v-card class="mx-auto" max-width="400">
              <v-img class="white--text align-end" max-height="200px" :src="`${plat.acf.image.sizes.medium}`">
                <v-card-title>{{plat.post_title}} - {{plat.acf.prix}} €</v-card-title>
              </v-img>

              <v-card-text class="text--primary">
                <div class="card-icons">
                  <div class="like-container">
                    <input type="checkbox" name="checkbox" v-bind:id="plat.ID">
                    <label v-bind:for="plat.ID" :value="plat.ID" v-model="liked" @click="setLikeCookie()">
                      <v-icon>fa-heart</v-icon>
                    </label>
                  </div>
                  <div class="add-to-cart">
                    <button>
                      <v-icon>fa-shopping-cart</v-icon>
                    </button>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-scroll-x-transition>
        </v-col>
      </v-row>

      <!-- <div v-if="filteredPlats.length == []">
        <p>Désolé</p>
      </div> -->
    </div>
  </v-app>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "@/assets/animation/choose_food.json";
import axios from 'axios';

  export default {
    data(){
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: {
        animationData: animationData.default
      },
      plats: [],
      search:'',
      liked:[],
    }
  },
  mounted(){
    axios.get("https://api-template.theo-meyer.com/wp-json/wp/v2/plat").then(response => 
    this.plats = response.data);
    console.log(this.recettes);
  },

  computed: {
    filteredPlats() {
      //this.$nuxt.$on('searchEvent', () => {
        return this.plats.filter(plat => {
          return plat.post_name.indexOf(this.search.toLowerCase()) > -1
          console.log(search)
        })
      }
    },
    methods: {
    setLikeCookie() {
      document.addEventListener('input', () => {
        setTimeout(() => {
          app.$cookiz.set('like', JSON.stringify(this.liked)); 
        }, 300);
      })
    },
    }
  }
</script>

<style>
.container{
  padding-top:3rem;
}

.title_articles{
  color:#30334F;
  padding-left: 4rem;
  font-size:3rem;
}

input{
  color:#30334F;
  margin-left: 4rem;
  font-size:1.5rem;
  width: 30rem;
  margin-bottom: 1rem;
}

.v-card{
  margin-bottom:1rem;
}

.card-icons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 40px;
}

.card-icons i {
  padding: 3px 5px;
  transition: 0.2s;
  cursor: pointer;
}

.card-icons i:hover {
  animation: scaler 0.8s infinite linear;
}

.card-icons .fa-heart:hover {
  color: rgba(251, 38, 38, 0.5);
}

.card-icons .fa-shopping-cart {
  font-size: 1.5rem;
  color: #30334F;
}

.card-icons .fa-shopping-cart:hover {
  filter: brightness(125%);
}

.card-icons .like-container input {
  display: none;
}

.card-icons .like-container input:checked + label i {
  color: #fb2626;
  animation: heart 1.3s forwards ease;
}
@keyframes heart {
  0% {
    filter: hue-rotate(0deg);
    transform: scale(1);
  }
  50% {
    filter: hue-rotate(-270deg);
    transform: scale(1.3);
  }
  100% {
    filter: hue-rotate(0deg);
    transform: scale(1);
  }
}
</style>