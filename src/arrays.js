// ─── Arrays ───────────────────────────────────────────

const testArray = [10, 20, 30, 40, 50];

// 1. customMap
// iterate over arr, apply cb to each item, return new array
function customMap(arr, callbackFn) {
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    newArr.push(callbackFn(arr[i], i, arr));
  }

  return newArr;
}

// 2. customFilter
// iterate over arr, keep items where cb returns true

function customFilter(arr, callbackFn) {
  const filteredArr = [];

  for (element of arr) {
    if (callbackFn(element)) {
      filteredArr.push(element);
    }
  }

  return filteredArr;
}

// 3. customReduce
// iterate over arr, accumulate a single value using cb + initialValue

function customReduce(arr, callbackFn, initialValue) {
  let accumulator = initialValue ? initialValue : arr[0];

  const startingIndex = initialValue ? 0 : 1;

  for (let i = startingIndex; i < arr.length; i++) {
    accumulator = callbackFn(accumulator, arr[i], i, arr);
  }

  return accumulator;
}

// 4. groupBy
// iterate over arr, group objects by a given property key

function customGroupBy(arr, callbackFn) {
  const obj = {};

  for (let i = 0; i < arr.length; i++) {
    const newKey = callbackFn(arr[i]);

    obj[newKey] ||= [];
    obj[newKey].push(arr[i]);

    // if(newKey in obj){
    //   obj[newKey].push(arr[i]);
    // }
    // else{
    //   obj[newKey] = [arr[i]];
    // }
  }
  return obj;
}

// 5. flattenArray
// recursively flatten a deeply nested array into a single level

function flatternArray(arr) {
  let flattenedArray = [];

  for (element of arr) {
    if (!Array.isArray(element)) flattenedArray.push(element);
    else {
      flattenedArray.push(...flatternArray(element));
    }
  }
  return flattenedArray;
}
