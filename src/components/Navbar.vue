<template>
<div>
    <div class="menu-wrap" hide-on-scroll>
      <input type="checkbox" class="toggler">
      <div class="hamburger"><div></div></div>
      <div class="menu">
        <div>
          <div>
            <ul>
              <li>
                 <router-link to="/" class="no-style" >
                    <v-btn text class="align-center ">
                      <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2 align-middle"
                        contain
                        :src="require('../assets/greeny_logo.png')"
                        transition="scale-transition"
                        width="40"
                      />

                      <span
                        alt="Green Name"
                        class="shrink mt-1 not-clickable appname white--text"
                        contain
                        min-width="100"
                        width="100"
                      >
                      Greeny
                      </span>
                    </v-btn>
                  </router-link>
              </li>
              <li v-if="isLoggedIn">
                <router-link to="/achievements" class="no-style first-item" v-if="isLoggedIn">
                  <v-btn text>
                    <span class="mr-2 white--text">Achievements</span>
                  </v-btn>
                </router-link>
              </li>
              <li v-if="isLoggedIn">
                <router-link to="/redeem" class="no-style first-item" v-if="isLoggedIn">
                  <v-btn text>
                    <span class="mr-2 white--text">Redeem code</span>
                  </v-btn>
                </router-link>
              </li>
              <li v-if="isAdmin && isLoggedIn">
                <v-menu offset-y >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="#f4f1e9"
                      light
                      depressed
                      v-on="on"
                    >
                      Admin tools
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-if="isSuperAdmin">
                      <router-link  to="/manage/users" ><v-list-item v-ripple><span>Manage users</span></v-list-item></router-link>
                    </v-list-item>
                    <v-list-item  v-if="isSuperAdmin">
                      <router-link to="/manage/roles"><v-list-item v-ripple>Manage roles</v-list-item></router-link>
                    </v-list-item>
                    <v-list-item >
                      <router-link to="/manage/codes"><v-list-item v-ripple>Manage and generate codes</v-list-item></router-link>
                    </v-list-item>
                    <v-list-item>
                      <router-link to="/manage/achievements"><v-list-item v-ripple>Manage achievements</v-list-item></router-link>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </li>
              <li v-if="isLoggedIn">
                <router-link to="/dashboard" class="no-style first-item">
                  <v-btn text>
                    <span class="mr-2 white--text">Dashboard</span>
                  </v-btn>
                </router-link>
              </li>
              <li v-if="!isLoggedIn">
                <router-link to="/login">
                  <v-btn text>
                    <span class="mr-2 white--text">Login</span>
                  </v-btn>
                </router-link>
              </li>
              <li v-if="!isLoggedIn">
                <router-link to="/register">
                  <v-btn text>
                    <span class="mr-2 white--text">Register</span>
                  </v-btn>
                </router-link>
              </li>
              <li v-if="isLoggedIn">
                <v-btn text @click="logout" :loading="logoutLoading" class="white--text">
                  <span class="mr-2 white--text">Logout</span>
                </v-btn>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <v-app-bar
      app
      color="#2b463c"
      dark
      hide-on-scroll
      class="app-bar"
    >
      <router-link to="/" class="no-style" >
        <v-btn text class="align-center vline" data-aos="fade-down">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-1 align-middle"
            contain
            :src="require('../assets/greeny_logo.png')"
            transition="scale-transition"
            width="40"
          />

          <span
            alt="Green Name"
            class="shrink mt-1 hidden-sm-and-down not-clickable appname"
            contain
            min-width="100"
            width="100"
          >
          Greeny
          </span>
        </v-btn>
      </router-link>

      <router-link to="/achievements" class="no-style first-item" v-if="isLoggedIn">
        <v-btn text data-aos="flip-up">
          <span class="mr-1">Achievements</span>
        </v-btn>
      </router-link>

      <router-link to="/redeem" class="no-style first-item" v-if="isLoggedIn">
        <v-btn text data-aos="flip-up">
          <span class="mr-1">Redeem code</span>
        </v-btn>
      </router-link>

      <v-spacer></v-spacer>

      <div>
        
        <v-menu offset-y v-if="isAdmin && isLoggedIn">
          <template v-slot:activator="{ on }">
            <v-btn
              color="#f4f1e9"
              light
              v-on="on"
            >
              Admin tools
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-if="isSuperAdmin">
             <router-link  to="/manage/users" ><v-list-item v-ripple><span>Manage users</span></v-list-item></router-link>
            </v-list-item>
            <v-list-item  v-if="isSuperAdmin">
             <router-link to="/manage/roles"><v-list-item v-ripple>Manage roles</v-list-item></router-link>
            </v-list-item>
            <v-list-item >
             <router-link to="/manage/codes"><v-list-item v-ripple>Manage and generate codes</v-list-item></router-link>
            </v-list-item>
            <v-list-item>
             <router-link to="/manage/achievements"><v-list-item v-ripple>Manage achievements</v-list-item></router-link>
            </v-list-item>
          </v-list>
        </v-menu>

        <router-link to="/dashboard" class="no-style first-item" v-if="isLoggedIn">
          <v-btn text data-aos="flip-up">
            <span class="mr-1">Dashboard</span>
          </v-btn>
        </router-link>

        <router-link to="/login" v-if="! isLoggedIn">
          <v-btn text data-aos="flip-up">
            <span class="mr-1">Login</span>
          </v-btn>
        </router-link>

        <router-link to="/register" v-if="! isLoggedIn">
          <v-btn text data-aos="flip-up">
            <span class="mr-1">Register</span>
          </v-btn>
        </router-link>


        <v-btn text @click="logout" v-if="isLoggedIn" :loading="logoutLoading" data-aos="flip-up">
          <span class="mr-1">Logout</span>
        </v-btn>

      </div>
    </v-app-bar>

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import router from '../router'

  export default Vue.extend({
    name: 'Navbar',

    data: () => ({
      logoutLoading: false
    }),

    methods: {
      logout() {
        this.logoutLoading = true

        this.$store.dispatch('logout')
          .then(() => {
            this.logoutLoading = false

            router.push({name: "Home"})
          })
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
      isAdmin() {
        return this.$store.getters.roles.some((role: string) => role === 'Admin')
      },
      isSuperAdmin() {
        return this.$store.getters.roles.some((role: string) => role === 'SuperAdmin')
      }
    }
  })
</script>

<style>


.menu-wrap {
  display: none;
}

@media screen and (max-width: 700px) {
  .app-bar {
    visibility: hidden;
  }

  .menu-wrap {
    display: initial;
  }
}

.not-clickable {
  pointer-events: none;
}

.appname {
  font-size: 26pt;
}

.no-style {
  text-decoration: none;
  color: #f4f1e9;
}

.no-style:visited {
  text-decoration: none;
  color: #f4f1e9;
}

.align-middle {
  vertical-align: middle;
}

.vline {
  padding-right: 25px;
  border-right: 2px solid white;
}

.first-item {
  margin-left: 15px;
}


/* CORE STYLES */
:root {
  --primary-color: #2b463c;
  --overlay-color: rgba(47,105,83,0.6);
  --menu-speed: 0.75s;
}

/* MENU STYLES */
.menu-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  
  background-color: black;
}

