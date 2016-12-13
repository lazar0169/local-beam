// test
function generate() {
    let value1 = document.getElementById('length').value;
    let value2 = document.getElementById('max').value;
    let value3 = document.getElementById('k').value;
    let value4 = document.getElementById('target').value;
    let value5 = document.getElementById('limit').value;
    let targetValues = [];
    var randomArray = generateRandomArray(value1, value2);
    console.log(JSON.stringify(randomArray));
    document.getElementById('result').innerHTML = '<span style="font-weight: bold">Position: <span>' + beamSearch(randomArray, value3, value4, value5);
    for (let i = 0; i < randomArray.length; i++) { 
        if (randomArray[i] >= value4) {
            targetValues.push(i);
        }
    }
    document.getElementById('test').innerHTML = 'All positions: ' + JSON.stringify(targetValues);
}

// beamSearch function
function beamSearch(array, k, target, limit) {
    var initialStates = [],
        arrayValues = [],
        best = [],
        buffer = 0,
        score = -1;

    function main(successors) {
        if (successors.length == 0) {
            initialStates = generateRandomArray(k, array.length - 1);
            for (let i = 0; i < k; i++) {
                if (initialStates[i] >= array.length - 1) arrayValues.push([array[initialStates[i]], initialStates[i]], [array[0], 0]);
                else arrayValues.push([array[initialStates[i]], initialStates[i]], [array[initialStates[i] + 1], initialStates[i] + 1]);
            }
        } else {
            arrayValues = [].concat(successors);
            for (let i = 0; i < successors.length; i++) {
                if (successors[i][1] >= array.length - 1) arrayValues.push([array[0], 0])
                else arrayValues.push([array[successors[i][1] + 1], successors[i][1] + 1]);
            }
        }
        arrayValues = arrayValues.sort(function (a, b) { return b[0] - a[0] });
        console.log('> Sortirani: ' + JSON.stringify(arrayValues));

        for (let j = 0; j < Math.floor(arrayValues.length / 2); j++) {
            best[j] = arrayValues[j];
            if (best[j][0] >= target) {
                score = best[j][1];
                return score;
            }
        }
        console.log('> Sledeci: ' + JSON.stringify(best));
        return;
    }
    while (buffer < limit) {
        if (score > -1) {
            document.getElementById('iteration').innerHTML = '<span style="font-weight: bold">Iteration: <span>' + buffer;
            return score;
        } else {
            main(best);
            buffer++;
        }
    }
    document.getElementById('iteration').innerHTML = '<span style="font-weight: bold">Iteration: <span>' + 'Maximum';
    return "Not found";
}

// Function for generating random array
function generateRandomArray(length, max) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * max));
}

document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        generate();
    }
});