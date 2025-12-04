import { defineStore } from "pinia";

export const useUserStore = defineStore("user-store", () => {
    const search = ref("");
    const usersData = ref<any>(null);
    const page = ref(1);
    const limit = ref(10);

    const fetchUsers = async () => {
        const data = await $fetch("/api/admin/user/get", {
            headers: {
                Accept: "application/json",
            },
            query: {
                search: search.value,
                page: page.value,
                limit: limit.value,
            },
        });
        usersData.value = data;
        limit.value = usersData.value?.metadata?.limit || 10;
        page.value = usersData.value?.metadata?.page || 1;
    };

    const changePage = async (newPage: number) => {
        page.value = newPage;
        await fetchUsers();
    };

    return {
        usersData,
        fetchUsers,
        search,
        changePage,
    };
});
