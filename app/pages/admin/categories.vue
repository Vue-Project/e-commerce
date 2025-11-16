<template>
    <div class="bg-slate-200 h-screen">
        <CategoryModal :show="true" />
        <!-- <CategoryTable :categories="categories" /> -->
    </div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
});
</script>

<style lang="scss" scoped></style>
