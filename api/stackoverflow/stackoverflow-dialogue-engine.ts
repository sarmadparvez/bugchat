import { IDialogEngine } from '../dialogue-engine/dialog-engine';
import axios from 'axios';

const ERROR = 'No answer found on stackoverflow.';
const STACKOVERFLOW_API_KEY = 'q*xIuofLuJ73asjvqUlq7A((';
const API_URL = 'https://api.stackexchange.com/2.3/search';
export class StackoverflowDialogueEngine implements IDialogEngine{
  public async getQueryResponse(query: string): Promise<string> {
    const link =  await this.getStackoverflowLink(query);

    return `Please visit this link ${link} for relevant information`;
  }

  private async getStackoverflowLink(question: string): Promise<string> {

    const response = await axios.get(API_URL, {
      params: {
        site: 'stackoverflow',
        order: 'desc',
        sort: 'votes',
        intitle: question,
        key: STACKOVERFLOW_API_KEY
      }
    });

    const data = response.data;
    if (data.items && data.items.length > 0) {
      const linkToQuestion = `https://stackoverflow.com/q/${data.items[0].question_id}`;
      return linkToQuestion;
    }
    throw new Error(ERROR);
  }

}
