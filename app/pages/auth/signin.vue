<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { showSignInAndSignUpError } from "~~/utils/user-messageError";
definePageMeta({
    layout: "auth",
});
const loginInput = ref({
    email: "",
    password: "",
});
const rules = {
    email: { required, email }, // Matches state.email
    password: { required }, // Matches state.lastName
};
const loading = ref(false);
const v$ = useVuelidate(rules, loginInput);

const userCookie = useCookie("user", userCookieSettings);
const router = useRouter();

const submitForm = async () => {
    const isInvalid = v$.value.$validate();
    if (!isInvalid) return;

    loading.value = true;

    try {
        // console.log("JWT_TOKEN_KEY:", process.env.JWT_TOKEN_KEY);
        // console.log("REFRESH_TOKEN_KEY:", process.env.REFRESH_TOKEN_KEY);
        const res = await $fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(loginInput.value),
        });

        console.log("res", res);
        userCookie.value = res;
        router.push("/admin/dashboard");
    } catch (error) {
        showSignInAndSignUpError(error);
        // console.log("error", errors);
    } finally {
        loading.value = false;
    }
};
</script>
<template>
    <div class="bg-white h-screen">
        <div class="flex justify-between">
            <div></div>
            <div class="w-[300px] mt-20">
                <div class="flex flex-col gap-2">
                    <h1 class="text-2xl mb-3">Sign In</h1>
                    <FormError :errors="v$.email.$errors">
                        <BaseInput v-model="loginInput.email" :type="'text'" :placeholder="'info@gmail.com'" id="email" />
                    </FormError>
                    <FormError :errors="v$.password.$errors">
                        <BaseInput v-model="loginInput.password" :type="'password'" :placeholder="'Enter your password '" id="password" />
                    </FormError>
                    <BaseBtn @click="submitForm" :label="'Sign in'" :loading="loading" />
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
