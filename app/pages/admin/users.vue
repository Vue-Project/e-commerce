<template>
    <!-- {{ $isAuthenticated(userError.value) }} -->
    <div class="bg-slate-200 h-screen">
        <div class="mb-4 p-4">
            <UserTable :usersData="usersData" />
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
const { usersData, userError } = storeToRefs(userStore);
await userStore.fetchUsers();
const { $isAuthenticated } = useNuxtApp();

onMounted(async () => {
    await userStore.fetchUsers();
    $isAuthenticated(userError);
    if (userError.value) {
        $isAuthenticated(userError);
    }
});
</script>

<style lang="scss" scoped></style>
