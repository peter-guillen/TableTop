const express = require("express");

function crudRoutes(controller) {
  const router = express.Router();
  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/", controller.remove);
  return router;
}

module.exports = crudRoutes;
