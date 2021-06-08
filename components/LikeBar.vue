<template>
    <v-card
        flat
        height="3rem"
        tile
    >
        <v-toolbar dense>
        <v-toolbar-title>WELCOME TO FOODLAND 🤤</v-toolbar-title>

        <v-spacer></v-spacer>

        <div id="toolbar_icon">
            <v-btn icon>
                <v-icon class="likeBar_icon">fa-heart</v-icon>
            </v-btn>

            <v-btn icon>
                <v-icon class="likeBar_icon">fa-shopping-cart</v-icon>
            </v-btn>
        </div>
        </v-toolbar>
    </v-card> 
</template>

<script>
export default {
    icons: {
      iconfont: 'fa',
    },
    data(){
        return{
            searchBar: false,
        }
    }
}
</script>

<style>
.v-toolbar__title{
    padding-left: 3rem;
    padding-top:3rem;
    font-size:3rem;
    color: #30334F !important;
    font-weight: 900;
}

.v-sheet.v-toolbar:not(.v-sheet--outlined){
    box-shadow: none;
    margin-bottom:3rem;
}

.likeBar_icon{
    color:#30334F !important;
    background-color: transparent !important;

    transition: all 0.5s;
}

.likeBar_icon:hover{
    padding:2rem;
    background-color: transparent !important;

    transition: all 0.5s;
}

div#toolbar_icon{
    padding-top:3rem;
}
</style>