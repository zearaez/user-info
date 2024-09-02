<template>
    <div class="p-10">
        <div>
            <button
                class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                @click="addNewUser">Create New</button>
        </div>
        <div v-if="loading">Data Loading</div>
        <div v-else-if="!loading && users.length === 0">Data Not Found</div>
        <ul role="list" class="divide-y divide-gray-100 gap-x-6" v-else-if="users.length && !loading">
            <li v-for="user in users" :key="user.id" class="flex justify-between p-2 rounded mb-2 bg-gray-200">
                <div class="flex min-w-0 gap-x-4">
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">{{ user.firstName }}</p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ user.email }}</p>
                    </div>
                </div>
                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p class="text-sm leading-6 text-gray-900">{{ user.company }}</p>
                    <p class="mt-1 text-xs leading-5 text-gray-500">
                        <span class="cursor-pointer" @click="viewUser(user.id)">View</span> |
                        <span class="cursor-pointer" @click="editUser(user.id)">Edit</span> |
                        <span class="cursor-pointer text-red-600" @click="deleteUser(user)">Delete</span>
                    </p>
                </div>
            </li>
        </ul>
        <div v-else-if="!users.length">Data not found</div>


    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAllUsers, deleteUserById } from '@/services/UserService';
import { menuStore } from '@/stores/menuStore';
import { User } from '@/types/types';
import type { AxiosError, AxiosResponse } from 'axios';

const router = useRouter();
const route = useRoute();

const users = ref<User[]>([]);
const loading = ref<boolean>(false)
watch(() => route.query.limit, () => fetchData(route.query.limit as string), { immediate: true })

async function fetchData(limit: string | null = null) {
    loading.value = true;
    getAllUsers(limit).then((res: User[]) => {
        users.value = res;
        loading.value = false;
    }, (error: AxiosError) => {
        loading.value = false;
        alert(error.message)
        console.log(error)
    });
}

const editUser = (userId: string) => {
    router.push({ path: `/users/${userId}/edit` });
};

// Define methods with proper type annotations
const viewUser = (userId: string) => {
    router.push({ path: `/users/${userId}` });
};

const deleteUser = async (user: User) => {
    let data = confirm(`Do you want to delete ${user.firstName} ${user.lastName}`)
    if (data) {
        deleteUserById(user.id).then(() => {
            fetchData()
            menuStore.fetchMenuItems()
        }, (error: AxiosError) => {
            alert(error.message)
            console.log(error)
        })
    }
};

const addNewUser = () => {
    router.push({ path: `/users/add` });
};
</script>
