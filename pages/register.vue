<template>
<v-main>
  <v-container fluid>
    <v-app id="login">
      <!--     <LikeBar />
          <br> -->
      <div class="testInput">
        <div class="formCSS ">
          <v-form ref="form" v-model="valid" lazy-validation>
            <h3 class="text-uppercase">S'inscrire</h3>

            <div class="inputForm">
              <v-text-field v-model="displayName" :counter="16" :rules="nameRules" label="Name" outlined></v-text-field>
              <v-text-field v-model="email" :rules="emailRules" label="Email" outlined></v-text-field>
              <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" :counter="16" :rules="passwordRules" label="Password" outlined></v-text-field>
            </div>

            <v-btn class="mr-4" @click="validate">
              Validate
            </v-btn>
          </v-form>
          <NuxtLink to="/login" style="font-size:1rem;">Vous avez déjà un compte ? Cliquez ici </NuxtLink>
        </div>
      </div>
    </v-app>
  </v-container>
</v-main>
</template>

<script>
  export default {
    data: () => ({
      show1: false,
      valid: true,
      password: '',
      displayName:'',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 16) || 'Name must be less than 16 characters',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 16) || 'Password must be less than 16 characters',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],
      email: '',
      emailRules: [v => !!v ||
        'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),

    methods: {
      async validate() {
        this.$refs.form.validate()

        try {
          await this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
            console.log(user)
            this.$fire.auth.currentUser.updateProfile({
            displayName: this.displayName,
            })
            this.$router.push('/')
          })
        } catch (e) {
          alert(e)
        }
      },
    },
  }
</script>

<style>
.testInput{
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

.mdi-eye, .mdi-eye-off{
  background-color:transparent !important;
}





.formCSS{
  width: 50%;
  color:black;
  background-color:#E4E7FE;

  margin-left: auto;
  margin-right: auto;
}

.v-text-field{
  width: 50%;

  margin-left: auto !important;
  margin-right: auto !important;
}

.inputForm{
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.theme--dark.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot fieldset{
  color:black;
}

.v-input__control label{
    color: black !important;
}

.theme--dark.v-input input, .theme--dark.v-input textarea{
    color: black !important;
}

.v-input__control .primary--text{
    color:black !important;
}
</style>
