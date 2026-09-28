import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

function createCollectionRouter(model: Model<unknown>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const items = await model.find().lean();
      response.json(items);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const item = await model.create(request.body);
      response.status(201).json(item);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const item = await model.findById(request.params.id).lean();

      if (!item) {
        response.status(404).json({ message: 'Resource not found' });
        return;
      }

      response.json(item);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

const apiRouter = Router();

apiRouter.use('/users', createCollectionRouter(User));
apiRouter.use('/teams', createCollectionRouter(Team));
apiRouter.use('/activities', createCollectionRouter(Activity));
apiRouter.use('/leaderboard', createCollectionRouter(LeaderboardEntry));
apiRouter.use('/workouts', createCollectionRouter(Workout));

export default apiRouter;