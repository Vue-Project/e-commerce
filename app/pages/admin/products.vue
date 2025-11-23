<template>
    <div class="bg-slate-200 h-screen">
        <!-- <p>data:{{ productData?.products }}</p> -->
        <div class="mb-4 p-4">
            <ProductTable :productData="productData" @editProduct="editProduct">
                <template #btn>
                    <BaseBtn label="Create" @click="toggleProductModal"></BaseBtn>
                    <ProductModal :show="showModal" :categories="data?.categories" @toggleProductModal="toggleProductModal" />
                </template>
            </ProductTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
});
// product store to manage product modal state
const productStore = useProductStore();
const { productInput, edit, productData } = storeToRefs(productStore);
// const { getProducts } =
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
</script>

<style lang="scss" scoped></style>
