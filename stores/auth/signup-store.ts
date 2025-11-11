import { defineStore } from "pinia";

export const useSignUpStore = defineStore("signup-store", () => {
    const registerInput = ref({
        name: "",
        email: "baslm8496@gmail.com",
        password: "",
        otpCode: "",
    });
    return {
        registerInput,
    };
});
