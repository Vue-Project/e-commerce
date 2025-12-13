import { showErrorMsg } from "./toast-notfacation";

export const showSignInAndSignUpError = (error: any) => {
    const errors = error?.data?.data?.fieldErrors;
    if (typeof error?.data?.message !== "undefined") {
        showErrorMsg(error?.data?.message);
    }
    for (const inputField in errors) {
        for (const inputFiledMessage of errors[inputField]) {
            showErrorMsg(inputFiledMessage);
        }
    }
};

// export function isAuthenticatedError(error: Ref<any>) {
//     const statusCode = error.value?.statusCode;
//     if (statusCode === 401) {
//         window.location.href = "/auth/signin";
//         showErrorMsg("Unauthorized! Please sign in again.");
//     }
// }
