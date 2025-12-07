export const sendLoginResponse = (res, user, token) => {
    return res.json({
        status: "success",
        token,
        data : {
            user
        }
    });
};

export const sendSignupResponse = (res, user, token) => {
    return res.status(201).json({
        status: "success",
        token,
        data : {
            user
        }
    });
};

export const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        status: "error",
        message
    })
}