// Building middleware here to handle our error of 404 in index.js
function errorHandler(error, request, response, next) {
    //only want to send back json since we are building an api
    return response.status(error.status || 500).json({
        error: {
            message: error.message || "Oops! Something went wrong."
        }
    });
}

module.exports = errorHandler;