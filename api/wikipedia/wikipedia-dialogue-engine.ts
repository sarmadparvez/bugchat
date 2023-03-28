import { IDialogEngine } from '../dialogue-engine/dialog-engine';
import axios from 'axios';
import * as wtf from 'wtf_wikipedia';
wtf.extend(require('wtf-plugin-summary'))

const ERROR = 'No results found from wikipedia.';
const WIKI_API = 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&format=json';
export class WikipediaDialogueEngine implements IDialogEngine {
  public async getQueryResponse(query: string): Promise<string> {
    return await this.getSummaryFromWikipedia(query);
  }

  private async getSummaryFromWikipedia(query: string): Promise<string> {
    const response = await axios.get(`${WIKI_API}&search=${query}`);
    const searchResults = response.data[1];
    if (searchResults.length === 0) {
      throw new Error(ERROR);
    }
    const page = await wtf.fetch(searchResults[0]);
    // @ts-ignore
    const summary = page.summary();
    if (!summary) {
      throw new Error(ERROR);
    }
    return summary;
  }
}
