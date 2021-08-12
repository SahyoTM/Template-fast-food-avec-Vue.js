<template>
    <v-main>
      <v-container fluid>
        <v-app id="index">
          <LikeBar />
          <br>
          <v-snackbar v-model="snackbar" :timeout="-1" shaped dark>
            We use cookies to ensure you get the best experience on our website.

            <template v-slot:action>
              <v-btn color="pink" text @click="declineCookie()">
                Decline
              </v-btn>
              <v-btn color="green" text @click="acceptCookie()">
                Accept
              </v-btn>
            </template>

          </v-snackbar>
          <div class="container">
            <div class="container-interne">
              <v-row>
                <div class="choose-container col-10">
                  <v-radio-group v-model="categorieChoose" row>
                    <div v-for="categorie in categories" :key="categorie" class="categorie-container">
                      <v-radio type="radio" name="radio" v-bind:id="categorie.name" v-bind:value="categorie.name">
                      </v-radio>
                      <label v-bind:for="categorie.name" :value="categorie.name" class="label_categorie">
                        <img height="64px" :src="require(`@/assets/categorie/${categorie.name}.png`)" style="" />
                        <!-- <p>{{categorie.name}}</p> -->
                      </label>
                    </div>
                  </v-radio-group>
                </div>
                <div class="promo-container col-2">
                  <v-card class="mx-auto" max-width="344" outlined>
                    <v-list-item three-line>


                      <img src="@/assets/promo.png" height="128px" alt="" class="mx-auto">
                    </v-list-item>

                    <v-card-actions class=" font-weight-bold" style="color:#30334F;">
                      - 50% sur tous nos burgers !
                    </v-card-actions>
                  </v-card>

                </div>
              </v-row>
              <h1 class="title_articles text-uppercase">{{ categorieChoose || 'null' }} <span
                  v-if="filteredPlats.length >= 1 && categorieChoose !='all'"
                  style="color:#30334F;font-size:1.5rem;font-weight:400;" class="text-uppercase">
                  {{filteredPlats.length}} Résultat<span v-if="filteredPlats.length >= 2">s</span></span></h1>
              <!-- <input type="text" v-model="search" placeholder="🔎 Recherchez le plat que vous souhaitez">
      <span v-if="search && filteredPlats.length >= 1" style="color:#30334F;font-size:1.5rem;font-weight:700;" class="text-uppercase">
        {{filteredPlats.length}} Résultat<span v-if="filteredPlats.length >= 2">s</span>
      </span> -->
              <v-row no-gutters>
                <div class="menu-container col-md-10">
                  <v-row>
                    <v-col v-for="plat in filteredPlats" :key="plat.post_name" col="6" md="4" max-height="300px">
                      <v-scroll-x-transition appear>
                        <v-card class="mx-auto" max-width="300px">
                          <v-img class="white--text align-end" height="150px" :src="`${plat.acf.image.sizes.medium}`">
                            <v-card-title>{{plat.post_title}} - {{plat.acf.prix}} €</v-card-title>
                          </v-img>

                          <v-card-text class="text--primary">
                            <div class="card-icons">
                              <div class="like-container">
                                <input type="checkbox" name="checkbox" v-bind:id="plat.ID" :value="plat.ID"
                                  v-model="liked" @click="setLikeCookie()">
                                <label v-bind:for="plat.ID">
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
                </div>
                <div class="feed-container col-md-2">
                  <div class="contact-container">
                    <div class="contact-container-title">
                      <h1 class="text-uppercase" style="color:#30334F;">Contact</h1>
                    </div>
                    <p class="">
                      <v-icon>fa-phone</v-icon>065645464
                    </p>
                    <p class="">
                      <v-icon>fa-envelope-open</v-icon>test@€st.com
                    </p>
                    <p class="">
                      <v-icon>fa-home</v-icon>adresse
                    </p>
                    <a href="">
                      <v-icon>fab fa-facebook</v-icon>
                    </a>
                    <a href="">
                      <v-icon>fab fa-instagram</v-icon>
                    </a>
                  </div>
                </div>
              </v-row>
            </div>
          </div>
        </v-app>
      </v-container>
    </v-main>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "@/assets/animation/food_delivery.json";
