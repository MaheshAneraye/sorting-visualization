let values = [];
let w = 10;
let sorting = false;
let ascending = true;
let currentAlgorithm = "bubbleSort";
let sortingGenerator;

// Setup canvas using p5.js
function setup() {
    createCanvas(600, 400).parent('visualization');
    resetList();
}

// Function to reset the list of values with user-defined range
function resetList() {
    let minRange = parseInt(document.getElementById("minRange").value);
    let maxRange = parseInt(document.getElementById("maxRange").value);
    let numValues = parseInt(document.getElementById("numValues").value);

    w = width / numValues;
    values = new Array(numValues);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(minRange, maxRange);
    }
    sorting = false;
}

// Draw function for p5.js (visualize the bars)
function draw() {
    background(255);

    for (let i = 0; i < values.length; i++) {
        let barColor = color(map(values[i], Math.min(...values), Math.max(...values), 0, 255), 100, 150);
        fill(barColor);
        stroke(0);
        rect(i * w, height - values[i], w, values[i]);
    }

    if (sorting) {
        if (sortingGenerator && sortingGenerator.next().done) {
            sorting = false;
        }
    }
}

// Function to start sorting
function startSorting() {
    if (!sorting) {
        if (currentAlgorithm === "bubbleSort") {
            sortingGenerator = bubbleSort(ascending);
        } else if (currentAlgorithm === "insertionSort") {
            sortingGenerator = insertionSort(ascending);
        }
        sorting = true;
    }
}

// Function to set the sorting order
function setOrder() {
    let order = document.getElementById("order").value;
    ascending = order === "ascending";
}

// Function to set the sorting algorithm
function setAlgorithm() {
    let algorithm = document.getElementById("algorithm").value;
    if (!sorting) {
        currentAlgorithm = algorithm;
    }
}

// Bubble Sort algorithm
function* bubbleSort(ascending) {
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length - i - 1; j++) {
            let a = values[j];
            let b = values[j + 1];
            if ((ascending && a > b) || (!ascending && a < b)) {
                swap(values, j, j + 1);
            }
            yield;
        }
    }
}

// Insertion Sort algorithm
function* insertionSort(ascending) {
    for (let i = 1; i < values.length; i++) {
        let current = values[i];
        let j = i - 1;
        while (j >= 0 && ((ascending && values[j] > current) || (!ascending && values[j] < current))) {
            values[j + 1] = values[j];
            j--;
            yield;
        }
        values[j + 1] = current;
        yield;
    }
}

// Swap two values in the array
function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
