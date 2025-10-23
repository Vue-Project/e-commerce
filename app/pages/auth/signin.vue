<script setup>
definePageMeta({
    layout: "auth",
});
</script>
<template>
    <div class="bg-white h-screen">
        <div class="flex justify-between">
            <div></div>
            <div class="w-[300px] mt-20">
                <div class="flex flex-col gap-2">
                    <h1 class="text-2xl mb-3">Sign In</h1>
                    <input
                        type="email"
                        name="password"
                        placeholder="Info@example.com"
                        class="focus:bg-focus-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:border-gray-700 focus:focus:border-brand-800" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        id=""
                        class="focus:bg-focus-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 focus:border-gray-700 focus:focus:border-brand-800" />
                    <button class="flex justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        <!-- <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"></path>
                        </svg> -->

                        Login
                    </button>

                    <p class="text-sm font-normal text-center text-gray-700 dark:text-gray-500 sm:text-start">
                        Dont have an account ?
                        <NuxtLink to="/auth/signup" class="text-indigo-500 hover:text-brand-600 font-semibold">Sign up</NuxtLink>
                    </p>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>
