export function parseHeaders(headerArgs = []){
    const headers = {};
    for(const h of headerArgs){
        const idx = h.indexOf(':');
        if(idx === -1) continue;
        const key = h.slice(0, idx).trim();
        const val = h.slice(idx + 1).trim();
        headers[key] = val;
    };
    return headers;
};

export async function makeRequest({method, url, headers = {}, data = null}){
    const options = {
        method : method.toUpperCase(),
        headers : {...headers}
    };

    if(data){
        options.body = typeof data === 'string' ? JSON.stringify(data) : data;
        options.headers['Content-Type'] = 'application/json'
    }

    const start = Date.now();
    const response = await fetch(url, options);
    const duration = Date.now() - start;

    const contentType = response.headers.get('content-type') || '';
    const body = contentType.includes('application/json') ? await response.json() : await response.text()

    return {
        status : response.status,
        statusText : response.statusText,
        headers : response.headers,
        data : body,
        duration
    };
}