<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { showSignInAndSignUpError } from "~~/utils/user-messageError";

definePageMeta({
    layout: "auth",
});
const router = useRouter();
const signUpStore = useSignUpStore();
const { registerInput } = storeToRefs(signUpStore);

const loading = ref(false);
const rules = {
    name: { required }, // Matches state.firstName
    email: { required, email }, // Matches state.email
    password: { required }, // Matches state.lastName
};

const v$ = useVuelidate(rules, registerInput);
const submitForm = async () => {
    const isInvalid = v$.value.$validate();
    if (!isInvalid) return;

    loading.value = true;

    try {
        const res = await $fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(registerInput.value),
        });

        console.log("res", res);
        router.push("/auth/email-verification");
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
                    <h1 class="text-2xl mb-3">Sign Up</h1>

                    <FormError :errors="v$.name.$errors">
                        <BaseInput v-model="registerInput.name" :type="'text'" :placeholder="'Enter your name'" id="name" />
                    </FormError>
                    <FormError :errors="v$.email.$errors">
                        <BaseInput v-model="registerInput.email" :type="'text'" :placeholder="'info@gmail.com'" id="email" />
                    </FormError>
                    <FormError :errors="v$.password.$errors">
                        <BaseInput v-model="registerInput.password" :type="'password'" :placeholder="'Enter your password '" id="password" />
                    </FormError>
                    <BaseBtn @click="submitForm" :label="'SignUp'" :loading="loading" />

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
