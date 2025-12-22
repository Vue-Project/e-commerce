import { defineStore } from "pinia";
import { useHeaders } from "../../utils/http-headers";

export const useProductEcomStore = defineStore("productEcom-store", () => {
    const edit = ref(false);
    const search = ref("");
    const productData = ref<any>(null);
    const page = ref(1);
    const limit = ref(10);
    const headers = useHeaders();
    const selectedCategories = ref<number[]>([]);
    const selectedColors = ref<string[]>([]);
    const selectedPrices = ref<number[]>([]);

    const fetchProducts = async (categories?: number[], prices?: number[], colors?: string[]) => {
        const data = await $fetch("/api/e-commerce/get-products", {
            headers: {
                ...headers,
            },
            query: {
                search: search.value,
                page: page.value,
                limit: limit.value,
                colors: colors ? colors?.toString() : [],
                prices: prices ? prices?.toString() : [],
                categories: categories ? categories.toString() : [],
            },
        });

        productData.value = data;
        limit.value = productData.value?.metadata?.limit || 10;
        page.value = productData.value?.metadata?.page || 1;
    };

    return {
        edit,
        fetchProducts,
        search,
        productData,
        selectedColors,
        selectedPrices,
        selectedCategories,
    };
});
