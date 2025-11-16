<script setup>
const props = defineProps(["show"]);
const categoryInput = ref({
    name: "",
});
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
            <BaseBtn class="bg-gray-400" label="Close"></BaseBtn>
            <BaseBtn label="create"></BaseBtn>
        </template>
    </BaseModal>
</template>
