<template>
    <div class="bg-slate-200 h-screen">
        <CustomerOrder :userOders="paymentData?.userOrders" />
    </div>
</template>

<script setup>
definePageMeta({ layout: "admin", middleware: "admin" });
const checkoutStore = useCheckoutStore();
const { paymentData } = storeToRefs(checkoutStore);
await checkoutStore.fetchPaymentData();
</script>

<style lang="scss" scoped></style>
