<template>
  <div id="app">
    <NavigationBar
      :userLoggedIn="userLoggedIn"
      :userReportStatus="userReportStatus"
      :dangerMapDisplayed="showDangerMap"
      @displayCheckIn="displayCheckinForm()"
      @displayHistory="displayHistory()"
      @toggleDangerMap="toggleDangerMap()"
      @displaySettings="displaySettings()">
    </NavigationBar>
    <Welcome v-show="!userLoggedIn && !showDangerMap" />
    <b-card no-body v-show="!userLoggedIn && !showDangerMap" id='user-auth-actons'>
      <b-tabs card>
        <b-tab title='Login' id='login-form-card' ref='loginTab'>
          <LoginForm />
        </b-tab>
        <b-tab title='Register' id='register-form-card' ref='registerTab'>
          <RegisterForm @registrationComplete="registrationComplete()" />
        </b-tab>
      </b-tabs>
    </b-card>
    <Confidentiality v-show="!userLoggedIn && !showDangerMap" />
    <!-- <Status v-show="userLoggedIn && showStatus" @statusComplete="displayCheckinForm()" /> -->
    <CheckIn v-show="userLoggedIn && showCheckin" class='authed-user' />
    <CheckInHistory v-show="userLoggedIn && showHistory" class='authed-user' />
    <RiskyHistory v-show="showDangerMap" class='authed-user' />
    <Settings v-show="userLoggedIn && showSettings" class='authed-user' />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
// import Status from '@/components/Status.vue'
import CheckIn from '@/components/CheckIn.vue'
import CheckInHistory from '@/components/CheckInHistory.vue'
import Welcome from '@/components/Welcome.vue'
import Confidentiality from '@/components/Confidentiality.vue'
import Settings from '@/components/Settings.vue'
import RiskyHistory from '@/components/RiskyHistory.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    LoginForm,
    RegisterForm,
    // Status,
    CheckIn,
    CheckInHistory,
    RiskyHistory,
    Welcome,
    Confidentiality,
    Settings
  },
  data () {
    return {
      showCheckin: true,
      showHistory: false,
      showSettings: false,
      showDangerMap: false,
      // showStatus: true,
    }
  },
  computed: {
    userLoggedIn () {
      return this.$store.getters.getUserAuth
    },
    userReportStatus () {
      return this.$store.getters.getuserReportStatus
    }
  },
  watch: {
    userLoggedIn() {
      this.hideDangerMapOnAuth()
      this.showCheckin = true
      // this.showStatus = true
    }
  },
  methods: {
    hideDangerMapOnAuth () {
      this.showDangerMap = false
      this.displayCheckinForm()
    },
    registrationComplete () {
      this.$refs.loginTab.activate()
    },
    clearComponents () {
      this.showCheckin = false
      this.showHistory = false
      this.showSettings = false
      // this.showStatus = false
    },
    displayCheckinForm () {
      this.clearComponents()
      this.showDangerMap = false
      this.showCheckin = true
    },
    displayHistory () {
      this.clearComponents()
      this.showDangerMap = false
      this.showHistory = true
    },
    toggleDangerMap () {
      this.clearComponents()
      this.showDangerMap = !this.showDangerMap
      this.showCheckin = !this.showDangerMap
    },
    displaySettings () {
      this.clearComponents()
      this.showDangerMap = false
      this.showSettings = true
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* small */
@media (max-width: 768px) {
  #user-auth-actons {
    width: 90%;
    margin: auto;
  }
  .authed-user {
    width: 90%;
    margin: auto;
  }
}
/* medium */
@media (min-width: 768px) {
  #user-auth-actons {
    width: 50%;
    margin: auto;
  }
  .authed-user {
    width: 75%;
    margin: auto;
  }
}
</style>
