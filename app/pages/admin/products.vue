<template>
    <div class="bg-slate-200 h-screen">
        <div class="mb-4 p-4">
            <ClientOnly>
                <ProductTable :productData="productData" @editProduct="editProduct" @deleteProduct="deleteProduct" @uploadImage="uploadImage" @ShowUploadedImages="ShowUploadedImages">
                    <template #btn>
                        <BaseBtn label="Create" @click="toggleProductModal"></BaseBtn>
                        <ProductModal :show="showModal" :categories="data?.categories" @toggleProductModal="toggleProductModal" @getProducts="productStore.fetchProducts" />
                        <UploadImageModal @getProducts="productStore.fetchProducts" />
                        <ShowUploadImages />
                    </template>
                </ProductTable>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup>
import { promptUser } from "../../../utils/sweetAlert";
definePageMeta({
    layout: "admin",
});
// product store to manage product modal state
const productStore = useProductStore();
const { productInput, edit, productData, productId, showUploadedImageModal, productImagesList, showUploadedImagesModal } = storeToRefs(productStore);
await productStore.fetchProducts();

// category store to get categories for product modal
const categoryStore = useCategoryStore();
const { data, getCategory } = await categoryStore.fetchCategories();

const showModal = ref(false);
const toggleProductModal = () => {
    showModal.value = !showModal.value;
};
const editProduct = (product) => {
    productInput.value = product;
    edit.value = true;
    toggleProductModal();
};
const deleteProduct = async (product) => {
    promptUser("Are you sure you want to delete this product?")
        .then(async () => {
            await productStore.deleteProduct(product?.id);
            productStore.fetchProducts();
        })
        .catch((error) => {
            console.log("Error during deletion:", error?.message);
        });
};
const uploadImage = (product) => {
    productId.value = product?.id;
    showUploadedImageModal.value = true;
};
const ShowUploadedImages = (product) => {
    productImagesList.value = product?.images;
    showUploadedImagesModal.value = true;
};
</script>

<style lang="scss" scoped></style>