import axios from 'axios';

export default {
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: {
        animationData: animationData.default
      },
      isActive: true,
      snackbar: false,
      cookieConsent: false,
      plats: [],
      search: '',
      liked: [],
      notifications: '0',
      categorieChoose:'all',
      categories: [{
            icon: 'fa-home',
            name: 'all',
            id:'1'
          },
          {
            icon: 'fa-hamburger',
            name: 'burger',
            id:'2'
          },
          {
            icon: 'fa-pizza-slice',
            name: 'pizza',
            id:'3'
          },
          {
            icon: 'fa-pizza-slice',
            name: 'tacos',
            id:'4'
          }
        ],
    }
  },
  computed: {
    filteredPlats() {
      if(this.categorieChoose != 'all'){
      return this.plats.filter(plat => {
        return plat.acf.categorie.indexOf(this.categorieChoose) > -1
      })
      }
      else {
        return this.plats.filter(plat => {
        return plat.acf.categorie.indexOf(this.categorieChoose, -1) 
      })
      }
    },
    getLikeCookie(){
      const cookieValue= this.$cookies.get('like', { parseJSON: true });
      cookieValue == null ? this.liked = [] : this.liked = cookieValue
    }
  },
  methods: {
    onChange() {
      this.isActive != this.isActive
    },
    acceptCookie(){
      this.snackbar = false
      this.cookieConsent = true
      this.$cookies.set('consentCookie', true, {
          maxAge: 60 * 60 * 24 * 365
      });
    },
    declineCookie(){
      this.snackbar = false
      this.cookieConsent = true
    },
    incrementCounter() {
      console.log('incrementCounter')
      this.$store.commit('increment', 1)
      this.value = this.$store.state.counter
      this.$cookies.set('session', {
        store: this.$store.state
      }, {
        path: this.$nuxt.context.base,
        maxAge: this.$nuxt.context.env.maxAge
      })
    },
    setLikeCookie() {
      if(this.$cookies.get('consentCookie') !== undefined){
        // this.$cookies.set('notifications', this.notifications++, {maxAge: 60 * 60 * 24 * 365})
        document.addEventListener('input', () => {
          setTimeout(() => {
            this.$cookies.set('like', JSON.stringify(this.liked), { maxAge: 60 * 60 * 24 * 365 })
          }, 300);
        })
     }
    }
  },
  mounted: function(){
    axios.get("https://api-template.theo-meyer.com/wp-json/wp/v2/plat").then(response =>
    this.plats = response.data);
    console.log(this.categorieChoose);
    this.$nextTick(() => {
        this.$nuxt.$loading.start()

        setTimeout(() => this.$nuxt.$loading.finish(), 3000)
      })
    const consent = this.$cookies.get('consentCookie')
    if(consent === undefined){
      this.snackbar = true
    }
    this.getLikeCookie;
  }
}
</script>

<style>
.container-interne{
  margin-left:2%;
}

.container{
  padding-top:3rem;
}

.title_articles{
  color:#30334F;

  font-size:3rem;
}

input{
  color:#30334F;
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

.card-icons .like-container input, .choose-container .v-radio {
  display: none !important;
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

.label_categorie{
  margin-right:4rem;
  cursor:pointer;
}



.contact-container p{
  color: #30334F !important;
}

label img{
  border: 1px #30334F solid;
  padding:1rem;
  border-radius:40px;
}

input:checked + label img{
  background-color: #30334F;
}

p.phone::before{
  content:'📱';
}

p.mail::before{
  content:'📧';
}

p.location::before{
  content:'🏘️';
}

.contact-container a{
  text-decoration: none;
}

.v-sheet.v-snack__wrapper{
  background-color:black !important;
  color:white !important;
}

/* NAV */



</style>