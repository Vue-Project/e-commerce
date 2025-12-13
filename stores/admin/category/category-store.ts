import { defineStore } from "pinia";
import { useHeaders } from "../../../utils/http-headers";

export const useCategoryStore = defineStore("category-store", () => {
    const categoryInput = ref({
        id: null,
        name: "",
    });
    const edit = ref(false);
    const headers = useHeaders();
    const fetchCategories = async () => {
        const { data, refresh: getCategory } = useFetch("/api/admin/category/get-category", {
            headers: {
                ...headers,
            },
        });
        return { data, getCategory };
    };
    return {
        categoryInput,
        edit,
        fetchCategories,
    };
});
