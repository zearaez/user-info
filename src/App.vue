<template>
  <div id="app">
    <header class="bg-white shadow">
      <div class="container mx-auto px-4 py-4 flex items-center">
        <nav class="flex space-x-6">
          <!-- <div> -->
          <router-link to='/'>Dashboard</router-link>
          <router-link to='/users'>Users</router-link>
          <div class="relative group">
            <button class="focus:outline-none">
              <router-link to="">User List</router-link>
            </button>
            <div class="absolute hidden group-hover:block bg-white shadow-lg rounded-md w-48">
              <div v-for="childMenu in menuStore.items" :key="childMenu.name"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                <router-link :to="{ name: 'user-info', params: { id: childMenu.id } }">{{ childMenu.name
                  }}</router-link>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </nav>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { menuStore } from './stores/menuStore'
onMounted(() => {
  menuStore.fetchMenuItems()
});
</script>

<style>
nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  margin: 5px 0;
}

nav ul ul {
  padding-left: 20px;
}
</style>
