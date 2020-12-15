
export async function queryES(videoUrl, queryJSON) {
    const videoName = getVideoName(videoUrl);
    const resultObjs = await fetch("http://localhost:9200/" + videoName + "/_search?pretty", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryJSON)
    }).then(res => res.json()).then(json => {
        return json.hits.hits;
    }).catch(e => {
        alert("Failed to Connect to ElasticSearch Server");
        return null;
    });
    return resultObjs;
}

export async function objsToRes(objs, fps) {
    console.log(objs);
    if (objs === null) return null;

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

function getVideoName(videoUrl) {
    const startIdx = videoUrl.lastIndexOf("/");
    const endIdx = videoUrl.lastIndexOf(".");
    return videoUrl.substring(startIdx+1, endIdx).toLowerCase();
}