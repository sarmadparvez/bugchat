export interface IDialogEngine {
  getQueryResponse(query: string): Promise<string>
}
