class response {
    success(res, message = "success", data = null) {
        return res.status(200).json({
            success: true,
            message,  // Added message here
            data
        });
    }

    created(res, message = "created", data = null) {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    }

    error(res, message = "error", data = null) {
        return res.status(400).json({
            success: false,
            message,  // Added message here
            data
        });
    }

    warning(res, message = "Warning", data = null) {
        return res.status(400).json({  // 400 Bad Request is typical for warnings that don't block execution
            success: false,
            message,
            data
        });
    }

    serverError(res, message = "Internal Server Error", data = null) {
        return res.status(500).json({  // 500 Internal Server Error
            success: false,
            message,
            data
        });
    }

    notFound(res, message = "Not Found", data = null) {
        return res.status(404).json({  // 404 Not Found
            success: false,
            message,
            data
        });
    }

    unauthorized(res, message = "Unauthorized", data = null) {
        return res.status(401).json({
            success: false,
            message,
            data
        });
    }

    forbidden(res, message = "Forbidden", data = null) {
        return res.status(403).json({
            success: false,
            message,
            data
        });
    }
}

module.exports = new response;