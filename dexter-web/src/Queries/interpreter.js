
export default function getESquery(rawQuery) {

    const objClasses = rawQuery.targets.map((target) => (target.objClass));

    const limit = rawQuery.limit || 1;

    const ESquery = {
        "from": 0,
        "size": limit,
        "query": {
            "script_score": {
                "query": {
                    "bool": {
                        "must": [],
                        "must_not": []
                    }
                },
                "script": {
                    "lang": "painless",
                    // "source": "double total = 0; for (item in params._source.objects) { if (item.class == \"knife\" || item.class == \"bed\" || item.class == \"handbag\") { total += item.confidence }} return total;"
                }
            }
        }
    };

    if (rawQuery.order) {
        ESquery.sort = [
            {"_score": { "order": rawQuery.order }}
        ];
    }

    ESquery.query.script_score.script.source = multiObjFunc(objClasses);

    rawQuery.targets.forEach(target => {
        if (target.relation === "INCLUDE") {
            ESquery.query.script_score.query.bool.must.push({
                "term": { "objects.class": target.objClass }
            });
        } else if (target.relation === "EXCLUDE") {
            ESquery.query.script_score.query.bool.must_not.push({
                "term": { "objects.class": target.objClass }
            });
        }

        if (target.property === "COUNTS") {
            ESquery.query.script_score.script.source = countFunc(objClasses);
            ESquery.query.script_score.query.bool.must = {
                "range": {
                    ["objectCounts." + target.objClass] : {[target.equality]: target.value}
                }
            };
        }
    });

    if (rawQuery.orderBy === "DISTANCE" && objClasses.length === 2) {
        ESquery.query.script_score.script.source = distfunc(objClasses[0], objClasses[1]);
    }

    return ESquery;
}

const distfunc = (objClass1, objClass2) => {
    return (
        "double minDistance = 1000000000.0;" +
        "for (int i = 0; i < params._source.objects.length; i++) {" +
            "if (params._source.objects[i][\"class\"] == \"" + objClass1 + "\") {" +
                "for (int j = 0; j < params._source.objects.length; j++) {" +
                    "if (i != j && params._source.objects[j][\"class\"] == " + objClass2 + ") {" +
                        "double currDistance = Math.sqrt(Math.pow(params._source.objects[i][\"x\"] - params._source.objects[j][\"x\"], 2) + Math.pow(params._source.objects[i][\"y\"] - params._source.objects[j][\"y\"], 2));" +
                        "minDistance = Math.min(minDistance, currDistance);" +
        "} } } }" +
        "return minDistance;"
    );
}

const classCondition = (objClass) => {
    return " || item.class == \"" + objClass + "\"";
}

const countFunc = (objClasses) => {
    var additionalCondition = "";
    for (var i = 1; i < objClasses.length; i++) {
        additionalCondition += classCondition(objClasses[i]);
    }
    return (
        "double total = 0;" +
        "double count = 0.0;" +
        "for (item in params._source.objects) {" +
            "if (item.class == \"" + objClasses[0] + "\"" + additionalCondition + ") {" +
                "total += item.confidence;" +
                "count += 1.0;" +
        "}}" +
        "return total / count;"
    );
}

const multiObjFunc = (objClasses) => {
    var additionalCondition = "";
    for (var i = 1; i < objClasses.length; i++) {
        additionalCondition += classCondition(objClasses[i]);
    }
    return (
        "double total = 0;" +
        "for (item in params._source.objects) {" +
            "if (item.class == \"" + objClasses[0] + "\"" + additionalCondition + ") {" +
                "total += item.confidence;" +
        "}}" +
        "return total;"
    );
}