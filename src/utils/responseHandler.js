
const successResponse = (res, code, message, data, token) => {
return res.status(code).json({
    message,
    data,
    token
});
}

const errorResponse = (res, code, message) => {
    return res.status(code).json({
        message
    });
}

export default {
    successResponse,
    errorResponse
}