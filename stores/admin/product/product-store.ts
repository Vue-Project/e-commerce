import { defineStore } from "pinia";
import { successMsg } from "~~/utils/toast-notfacation";
import { showSignInAndSignUpError } from "~~/utils/user-messageError";
import { useHeaders } from "../../../utils/http-headers";

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
    const productId = ref(null);
    const showUploadedImageModal = ref(false);
    const showUploadedImagesModal = ref(false);
    const productImagesList = ref([]);
    const headers = useHeaders();
    const productColors = ref(["Red", "Blue", "Green", "Yellow", "Black", "White", "Purple", "Orange", "Pink", "Brown", "Gray", "Cyan", "Magenta", "Lime"]);
    const fetchProducts = async () => {
        const data = await $fetch("/api/admin/product/get", {
            headers: {
                ...headers,
            },
            query: {
                search: search.value,
                page: page.value,
                limit: limit.value,
            },
        });
        productData.value = data;
        limit.value = productData.value?.metadata?.limit || 10;
        page.value = productData.value?.metadata?.page || 1;
    };
    const deleteProduct = async (id: number) => {
        try {
            const res = await $fetch(`/api/admin/product/delete`, {
                method: "DELETE",
                headers: {
                    ...headers,
                },
                body: JSON.stringify({ id: id }),
            });

            successMsg(res?.message);
        } catch (error) {
            showSignInAndSignUpError(error);
        }
    };
    const changePage = async (newPage: number) => {
        page.value = newPage;
        await fetchProducts();
    };
    const uploadImagePayload = (productId: number, file: string) => {
        return new Promise((resolve, reject) => {
            try {
                const formData = new FormData();

                // formData.append("Authorization", headers?.Authorization);
                formData.append("file", file);
                formData.append("productId", productId.toString());

                const requestOptions = {
                    headers: {
                        ...headers,
                    },
                    method: "POST",
                    body: formData,
                };
                resolve(requestOptions);
            } catch (error) {
                reject(error);
            }
        });
    };
    return {
        productInput,
        edit,
        fetchProducts,
        search,
        productData,
        changePage,
        deleteProduct,
        uploadImagePayload,
        productId,
        showUploadedImageModal,
        showUploadedImagesModal,
        productImagesList,
        productColors,
    };
});
