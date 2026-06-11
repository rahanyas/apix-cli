import Conf from "conf";

const store = new Conf({
    projectName : 'apix-cli',
    defaults : {
        collection : {},
        history : []
    }
});

export function getCollection(){
    return store.get('collection')
};

export function saveToCollection(name, request){
    const collection = getCollection();
    collection[name] = request;
    store.set('collection', collection)
};

export function getSaved(name){
    return getCollection()[name] || null
};

export function deleteFromCollection(name){
    const collection = getCollection();
    delete collection[name];
    store.set('collection', collection)
};

export function addToHistory(entry){
    const history = store.get('history');
    history.unshift({...entry, timeStamp : new Date().toISOString()});
     // keep last 50 entries
    store.set('history', history.slice(0, 50))
};

export function getHistory(){
    return store.get('history')
}