<script setup>
import { successMsg } from "~~/utils/toast-notfacation";
import { showSignInAndSignUpError } from "~~/utils/user-messageError";

const props = defineProps(["show"]);
const emit = defineEmits(["toggleCategoryModal", "getCategory"]);
const categoryStore = useCategoryStore();
const { categoryInput, edit } = storeToRefs(categoryStore);

const loading = ref(false);

const submitForm = async () => {
    loading.value = true;
    try {
        const categoryEditPoint = edit.value ? `/update-category/${categoryInput.value.id}` : `/create-category`;
        const res = await $fetch(`/api/admin/category${categoryEditPoint}`, {
            method: "POST",
            body: JSON.stringify(categoryInput.value),
        });
        edit.value = false;
        emit("getCategory");
        successMsg(res?.message);
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
            <h1 class="text-2xl">Create category</h1>
        </template>

        <template #body>
            <BaseInput v-model="categoryInput.name" :type="'text'" :placeholder="''" />
        </template>

        <template #footer>
            <BaseBtn class="bg-gray-400" label="Close" @click="emit('toggleCategoryModal')"></BaseBtn>
            <BaseBtn label="save" @click="submitForm" :loading="loading"></BaseBtn>
        </template>
    </BaseModal>
</template>
