<template>
    <div class="bg-slate-200 h-screen">
        <CustomerOrder :userOders="paymentData?.userOrders" />
    </div>
</template>

<script setup>
const checkoutStore = useCheckoutStore();
const { paymentData } = storeToRefs(checkoutStore);
await checkoutStore.fetchPaymentData();
definePageMeta({
    layout: "admin",
});
</script>

<style lang="scss" scoped></style>
