exports.success = (res, data, message = 'Success') => {
    res.json({ success: true, message, data });
};

exports.error = (res, message = 'Error') => {
    res.status(400).json({ success: false, message });
};
