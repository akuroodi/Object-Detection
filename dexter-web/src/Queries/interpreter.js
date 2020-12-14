
export default function getESquery(rawQuery) {
    console.log(rawQuery);

    const ESquery = {
        "from": 0,
        "size": rawQuery.limit,
        "query": {
            "bool": {
                "must": [
                    { "match": { "objects.class": "truck" } },
                    { "match": { "objects.class": "person" } }
                ]
            }
        }
    };

    // rawQuery.targets.forEach(target => {
    //     if (target.relation === "INCLUDE") {

    //     } else if (target.relation === "EXCLUDE") {
            
    //     }
    // });


    return ESquery;
}