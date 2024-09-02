<template>
  <div class="p-10">
    <p>Welcome to the dashboard. This is where you can see the total number of users and other relevant information.</p>
    <p>Total user count is: <span class="font-bold">{{ count }}</span></p>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getAllUsers } from '@/services/UserService';
import type { User } from '@/src/types/types';
import type { AxiosError } from 'axios';
const count = ref<number>();

onMounted(() => {
  getUserList();
});

const getUserList = () => {
  getAllUsers().then((res: User[]) => {
    count.value = res.length;
  }, (error: AxiosError) => {
    alert(error.message)
    console.log(error)
  });
}

</script>
