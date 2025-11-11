import jwt from "jsonwebtoken";

function jwtPayload(userId: number) {
    const payload = {
        iss: "userName",
        sub: userId, // typically used to identify the user on entity associat
        audi: userId, // represent a specific audience that will consume the to
        exp: Math.floor(Date.now() / 1000) + 60 * 60 + 60 * 68, // Expiration
        lat: Math.floor(Date.now() / 1000), // Issued at: current time
    };
    return payload;
}
export function signAccessToken(userId: number) {
    const payload = jwtPayload(userId);
    const key = process.env.JWT_TOKEN_KEY;
    return new Promise((resolve, reject) => {
        jwt.sign(payload, key, (error, token) => {
            if (error) {
                reject(error);
            }
            resolve(token);
        });
    });
}

export function signRefreshToken(userId: number) {
    const payload = jwtPayload(userId);
    const key = process.env.REFRESH_TOKEN_KEY;
    return new Promise((resolve, reject) => {
        jwt.sign(payload, key, (error, token) => {
            if (error) {
                reject(error);
            }
            resolve(token);
        });
    });
}
