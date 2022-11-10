<template>
  <aside>
    <header>
      <router-link to="/" id="logo">
        <Icon src="/logo.svg" size=32 />
        <h1 class="title">fritter.</h1>
      </router-link>
    </header>
    <nav v-if="$store.state.username">
      <router-link to="/">
        <Icon src="/icons/home.svg" size=20 marginRight=8 />
        <span>home</span>
      </router-link>
      <router-link to="/account">
        <Icon src="/icons/settings.svg" size=20 marginRight=8 />
        <span>account</span>
      </router-link>
      <router-link to="/readinglist">
        <Icon src="/icons/bookmark.svg" size=20 marginRight=8 />
        <span>reading list</span>
      </router-link>
      <router-link to="/moments">
        <Icon src="/icons/list.svg" size=20 marginRight=8 />
        <span>moments</span>
      </router-link>
    </nav>
    <footer class="self" v-if="$store.state.username">
      <p>signed in as <b>@{{ $store.state.username }}</b></p>
      <Menu>
        <LogoutButton />
      </Menu>
    </footer>
  </aside>
</template>

<script>
import Icon from '@/components/common/Icon.vue';
import Menu from '@/components/common/Menu.vue';
import LogoutButton from '@/components/Account/LogoutButton.vue';
export default {
  name: 'Sidebar',
  components: {Icon, Menu, LogoutButton}
};
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100vh;
  border-right: 1px solid #aaa;
  padding-top: 2rem;
  padding-right: 2rem;
}

#logo {
  display: flex;
  gap: 0.25rem;
  text-decoration: none;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  flex-direction: column;
}

nav a {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.75rem 0;
  color: #222;
}

nav a span {
  font-size: 1.25rem;
  font-weight: bold;
  display: block;
  transition: 0.1s;
}

nav a:hover {
  color: #cd6700;
}
.title {
  font-size: 32px;
  margin: 0 5px;
  color: #222;
}

img {
  height: 32px;
}
</style>
