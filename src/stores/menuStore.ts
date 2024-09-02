// menuStore.ts
import { reactive } from 'vue';
import type { MenuItem } from '@/types/types';
import { getAllUsers } from '@/services/UserService';
import type { User } from '../types/types';
import type { AxiosError } from 'axios';

interface MenuStore {
    items: MenuItem[];
    updateMenu: (newItems: MenuItem[]) => void;
    fetchMenuItems: () => void;
}

export const menuStore: MenuStore = reactive<MenuStore>({
    items: [] as MenuItem[],

    updateMenu(newItems: MenuItem[]) {
        this.items = newItems;
    },

    fetchMenuItems() {
        getAllUsers('3').then((res: User[]) => {
            this.items = res.map(item => ({ id: item.id, name: `${item.firstName} ${item.lastName}` }))
        }, (error: AxiosError) => {
            alert(error.message)
            console.log(error)
        })
    }

});
