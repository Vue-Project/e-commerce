<template>
    <div class="bg-slate-200 h-screen">
        <div class="mb-4 p-4">
            <ClientOnly>
                <UserTable :usersData="usersData" />
            </ClientOnly>
        </div>
    </div>
</template>

<script setup>
import { promptUser } from "../../../utils/sweetAlert";
definePageMeta({
    layout: "admin",
});
// user store to manage user modal state
const userStore = useUserStore();
const { fetchUsers, usersData } = storeToRefs(userStore);
await userStore.fetchUsers();
const showModal = ref(false);
</script>

<style lang="scss" scoped></style>
