<template>
<v-app id="default">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        class="pa-4"
      >
        <div class='d-flex justify-center'>
          <v-avatar
            class="mb-4"
            color="grey darken-1"
            size="64"
          ><img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="avatar"></v-avatar>
        </div>

        <div class="text-center text-uppercase title_user">John Doe</div>
      </v-sheet>


      <v-list>
        <v-list-item
          v-for="(item, i) in menuItems" exact :key="i" :to="item.path"
          link
        >

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class='d-flex justify-center'>
        <lottie  :height="400" :options="lottieOptions" @animCreated="handleAnimation" />
      </div>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>

          <Nuxt />
      </v-container>
    </v-main>
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
        drawer: true,
        menuItems: [{
            icon: 'fa-home',
            title: 'Home',
            path: '/'
          },
/*           {
            icon: 'fa-hamburger',
            title: 'Menu',
            path: '/'
          }, */
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
          {
            icon: 'fa-cog',
            title: 'Settings',
            path: '/user_settings'
          }
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
    },
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
  color:#F87193;
}

.v-list-item__content, .v-list-item__icon{
  color:#9DA0B2 !important;
  font-weight:700;

  transition: all 0.5s;
}

.v-sheet a:hover, .v-sheet a:active{
  background-color: #F87193;

  transition: all 0.5s;

}

.v-sheet a{
  background-color: #E4E7FE;

  transition: all 0.5s;

}

.v-sheet a:hover .v-list-item__content{
  color:white !important;
  transition: all 0.5s;
}

.v-sheet a:hover .v-icon{
  color:white !important;
  background-color:#EC6083 !important;
  transition: all 0.5s;
}
</style>
