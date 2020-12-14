
export async function queryES(videoName, queryJSON) {
    const resultObjs = await fetch("http://localhost:9200/dexter/_search?pretty", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryJSON)
    }).then(res => res.json()).then(json => {
        return json.hits.hits;
    }).catch(e => {
        alert("Failed to Connect to ElasticSearch Server");
        return [];
    });
    return resultObjs;
}

export async function objsToRes(objs, fps) {
    objs = await objs;
    console.log(objs);

    const results = objs.map(obj => {
        const source = obj._source;
        const score = obj._score;
        const frame = source.frame;
        const startTime = frameToSecond(frame, fps);
        return {
            startTime: startTime,
            score: score
        }
    });

    return results;
}

function frameToSecond(frame, fps) {
    return frame / fps;
}