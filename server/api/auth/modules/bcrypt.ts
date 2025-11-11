import bcrypt from "bcryptjs";
export async function hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(textPwd: string, hashPud: string) {
    return await bcrypt.compare(textPwd, hashPud);
}
