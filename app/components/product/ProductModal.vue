<script setup>
import { successMsg } from "~~/utils/toast-notfacation";
import { showSignInAndSignUpError } from "~~/utils/user-messageError";

const props = defineProps(["show", "categories"]);
const emit = defineEmits(["toggleProductModal", "getProducts"]);
const ProductStore = useProductStore();
const { productInput, edit } = storeToRefs(ProductStore);

const loading = ref(false);

const submitForm = async () => {
    loading.value = true;
    try {
        if (productInput.value.price !== undefined && productInput.value.price !== null) {
            productInput.value.price = Number(productInput.value.price);
        }

        const categoryEditPoint = edit.value ? `/update` : `/create`;
        const res = await $fetch(`/api/admin/product${categoryEditPoint}`, {
            method: "POST",
            body: JSON.stringify(productInput.value),
        });
        edit.value = false;
        emit("getProducts");
        successMsg(res?.message);
        productInput.value = "";
    } catch (error) {
        showSignInAndSignUpError(error);
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <BaseModal v-show="show">
        <template #title>
            <h1 class="text-2xl">Create Product</h1>
        </template>

        <template #body>
            <BaseInput class="mb-2" v-model="productInput.name" :type="'text'" :placeholder="'Product Name'" />
            <BaseInput class="mb-2" v-model="productInput.color" :type="'text'" :placeholder="'Product Color'" />
            <BaseInput class="mb-2" v-model="productInput.price" :type="'number'" min="1" :placeholder="'Product Price'" />
            <select
                class="focus:bg-focus-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:border-gray-700 focus:focus:border-brand-800"
                v-model="productInput.categoryId">
                <option value="">categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
        </template>

        <template #footer>
            <BaseBtn class="bg-gray-400" label="Close" @click="emit('toggleProductModal')"></BaseBtn>
            <BaseBtn :label="edit ? 'Update' : 'Save'" @click="submitForm" :loading="loading"></BaseBtn>
        </template>
    </BaseModal>
</template>
