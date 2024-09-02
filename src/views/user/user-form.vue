<template>
    <div class="p-10">
        <form @submit="createUser">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base font-semibold leading-7 text-gray-900">User Information</h2>

                <div class="mt-10 grid grid-cols-2 gap-4 justify-between">
                    <div class="w-full">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First
                            name</label>
                        <div class="mt-2">
                            <input type="text" name="first-name" id="first-name" autocomplete="given-name" required
                                v-model="user.firstName"
                                class="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="w-full">
                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last
                            name</label>
                        <div class="mt-2">
                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" required
                                v-model="user.lastName"
                                class="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="w-full">
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" v-model="user.email"
                                required
                                class="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="w-full">
                        <label for="company" class="block text-sm font-medium leading-6 text-gray-900">Company</label>
                        <div class="mt-2">
                            <input id="company" name="company" type="text" autocomplete="company" v-model="user.company"
                                class="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                </div>
            </div>
            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" class="text-sm font-semibold leading-6 text-gray-900"
                    @click="cancel">Cancel</button>
                <button type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{
                        user.id ? 'Update' : 'Save' }}</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getUserById, createNewUser, updateUserInfo } from '@/services/UserService';
import { menuStore } from '@/stores/menuStore';
import { User } from '@/types/types';
import type { AxiosError } from 'axios';

const initialUser: User = {
    email: '',
    firstName: '',
    lastName: '',
    company: '',
};

const user = ref<User>(initialUser);

const route = useRoute()
const router = useRouter()

watch(() => route.params.id, () => fetchData(route.params.id as string), { immediate: true })

async function fetchData(id: string | null) {
    if (id) {
        getUserById(id).then((res: User) => {
            user.value = res
        }, (error: AxiosError) => {
            alert(error.message)
            console.log(error)
        })
    }
}
onMounted(async () => {
    console.log(route.params)
});

const cancel = () => {
    router.back()
}

const createUser = (event: Event) => {
    event.preventDefault()
    if (user.value.id) {
        updateUserInfo(user.value).then((res: User) => {
            user.value = res;
            alert(`User information updated for: ${res.firstName} ${res.lastName}.`)
            menuStore.fetchMenuItems()
        }, (error: AxiosError) => {
            alert(error.message)
            console.log(error)
        })
    }
    else {
        createNewUser(user.value).then((res: User) => {
            user.value = res;
            alert(`New user: ${res.firstName} ${res.lastName} created.`)
            menuStore.fetchMenuItems()
        }, (error: AxiosError) => {
            alert(error.message)
            console.log(error)
        })
    }
};
</script>
