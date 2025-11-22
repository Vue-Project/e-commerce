import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category-store", () => {
    const categoryInput = ref({
        id: null,
        name: "",
    });
    const edit = ref(false);
    const fetchCategories = async () => {
        const { data, refresh: getCategory } = useFetch("/api/admin/category/get-category", {
            headers: {
                Accept: "application/json",
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
