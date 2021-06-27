import { Router } from 'express';
import Friend from '../models/Friend';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const friend = await Friend.insert(req.body);

      res.send(friend);
    } 
    catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const friend = await Friend.get(req.params.id);
      
      res.send(friend);
    } 
    catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const friends = await Friend.gather();

      res.send(friends);
    } 
    catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const friend = await Friend.update(req.body);

      res.send(friend);
    } 
    catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const friend = await Friend.remove(req.params.id);

      res.send(friend);
    } 
    catch (err) {
      next(err);
    }
  })
;
