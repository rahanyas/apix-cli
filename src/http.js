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
    const config = {
        method : method.toLowerCase(),
        url,
        headers,
        validateStatus : () => true
    };

    if(data){
        config.data = typeof data === 'string' ? JSON.parse(data) : data;
        config.headers['Content-Type'] = 'application/json'
    }

    const start = Date.now();
    const promise = await fetch(config);
    console.log('promise : ', promise)
    const response = await promise.json();
    console.log('response : ', response)
    const duration = Date.now() - start;

    console.log('response.data : ', response.data)

    return {
        status : response.status,
        statusText : response.statusText,
        headers : response.headers,
        data : response.data,
        duration
    };
}