<template>
<v-main>
  <v-container fluid>
    <v-app>
      <LikeBar />
      <br>
      <div class="container" id="settings">
          <div class="container-interne">
            <h1 style="color:black; margin-bottom:1rem;">Bienvenue sur vos paramètres de compte, {{this.user.displayName}}</h1>
            <v-row>
              <button type="button" v-if="btnModifier" @click="openModifierForm" class="mr-4 v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default"><span class="v-btn__content">
                  Modifier son compte
                </span></button>
                <button type="button" v-if="btnDeleteAccount" @click="openDialogDeleteAccount" class="mr-4 v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default redBtn"><span class="v-btn__content">
                  Supprimer son compte
                </span></button>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                v-if="accountModifier"
              >
                <h3>Mofidier son compte</h3>

                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="displayName"
                  :rules="emailRules"
                  label="Name"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :counter="10"
                  :rules="nameRules"
                  label="Password"
                  outlined
                ></v-text-field>

                <v-btn
                  class="mr-4"
                  @click="validateModification"
                >
                  Validate
                </v-btn>
                <v-btn
                  class="mr-4"
                  @click="closeModifierForm"
                >
                  Ne pas modifier
                </v-btn>
              </v-form>

              <v-dialog
        v-model="dialog3"
        max-width="500px"
        class="dialog"
      >
        <v-card class="dialog">
          <v-card-title>
            <span class="blackText text-uppercase">Suppression du compte</span>
            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text class="blackText">La suppression du compte entrainera la perte de vos donneés.</v-card-text>

          <v-card-actions>
            <v-btn
              color="error"
              text
              @click="deleteAccount"
            >
              Valider
            </v-btn>
            <v-btn
              color="success"
              text
              @click="dontDeleteAccount"
            >
              Ne pas supprimer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
            </v-row>
          </div>
        </div>
    </v-app>
  </v-container>
</v-main>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      dialog3: false,

      accountModifier: false,
      btnModifier: true,
      btnDeleteAccount: true,
      dialogDeleteAccount: false,

      email: '',
      password: '',
      displayName: '',
    }
  },
  methods: {
    async openModifierForm() {
      this.accountModifier = true
      this.btnModifier = false
      this.btnDeleteAccount = false
    },

    async closeModifierForm() {
      this.accountModifier = false
      this.btnModifier = true
      this.btnDeleteAccount = true

    },

    async openDialogDeleteAccount() {
      this.btnModifier = false
      this.btnDeleteAccount = false
      this.dialog3 = true
    },

    async dontDeleteAccount() {
      this.btnModifier = true
      this.btnDeleteAccount = true
      this.dialog3 = false
    },

    async validateModification() {
      if (this.displayName.length >= 1) {
        try {
          await this.$fire.auth.currentUser.updateProfile({
            displayName: this.displayName,
          }).then(() => {
            console.log('displayName added')
          })
        } catch (e) {
          console.log(e)
        }
      } else console.log('displayName < 1')

      if (this.email.length >= 1) {
        try {
          await this.$fire.auth.currentUser.updateEmail(this.email).then(() => {
            console.log('email modified')
          })
        } catch (e) {
          console.log(e)
        }
      } else console.log('email < 1')
    },

    async deleteAccount() {
      try {
        await this.$fire.auth.currentUser.delete().then(() => {
          console.log('user deleted')
          this.$router.push('/')
          location.reload()
        })
      } catch (e) {
        console.log(e)
      }
    },

    async reauthenticateWithCredential() {
      try {
       const cred = await this.$fire.auth.EmailAuthProvider.credential(user.email, user.password); 
       await this.$fire.auth.currentUser.reauthenticateWithCredential(cred)
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    try {
      await this.$fire.auth.onAuthStateChanged(user => {
        console.log("user =", user)
        this.user = user;
/*         this.email = user.email;
        this.password = user.password; */
      })
    } catch (e) {
      console.log(e)
    }
    this.reauthenticateWithCredential();
  },
}
</script>

<style>

div#settings h3{
  color:black;
}

div#settings .redBtn{
  background-color:red !important;
}

.container{
  padding-top:3rem;
}


.container-interne{
  margin-left:2%;
}

.theme--dark.v-label, .theme--dark.v-input input, .theme--dark.v-input textarea {
color:black !important;
}

.v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot{
  border-color:black;
}

.v-overlay__scrim{
  border-radius: 0 !important;
}

.v-dialog{
  background-color: white !important;
  color:black
}

.blackText{
  color:black !important;
}

</style>