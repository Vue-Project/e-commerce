import { StarRating } from "./../../.nuxt/components.d";
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
    const selectedStar = ref<number>();
    const singleProductData = ref<any>(null);
    const sameCategoryProduct = ref<any>(null);

    const fetchProducts = async (categories?: number[], prices?: number[], colors?: string[], starRating?: number) => {
        const params: Record<string, any> = {};

        if (categories && categories?.length > 0) {
            params["categories"] = categories.toString();
        }
        if (prices && prices?.length > 0) {
            params["prices"] = prices.toString();
        }
        if (colors && colors?.length > 0) {
            params["colors"] = colors.toString();
        }

        if (starRating && typeof starRating === "number") {
            params["starRating"] = starRating;
        }

        const data = await $fetch("/api/e-commerce/get-products", {
            headers: {
                ...headers,
            },

            query: {
                search: search.value,
                page: page.value,
                limit: limit.value,
                ...params,
            },
        });

        productData.value = data;
        limit.value = productData.value?.metadata?.limit || 10;
        page.value = productData.value?.metadata?.page || 1;
    };
    const fetchSingleProductData = async (slug: string) => {
        const data = await $fetch("/api/e-commerce/single-product", {
            headers: {
                ...headers,
            },
            query: {
                slug: slug,
            },
        });

        singleProductData.value = data;
    };
    const fetchProductWithSameCategory = async (categoryId: number) => {
        const data = await $fetch("/api/e-commerce/get-same-category", {
            headers: {
                ...headers,
            },
            query: {
                categoryId: categoryId,
            },
        });

        sameCategoryProduct.value = data;
    };

    return {
        edit,
        fetchProducts,
        search,
        productData,
        selectedColors,
        selectedPrices,
        selectedCategories,
        fetchSingleProductData,
        singleProductData,
        fetchProductWithSameCategory,
        sameCategoryProduct,
        selectedStar,
    };
});
