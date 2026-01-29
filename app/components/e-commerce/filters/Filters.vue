<script setup lang="ts">
const attributesWithTerms = ref([{ slug: "pa_colour", name: "red" }]);

const categoryStore = useCategoryStore();
const { data } = await categoryStore.fetchCategories();
const productStore = useProductStore();
const { productColors } = storeToRefs(productStore);

const productEcomStore = useProductEcomStore();
const { selectedCategories, selectedPrices, selectedColors, selectedStar } = storeToRefs(productEcomStore);

// Template refs for child components
const priceFilterRef = ref();
const categoryFilterRef = ref();
const colorFilterRef = ref();
const starFilterRef = ref();

async function fetchProductByCategories(categories: number[]) {
    selectedCategories.value = categories;
    await productEcomStore.fetchProducts(selectedCategories.value, selectedPrices.value, selectedColors.value, selectedStar.value);
}
async function fetchProductByColors(colors: string[]) {
    selectedColors.value = colors;
    await productEcomStore.fetchProducts(selectedCategories.value, selectedPrices.value, selectedColors.value, selectedStar.value);
}

async function fetchProductByPrice(prices: number[]) {
    selectedPrices.value = prices;
    await productEcomStore.fetchProducts(selectedCategories.value, selectedPrices.value, selectedColors.value, selectedStar.value);
}

async function fetchProductByStars(starRating: number) {
    selectedStar.value = starRating;
    await productEcomStore.fetchProducts(selectedCategories.value, selectedPrices.value, selectedColors.value, selectedStar.value);
}

async function handleResetAllFilters() {
    // Reset store values
    selectedCategories.value = [];
    selectedPrices.value = [0, 1000];
    selectedColors.value = [];
    selectedStar.value = 0;

    // Reset child component states
    if (priceFilterRef.value) priceFilterRef.value.resetPrice();
    if (categoryFilterRef.value) categoryFilterRef.value.resetCategories();
    if (colorFilterRef.value) colorFilterRef.value.resetColors();
    if (starFilterRef.value) starFilterRef.value.resetStars();

    // Fetch all products
    await productEcomStore.fetchProducts([], [0, 1000], [], 0);
}
</script>

<template>
    <aside id="filters">
        <OrderByDropdown class="block w-full md:hidden" />
        <div class="relative z-30 grid mb-12 space-y-8 divide-y">
            <PriceFilter ref="priceFilterRef" @fetchProducts="fetchProductByPrice" />
            <CategoryFilter ref="categoryFilterRef" @fetchProducts="fetchProductByCategories" :categories="data?.categories" />

            <div v-for="attribute in attributesWithTerms" :key="attribute.slug">
                <ColorFilter ref="colorFilterRef" @fetchProducts="fetchProductByColors" :colors="productColors" />
            </div>

            <LazyStarRatingFilter ref="starFilterRef" @fetchProducts="fetchProductByStars" />
            <LazyResetFiltersButton @reset="handleResetAllFilters" />
        </div>
    </aside>
    <!-- @click="removeBodyClass('show-filters')" -->
    <div class="fixed inset-0 z-50 hidden bg-black opacity-25 filter-overlay"></div>
</template>

<style lang="postcss">
.show-filters .filter-overlay {
    @apply block;
}
.show-filters {
    overflow: hidden;
}

#filters {
    @apply w-[280px];

    & .slider-connect {
        @apply bg-primary;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.price-input {
    @apply border rounded-xl outline-none leading-tight w-full p-2 transition-all;

    &.active {
        @apply border-gray-400 pl-6;
    }
}

@media (max-width: 768px) {
    #filters {
        @apply bg-white h-full p-8 transform pl-2 transition-all ease-in-out bottom-0 left-4 -translate-x-[110vw] duration-300 overflow-auto fixed;

        box-shadow:
            -100px 0 0 white,
            -200px 0 0 white,
            -300px 0 0 white;
        z-index: 60;
    }

    .show-filters #filters {
        @apply transform-none;
    }
}
</style>
