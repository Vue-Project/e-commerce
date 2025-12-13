import { defineStore } from "pinia";
import { useHeaders } from "../../../utils/http-headers";

export const useUserStore = defineStore("user-store", () => {
    const search = ref("");
    const usersData = ref<any>(null);
    const page = ref(1);
    const limit = ref(10);
    const headers = useHeaders();
    const userError = ref<any>(null);

    const fetchUsers = async () => {
        const { data, refresh, error } = await useFetch("/api/admin/user/get", {
            headers: {
                ...headers,
            },
            query: {
                search: search.value,
                page: page.value,
                limit: limit.value,
            },
        });
        userError.value = error;
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
        userError,
    };
});
