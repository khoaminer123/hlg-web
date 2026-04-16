/**
 * Centralized Error Handling Middleware
 */
const errorMiddleware = (err, req, res, next) => {
    console.error(`[Error] ${req.method} ${req.url}:`, err.message);

    // Default status code and message
    let statusCode = 500;
    let message = 'Đã có lỗi hệ thống xảy ra. Vui lòng thử lại sau.';

    // Handle specific MongoDB errors
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Dữ liệu không hợp lệ.';
    }

    // Handle custom errors with status property
    if (err.status) {
        statusCode = err.status;
        message = err.message;
    }

    // Override default message for explicit errors thrown in code
    if (err.isPublic) {
        message = err.message;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorMiddleware;
