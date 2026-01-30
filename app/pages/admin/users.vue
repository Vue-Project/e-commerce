<template>
    <!-- {{ $isAuthenticated(userError.value) }} -->
    <div class="bg-slate-200 h-screen">
        <div class="mb-4 p-4">
            <UserTable :usersData="usersData" />
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: "admin", middleware: "admin" });
import { promptUser } from "../../../utils/sweetAlert";
// user store to manage user modal state
const userStore = useUserStore();
const { usersData, userError } = storeToRefs(userStore);
await userStore.fetchUsers();
const { $isAuthenticated } = useNuxtApp();
await userStore.fetchUsers();

onMounted(async () => {
    $isAuthenticated(userError);
    if (userError.value) {
        $isAuthenticated(userError);
    }
});
</script>

<style lang="scss" scoped></style>
