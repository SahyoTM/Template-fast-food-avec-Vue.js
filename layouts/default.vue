<template>
  <v-app id="default">
    <v-navigation-drawer v-model="drawer" app>
<!--       <v-sheet class="pa-4">
        <div class='d-flex justify-center'>
          <v-avatar class="mb-4" color="grey darken-1" size="64"><img src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="avatar"></v-avatar>
        </div>

        <div class="text-center text-uppercase title_user">Constantin</div>
      </v-sheet> -->


      <v-list>
        <v-list-item v-for="(item, i) in menuItems" exact :key="i" :to="item.path" link>

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class='d-flex justify-center'>
        <lottie :height="400" :options="lottieOptions" @animCreated="handleAnimation" />
      </div>
    </v-navigation-drawer>

    <v-navigation-drawer v-if="user" v-model="drawer" app>
<v-sheet class="pa-4">      
        <div class='d-flex justify-center'>
          <v-avatar class="mb-4" color="grey darken-1" size="64"><img src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="avatar"></v-avatar>
        </div>

        <div class="text-center text-uppercase title_user">{{this.user.displayName}}</div>
      </v-sheet> 


      <v-list>
        <v-list-item v-for="(item, i) in menuItemsConnected" exact :key="i" :to="item.path" link>

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="signout" link exact class="signout">

          <v-list-item-icon>
            <v-icon>fa-user</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Signout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class='d-flex justify-center'>
        <lottie :height="400" :options="lottieOptions" @animCreated="handleAnimation" />
      </div>
    </v-navigation-drawer>

    <Nuxt />

  </v-app>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "@/assets/animation/food_delivery.json";

  export default {
    icons: {
      iconfont: 'fa',
    },
    components: {
      lottie
    },
    name: 'homepage',
    data() {
      return {
        user:'',
        drawer: true,
        menuItems: [{
            icon: 'fa-home',
            title: 'Home',
            path: '/'
          },
          {
            icon: 'fa-heart',
            title: 'Likes',
            path: '/wishlist'
          },
          {
            icon: 'fa-user',
            title: 'Login',
            path: '/login'
          },
        ],
        menuItemsConnected: [{
            icon: 'fa-home',
            title: 'Home',
            path: '/'
          },
          {
            icon: 'fa-heart',
            title: 'Likes',
            path: '/wishlist'
          },
          {
            icon: 'fa-cog',
            title: 'Settings',
            path: '/user_settings'
          },
        ],
        anim: null, // for saving the reference to the animation
        lottieOptions: {
          animationData: animationData.default
        },
      }
    },
    methods: {
      handleAnimation: function (anim) {
        this.anim = anim;
      },

      async signout(){
        try {
          await this.$fire.auth.signOut().then(result => {
            console.log("result=", result)
            this.user = '';
            location.reload()
            this.$router.push('/')
          })
        } catch (e) {
          console.log(e)
        }
      }
    },
    async mounted(){
      try {
          await this.$fire.auth.onAuthStateChanged(user => {
            console.log("user =", user)
            this.user = user;
          })
        } catch (e) {
          console.log(e)
        }
    }
  }
</script>
<style>
.theme--dark.v-sheet{
  background-color: transparent !important;
  color:transparent !important;
}

.theme--dark.v-application{
  background-color: white !important;
  border-radius: 5%;
}

.v-navigation-drawer{
  background-color: #E4E7FE !important;
}


.theme--dark.v-icon {
  color: #A0A1B5;
  background-color: white;
  padding: 1rem;
  border-radius: 40%;

  transition: all 0.5s;
}

.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  color: none !important;
}

.container--fluid{
  background-color: #E4E7FE;
}

.v-main{
  border-radius: 40%;
}

.title_user{
  color:#30334F;
  font-weight: 900;
}

.v-list-item__content, .v-list-item__icon{
  color:#9DA0B2 !important;
  font-weight:700;

  transition: all 0.5s;
}

.v-sheet a:hover, .v-sheet a:active, div.signout:hover{
  background-color: #F87193;

  transition: all 0.5s;

}

.v-sheet a, div.signout{
  background-color: #E4E7FE;

  transition: all 0.5s;

}

.v-sheet a:hover .v-list-item__content, div.signout:hover .v-list-item__content{
  color:white !important;
  transition: all 0.5s;
}

.v-sheet a:hover .v-icon, div.signout:hover .v-icon{
  color:white !important;
  background-color:#EC6083 !important;
  transition: all 0.5s;
}
</style>
