exports.create = (service) => async (req, res, next) => {
    try {
        const data = await service.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
};

exports.findAll = (service) => async (req, res, next) => {
    try {
        const data = await service.findAll(req.query);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.findById = (service) => async (req, res, next) => {
    try {
        const data = await service.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Not found' });
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.update = (service) => async (req, res, next) => {
    try {
        const data = await service.update(req.params.id, req.body);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

exports.remove = (service) => async (req, res, next) => {
    try {
        await service.remove(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};
