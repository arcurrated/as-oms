<template>
  <head>
    <meta name="viewport" content="width=device-width, user-scalable=no">
  </head>
  <nav class="uk-navbar-container main-navbar uk-visible@s" uk-navbar>
      <div class="uk-navbar-left">
        <a href="" class="uk-navbar-item uk-logo">{{ title }}</a>
        <ul class="uk-navbar-nav">
          <li v-if="currentUser"><router-link to="/createorder">Создать заказ-наряд</router-link></li>
          <li v-if="currentUser"><router-link to="/orders">Все заказ-наряды</router-link></li>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li v-if="!currentUser"><router-link to="/login">Войти</router-link></li>
          <li v-if="!currentUser"><router-link to="/register">Регистрация</router-link></li>
          <li v-if="currentUser"><a href="" @click.prevent="logOut">Выйти</a></li>
          <li v-if="currentUser"><router-link to="/profile">Профиль</router-link></li>
        </ul>
      </div>
  </nav>

  <nav class="uk-navbar uk-navbar-container main-navbar uk-hidden@s" uk-sticky>
    <div class="uk-navbar-left">
      <a href='' class='uk-navbar-item uk-logo'>{{ title }}</a>
    </div>
    <div class="uk-navbar-right">
      <a class="uk-navbar-toggle" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-nav"></a>
    </div>
  </nav>

  <div id="offcanvas-nav" uk-offcanvas="overlay: true;">
    <div class="uk-offcanvas-bar">
      <ul class="uk-nav uk-nav-default">
        <li class="uk-nav-header">Меню</li>
        <li v-if="currentUser"><router-link to="/createorder"><span class="uk-margin-small-right" uk-icon="icon: plus-circle"></span> Создать заказ-наряд</router-link></li>
        <li v-if="currentUser"><router-link to="/orders"><span class="uk-margin-small-right" uk-icon="icon: database"></span> Заказ-наряды</router-link></li>
        <li class="uk-nav-divider"></li>
        <li v-if="!currentUser"><router-link to="/login"> Войти</router-link></li>
        <li v-if="!currentUser"><router-link to="/register"> Регистрация</router-link></li>
        <li v-if="currentUser"><router-link to="/profile"><span class="uk-margin-small-right" uk-icon="icon: user"></span> Профиль</router-link></li>
        <li v-if="currentUser"><a href="" @click.prevent="logOut"><span class="uk-margin-small-right" uk-icon="icon: sign-out"></span>Выйти</a></li>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
    title() {
      return this.$route.meta.title
    }
  },
  methods: {
    logOut(){
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }, 
}

</script>
