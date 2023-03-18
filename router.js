import Router from 'express';
import Controller from "./controller.js";

const router = new Router ();

router.post('/order', Controller.create);
router.get('/order', Controller.get);
router.put('/order', Controller.update);

export default router;

