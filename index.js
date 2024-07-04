const refs = {
  fileInput: document.querySelector("#fileInput"),
  button: document.querySelector("button"),
  resultList: document.querySelector("#resultList"),
  loadingMessage: document.querySelector("#loadingMessage"),
};

refs.button.addEventListener("click", calculate);

function calculate() {
  reset();
  refs.loadingMessage.style.display = "block";
  const file = refs.fileInput.files[0];
  if (!file) {
    appendResult(`Choose file`);
    refs.loadingMessage.style.display = "none";
    return;
  }
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function () {
    const startTime = performance.now();
    const content = processFileContent(reader.result);
    const sortedArray = [...content].sort((a, b) => a - b);

    findMaxNumber(sortedArray);
    findMinNumber(sortedArray);
    findMedian(content);
    findArithmeticMean(sortedArray);
    increasingSeq(content);
    decreasingDec(content);

    const endTime = performance.now();

    timer(startTime, endTime);
    refs.loadingMessage.style.display = "none";
  };

  reader.onerror = () => {
    refs.loadingMessage.style.display = "none";
    console.log("Error calculate file");
  };
}

function processFileContent(content) {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((n) => n != "")
    .map(Number)
    .filter((n) => !isNaN(n));
}

function findMaxNumber(sortedArray) {
  const maxNumber = sortedArray[sortedArray.length - 1];
  appendResult(`Largest number: ${maxNumber}`);
}

function findMinNumber(sortedArray) {
  const minNumber = sortedArray[0];
  appendResult(`Smallest number: ${minNumber}`);
}

function findMedian(sortedArray) {
  const length = sortedArray.length;
  const middle = Math.floor(length / 2);
  console.log("Middle", middle);
  if (length % 2 !== 0) {
    appendResult(`Median: ${sortedArray[middle]}`);
  } else {
    const value = (sortedArray[middle - 1] + sortedArray[middle]) / 2;
    appendResult(`Median: ${value}`);
  }
}

function findArithmeticMean(sortedArray) {
  const sumNumbers = sortedArray.reduce((total, number) => {
    return total + number;
  }, 0);
  const value = sumNumbers / sortedArray.length;
  appendResult(`Arithmetic mean: ${value}`);
}

function timer(startTime, endTime) {
  const timeTaken = (endTime - startTime) / 1000;
  appendResult(`Calculation time: ${timeTaken.toFixed(2)} seconds`);
}

function increasingSeq(array) {
  let maxSeq = [];
  let currentSeq = [array[0]];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) {
      currentSeq.push(array[i]);
    } else {
      if (currentSeq.length > maxSeq.length) {
        maxSeq = [...currentSeq];
      }
      currentSeq = [array[i]];
    }
  }
  if (currentSeq.length > maxSeq.length) {
    maxSeq = currentSeq;
  }
  appendResult(
    `The largest sequence of numbers, increasing: ${maxSeq.join(
      " / "
    )}. Max length ${maxSeq.length}`
  );
}

function decreasingDec(array) {
  let maxSeq = [];
  let currentSeq = [array[0]];

  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) {
      currentSeq.push(array[i]);
    } else {
      if (currentSeq.length > maxSeq.length) {
        maxSeq = [...currentSeq];
      }
      currentSeq = [array[i]];
    }
  }
  if (currentSeq.length > maxSeq.length) {
    maxSeq = currentSeq;
  }

  appendResult(
    `The largest sequence of numbers, decreasing: ${maxSeq.join(
      " / "
    )}. Max length ${maxSeq.length}`
  );
}

function appendResult(text) {
  const element = document.createElement("li");
  element.textContent = text;
  refs.resultList.append(element);
}

function reset() {
  refs.resultList.innerHTML = "";
}
