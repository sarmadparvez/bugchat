import { IDialogEngine } from './dialog-engine';
import { GenerateReplyRequestDto } from './dto/generate-reply-request.dto';
import { GenerateReplyResponseDto } from './dto/generate-reply-response.dto';
import LOGGER from '../logger';

export class DialogEngineService {

  constructor(private engines: IDialogEngine[]) {
  }
  public async generateReply(dto: GenerateReplyRequestDto): Promise<GenerateReplyResponseDto> {

   // const reply = await this.engine.getQueryResponse(dto.statement);

    for (const engine of this.engines) {
      try {
        const response = await engine.getQueryResponse(dto.statement);
        if (response) {
          return {
            text: response
          }
        }
      } catch (err) {
        LOGGER.info(err);
      }
    }

    return this.generateGeneralReply()
  }

  private generateGeneralReply(): GenerateReplyResponseDto {
    return {
      text: 'Sorry, I am unable to help you. Please be more precise.'
    }
  }
}

