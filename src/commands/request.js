import ora from 'ora';
import { makeRequest, parseHeaders } from '../http.js';
import { displayResponse, displayError } from '../display.js';
import { addToHistory, saveToCollection } from '../store.js';

export async function requestCommand(method, url, options) {
  const headers = parseHeaders(options.header);
  const spinner = ora(`${method.toUpperCase()} ${url}`).start();

  try {
    const res = await makeRequest({ method, url, headers, data: options.data });
    spinner.stop();
    displayResponse(res);

    addToHistory({ method: method.toUpperCase(), url, status: res.status, duration: res.duration });

    if (options.saveAs) {
      saveToCollection(options.saveAs, { method: method.toUpperCase(), url, headers, data: options.data || null });
      console.log(`Saved as "${options.saveAs}"\n`);
    }
  } catch (err) {
    spinner.stop();
    displayError(err);
  }
}