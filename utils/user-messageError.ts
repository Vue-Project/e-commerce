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
