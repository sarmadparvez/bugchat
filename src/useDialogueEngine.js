import { useState } from 'react';
import axios from 'axios';
import { API_URL } from './config';

const useDialogueEngine = () => {
  const [response, setResponse] = useState(undefined);

  const getResponse = async (statement) => {
    try {
      const res = await axios.post(API_URL, { statement: statement });
      setResponse(res.data.text);
    } catch (error) {
      setResponse('Unable to find anything.');
      console.error(error);
    }
  };

  return { response, getResponse };
};

export default useDialogueEngine;
