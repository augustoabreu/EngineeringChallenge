import express, {Request, Response} from 'express';
import {getMachineHealth} from './machineHealth';
import { prismaDb } from './db';

const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to get machine health score
app.post('/machine-health', async (req: Request, res: Response) => {
  const result = getMachineHealth(req);
  if (result.error) {
    res.status(400).json(result);
  } else {
    await prismaDb.userScore.create({
      data: {
        factoryScore: result.factory ?? '0',
        userId: req.body.userId,
        machineScores: result.machineScores ? {
          create: Object.entries(result.machineScores).map(([machine, score]) => ({
            userId: req.body.userId,
            machineName: machine,
            score: score,
          })),
        } : undefined,
      },
    });
    res.json(result);
  }
});

app.listen(port, () => {
  console.log(`API is listening at http://localhost:${port}`);
});
