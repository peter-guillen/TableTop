function crudController(Model) {
  return {
    getAll: async (req, res) => {
      const items = await Model.find();
      res.json(items);
    },
    getOne: async (req, res) => {
      const item = await Model.findById(req.params.id);
      res.json(item);
    },
    create: async (req, res) => {
      const newItem = await Model(req.body);
      await newItem.save();
      res.json(newItem);
    },
    update: async (req, res) => {
      const updated = Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updated);
    },
    remove: async (req, res) => {
      await Model.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    },
  };
}

module.exports = crudController;
