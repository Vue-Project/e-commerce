<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
definePageMeta({
    layout: "auth",
});
const registerInput = ref({
    email: "",
    password: "",
});
const rules = {
    email: { required, email }, // Matches state.email
    password: { required }, // Matches state.lastName
};

const v$ = useVuelidate(rules, registerInput);

const submitForm = async () => {
    const isInvalid = v$.value.$validate();
    if (!isInvalid) return;
};
</script>
<template>
    <div class="bg-white h-screen">
        <div class="flex justify-between">
            <div></div>
            <div class="w-[300px] mt-20">
                <div class="flex flex-col gap-2">
                    <h1 class="text-2xl mb-3">Sign Up</h1>

                    {{ registerInput }}
                    <FormError :errors="v$.email.$errors">
                        <BaseInput v-model="registerInput.email" :type="'text'" :placeholder="'info@gmail.com'" />
                    </FormError>
                    <FormError :errors="v$.email.$errors">
                        <BaseInput v-model="registerInput.password" :type="'password'" :placeholder="'Enter your password '" />
                    </FormError>
                    <BaseBtn @click="submitForm" :label="'Sign Up'" :loading="true" />

                    <p class="text-sm font-normal text-center text-gray-700 dark:text-gray-500 sm:text-start">
                        Already have an account?
                        <NuxtLink to="/auth/signin" class="text-indigo-500 hover:text-brand-600 font-semibold">Sign in</NuxtLink>
                    </p>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>
