import express, { Router } from "express";

import HelloController from "./controllers/HelloController";
import UsersController from "./controllers/UsersController";
import RepositoriesController from "./controllers/RepositoriesController";

import auth from "./middlewares/auth";
import SessionController from "./controllers/SessionController";

const routes = new Router();

routes.post("/sessions", SessionController.create);
routes.get("/hello", HelloController.index);

routes.use(auth);

// RESTfull
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.update);
routes.delete("/users/:id", UsersController.destroy);

routes.get("/users/:user_id/repositories", RepositoriesController.index);
routes.post("/users/:user_id/repositories", RepositoriesController.create);
routes.delete(
  "/users/:user_id/:id/repositories",
  RepositoriesController.destroy
);

export default routes;
