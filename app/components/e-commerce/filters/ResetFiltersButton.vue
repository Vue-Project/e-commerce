<script setup lang="ts">
const productEcomStore = useProductEcomStore();
const { selectedCategories, selectedPrices, selectedColors, selectedStar } = storeToRefs(productEcomStore);

const emit = defineEmits<{
    reset: [];
}>();

async function resetAllFilters() {
    // Reset all store states
    selectedCategories.value = [];
    selectedPrices.value = [0, 1000];
    selectedColors.value = [];
    selectedStar.value = 0;

    // Emit reset event
    emit("reset");

    // Fetch products with empty filters
    await productEcomStore.fetchProducts([], [0, 1000], [], 0);
}
</script>

<template>
    <button @click="resetAllFilters" class="bg-primary hover:bg-opacity-90 transition-all rounded-lg font-bold mt-8 text-center text-white text-sm w-full p-2">Reset All Filters</button>
</template>
