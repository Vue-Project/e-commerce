<script setup lang="ts">
// const { siteName } = useAppConfig();
// const runtimeConfig = useRuntimeConfig();
// const img = useImage();

// const logoUrl = runtimeConfig?.public?.LOGO ? img(runtimeConfig?.public?.LOGO) : null;
// const faviconUrl = '/logo.svg';
</script>

<template>
    <NuxtLink to="/" class="inline-flex items-center gap-2">
        <img src="/logo.png" alt="Logo" width="42" height="42" />
        <span>Nike</span>
    </NuxtLink>
</template>
