import * as express from 'express';
import { DialogEngineService } from './dialog-engine.service';
import { GenerateReplyRequestDto } from './dto/generate-reply-request.dto';
import { WikipediaDialogueEngine } from '../wikipedia/wikipedia-dialogue-engine';
import { StackoverflowDialogueEngine } from '../stackoverflow/stackoverflow-dialogue-engine';

const router = express.Router();

const engines = [
  new WikipediaDialogueEngine(),
  new StackoverflowDialogueEngine()
];

router.post('', async (req, res) => {
  const dto: GenerateReplyRequestDto = req.body;

  const service = new DialogEngineService(engines);

  const response = await service.generateReply(dto)

  res.json(response);
});

export default router;
