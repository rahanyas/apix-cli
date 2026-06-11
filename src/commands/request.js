import ora from 'ora';
import {makeRequest, parseHeaders} from '../http.js';
import {displayResponse, displayError} from '../display.js'
import {addToHistory, saveToCollection} from '../store.js'

export async function requestCommand(method, url, options){
     const headers = parseHeaders(options.header)
}