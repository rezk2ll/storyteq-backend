/**
 * Searches for the largest integer in a shifted list.  
 * 
 * @param {number[]} list - the shifted list.
 * @param {number} start - the start index to search from.
 * @param {number} end - the end index to stop searching at.
 * @returns {number} - the largest number.
 */
function search(list, start, end) {
  if (start === end) {
    return list[start];
  }

  const middle = Math.floor(start + (end - start) / 2);

  if (list[start] > list[middle]) {
    return search(list, start, middle-1);
  }

  if (list[middle] > list[middle + 1]) {
    return list[middle];
  }

  return search(list, middle+1, end);
}

/**
 * 
 * @param {number[]} list - the list of numbers to search from.
 * @returns {number} - the largest number.
 */
function findLargestNumber (list) {
  return search(list, 0, list.length - 1);
}

const { debug } = console;

debug(findLargestNumber([8, 9, 10, 11, 1, 3, 7]));
debug(findLargestNumber([6, 8, 10, 2, 4]));
debug(findLargestNumber([2, 4, 6, 8, 10]));
