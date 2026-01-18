// backend/controllers/base.controller.js

exports.create = (service) => async (req, res, next) => {
    try {
        const result = await service.create(req.body, req.user); // <== pass req.user here
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

exports.findAll = (service) => async (req, res, next) => {
    try {
        const result = await service.findAll(req.query, req.user); // <== pass req.user here
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

exports.findById = (service) => async (req, res, next) => {
    try {
        const result = await service.findById(req.params.id, req.user); // <== pass req.user here
        if (!result) return res.status(404).json({ message: 'Not found' });
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

exports.update = (service) => async (req, res, next) => {
    try {
        const result = await service.update(req.params.id, req.body, req.user); // <== pass req.user here
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

exports.remove = (service) => async (req, res, next) => {
    try {
        await service.remove(req.params.id, req.user); // <== pass req.user here
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};
