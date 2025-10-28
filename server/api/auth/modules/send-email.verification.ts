export const sendEmailVerification = async (receiverEmail: string, otpCode: string) => {
    const nodeMailer = useNodeMailer();

    await nodeMailer.sendMail({ subject: "Email-Verification", text: "Hello use this code to verity your email address: " + otpCode, to: receiverEmail });
};
