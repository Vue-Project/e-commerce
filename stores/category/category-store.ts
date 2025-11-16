import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category-store", () => {
    const categoryInput = ref({
        id: null,
        name: "",
    });
    const edit = ref(false);
    return {
        categoryInput,
        edit,
    };
});
