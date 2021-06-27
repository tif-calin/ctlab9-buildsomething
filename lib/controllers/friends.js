import { Router } from 'express';
import Friend from '../models/Friend.js';
import FriendService from '../services/FriendService.js';

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
      const balance = await FriendService.getBalance(friend.accountId);
      
      res.send({
        ...friend,
        balance
      });
    } 
    catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const friends = await Friend.gather();
      
      for (let i = 0; i < friends.length; i++) {
        friends[i] = { ...friends[i], balance: (await FriendService.getBalance(friends[i].accountId)) };
      }

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
