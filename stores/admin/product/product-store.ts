import { defineStore } from "pinia";

export const useProductStore = defineStore("product-store", () => {
    const productInput = ref({
        id: null,
        name: "",
        color: "",
        price: 0,
        categoryId: null,
    });
    const edit = ref(false);
    const search = ref("");
    const productData = ref<any>(null);
    const page = ref(1);
    const limit = ref(10);
    const fetchProducts = async () => {
        const { data } = useFetch("/api/admin/product/get", {
            headers: {
                Accept: "application/json",
            },
            query: {
                search: search.value,
                page: page.value,
                limit: limit.value,
            },
        });
        productData.value = data.value;
        limit.value = productData.value?.metadata?.limit || 10;
        page.value = productData.value?.metadata?.page || 1;
    };
    const changePage = async (newPage: number) => {
        page.value = newPage;
        await fetchProducts();
    };
    return {
        productInput,
        edit,
        fetchProducts,
        search,
        productData,
        changePage,
    };
});
