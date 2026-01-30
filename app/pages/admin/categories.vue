<template>
    <div class="bg-slate-200 h-screen">
        <div class="flex justify-end mb-4 pt-4 pr-4">
            <BaseBtn label="Create" @click="toggleCategoryModal"></BaseBtn>
            <CategoryModal :show="showModal" @toggleCategoryModal="toggleCategoryModal" @getCategory="getCategory" />
        </div>
        <CategoryTable :categories="data?.categories" @editCategory="editCategory" />
    </div>
</template>

<script setup>
definePageMeta({ layout: "admin", middleware: "admin" });
const categoryStore = useCategoryStore();
const { categoryInput, edit } = storeToRefs(categoryStore);
const { data, getCategory } = await categoryStore.fetchCategories();

const showModal = ref(false);
const toggleCategoryModal = () => {
    showModal.value = !showModal.value;
};
const editCategory = (category) => {
    categoryInput.value = category;
    edit.value = true;
    toggleCategoryModal();
};
</script>

<style lang="scss" scoped></style>
