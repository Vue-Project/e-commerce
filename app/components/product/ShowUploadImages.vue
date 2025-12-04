<script setup>
const productStore = useProductStore();
const { showUploadedImagesModal, productImagesList } = storeToRefs(productStore);
</script>
<template>
    <BaseModal v-show="showUploadedImagesModal">
        <template #title>
            <h1 class="text-2xl font-semibold">Uploaded Products Images</h1>
        </template>

        <template #body>
            <div class="flex gap-4">
                <img v-for="image in productImagesList" :key="image.url" :src="image.url" style="height: 100px" :alt="image.id" />
            </div>
        </template>

        <template #footer>
            <BaseBtn @click="showUploadedImagesModal = false" class="bg-gray-400" label="Close"></BaseBtn>
        </template>
    </BaseModal>
</template>
