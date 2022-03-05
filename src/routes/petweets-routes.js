import * as PetweetController from "../controllers/petweet-controller.js";
import { validateRequest } from "../middleware/auth.js";

export default {
  Create: {
    method: "POST",
    url: "/petweets",
    preHandler: [validateRequest],
    handler: PetweetController.create,
  },
  Delete: {
    method: "DELETE",
    url: "/petweets/:id",
    preHandler: [validateRequest],
    handler: PetweetController.del,
  },
  GetAll: {
    method: "GET",
    url: "/petweets",
    preHandler: [validateRequest],
    handler: PetweetController.getAll,
  },
  GetByID: {
    method: "GET",
    url: "/petweets/:id",
    preHandler: [validateRequest],
    handler: PetweetController.getByID,
  },
};
