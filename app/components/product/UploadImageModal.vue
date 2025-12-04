<script setup>
import { successMsg } from "~~/utils/toast-notfacation";

const props = defineProps(["show"]);
const emit = defineEmits(["getProducts"]);
const loading = ref(false);
const image = ref(null);
const productStore = useProductStore();
const { productId, showUploadedImageModal } = storeToRefs(productStore);
const selectImage = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
        console.error("No file selected");
        return;
    }

    const outputImage = document.querySelector("#outputImage");
    const objectUrl = URL.createObjectURL(selectedFile);

    outputImage.src = objectUrl;

    outputImage.onload = () => {
        URL.revokeObjectURL(objectUrl); // free correct URL
    };

    image.value = selectedFile;
};

const uploadImage = async () => {
    try {
        if (image.value !== null) {
            loading.value = true;
            const requestOptions = await productStore.uploadImagePayload(productId.value, image.value);
            const response = await $fetch("/api/admin/product/upload-image", requestOptions);
            successMsg(response?.message);
            document.querySelector("#outputImage").src = "";
            emit("getProducts");
            document.querySelector("#imageInput").value = "";
        } else {
            showError("No image selected");
        }
    } catch (error) {
        showError(error?.message);
        loading.value = false;
    }
};
</script>
<template>
    <BaseModal v-show="showUploadedImageModal">
        <template #title>
            <h1 class="text-2xl font-semibold">Upload Product Images</h1>
        </template>

        <template #body>
            <img style="height: 150px" alt="image preview" id="outputImage" />
            <label>Image upload functionality goes here.</label>
            <input id="imageInput" @change="selectImage" type="file" alt="imageInput" aria-label="image upload" />
        </template>

        <template #footer>
            <BaseBtn @click="showUploadedImageModal = false" class="bg-gray-400" label="Close"></BaseBtn>
            <BaseBtn @click="uploadImage" label="upload image" :loading="loading"></BaseBtn>
        </template>
    </BaseModal>
</template>
