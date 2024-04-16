exports.createOne = (Model) => async (req, res, next) => {
  try {
    var data = await Model.create(req.body);

    res.status(201).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

exports.createMany = (Model) => async (req, res, next) => {
  try {
    var data = await Model.create(req.body);

    res.status(201).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

exports.getAll = (Model) => async (req, res, next) => {
  try {
    var data = await Model.find();

    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

exports.getOne = (Model) => async (req, res, next) => {
  try {
    var data = await Model.findById(req.params.id);

    if (data) return res.status(200).json({ status: "success", data });

    res.status(404).json({ status: "fail", message: "Document not found" });
  } catch (error) {
    next(error);
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    var data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

exports.updateMany = (Model) => async (req, res, next) => {
  try {
    var data = await Model.updateMany(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    var data = await Model.findByIdAndDelete(req.params.id);

    if (!data)
      return res
        .status(204)
        .json({ status: "fail", message: "Document does not exist" });

    res.status(401).json({ status: "success", message: "Document deleted" });
  } catch (error) {
    next(error);
  }
};

exports.deleteMany = (Model) => async (req, res, next) => {
  try {
    var data = await Model.deleteMany();

    if (!data) {
      return res
        .status(204)
        .json({ status: "fail", message: "Document does not exist" });
    }

    res.status(204).json({
      status: "success",
      message: "Document deleted",
    });
  } catch (error) {
    next(error);
  }
};
