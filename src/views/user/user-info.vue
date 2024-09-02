<template>
    <div class="p-10">
        <button type="button"
            class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            @click="goBack">Back</button>
        <div class="flex justify-center">

            <h2 class="text-base font-semibold leading-7 text-gray-900">User Information for <span class="font-bold">{{
                userInfo.firstName }} {{ userInfo.lastName }}</span></h2>
        </div>
        <div class="border-b border-gray-900/10 pb-12">


            <div class="mt-10 grid grid-cols-2 gap-4 justify-between">
                <div v-if="userInfo">
                    <p>Full Name: {{ userInfo.firstName }} {{ userInfo.lastName }}</p>
                    <p>Email: {{ userInfo.email }}</p>
                    <p>Company: {{ userInfo.company }}</p>
                </div>
                <div v-else>
                    <p>Loading user details...</p>
                </div>

            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getUserById } from '@/services/UserService';
import { User } from '@/types/types';
import type { AxiosError } from 'axios';

const router = useRouter();
const route = useRoute()
const userInfo = ref<User>();

watch(() => route.params.id, () => fetchData(route.params.id as string), { immediate: true })

async function fetchData(id: string) {
    if (id) {
        getUserById(id).then((res: User) => {
            userInfo.value = res
        }, (error: AxiosError) => {
            alert(error.message)
            console.log(error)
        })
    }
}

const goBack = () => {
    router.back()
}

</script>