.menu-wrap .toggler {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  width: 50px;
  height: 50px;
  opacity: 0;

  background-color: var(--primary-color);

}

.menu-wrap .hamburger {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 60px;
  height: 60px;
  padding: 1rem;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;

 
}

/* Hamburger Line */
.menu-wrap .hamburger > div {
  position: relative;
  flex: none;
  width: 100%;
  height: 2px;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

/* Hamburger Lines - Top & Bottom */
.menu-wrap .hamburger > div::before,
.menu-wrap .hamburger > div::after {
  content: '';
  position: absolute;
  z-index: 1;
  top: -10px;
  width: 100%;
  height: 2px;
  background: inherit;
}

/* Moves Line Down */
.menu-wrap .hamburger > div::after {
  top: 10px;
}

/* Toggler Animation */
.menu-wrap .toggler:checked + .hamburger > div {
  transform: rotate(135deg);
}

/* Turns Lines Into X */
.menu-wrap .toggler:checked + .hamburger > div:before,
.menu-wrap .toggler:checked + .hamburger > div:after {
  top: 0;
  transform: rotate(90deg);
}

/* Rotate On Hover When Checked */
.menu-wrap .toggler:checked:hover + .hamburger > div {
  transform: rotate(225deg);
}

/* Show Menu */
.menu-wrap .toggler:checked ~ .menu {
  visibility: visible;
}

.menu-wrap .toggler:checked ~ .menu > div {
  transform: scale(1);
  transition-duration: var(--menu-speed);
}

.menu-wrap .toggler:checked ~ .menu > div > div {
  opacity: 1;
  transition:  opacity 0.4s ease 0.4s;
}

.menu-wrap .menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-wrap .menu > div {
  background: var(--overlay-color);
  border-radius: 50%;
  width: 200vw;
  height: 200vw;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  transition: all 0.4s ease;
}

.menu-wrap .menu > div > div {
  text-align: center;
  max-width: 90vw;
  max-height: 100vh;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.menu-wrap .menu > div > div > ul > li {
  list-style: none;
  color: #fff;
  font-size: 1.5rem;
  padding: 1rem;
}

.menu-wrap .menu > div > div > ul > li > a {
  color: inherit;
  text-decoration: none;
  transition: color 0.4s ease;
}


</style>
