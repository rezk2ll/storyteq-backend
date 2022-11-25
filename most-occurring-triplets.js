/**
 * Gets the unique visit session for each user.
 *
 * @param {string[]} entries - an array of [page, user] tuples.
 * @returns {Object} - the unique visits for each user.
 */
function getUniqueVisitsPerUser(entries) {
  const uniqueVisits = {};

  entries.forEach(entry => {
    const [page, user] = entry;

    if (!uniqueVisits[user]) {
      uniqueVisits[user] = [page];
    } else {
      uniqueVisits[user].push(page);
    }
  });

  return uniqueVisits;
}

/**
 * Computes the triplets for a specific user visit session.
 *
 * @param {string[]} unique_visit - the user unique visit session.
 * @returns {string[][]} - the computed triplets.
 */
function getTtripletsFromUniqueVisit(unique_visit) {
  const triplets = [];
  const temporaryVisit = [...unique_visit];

  while (temporaryVisit.length >= 3) {
    triplets.push(temporaryVisit.slice(0, 3));
    temporaryVisit.shift();
  }

  return triplets;
}

/**
 * Returns the sorted unique list of triplets.
 *
 * @param {string[][]} triplets - the list of triplets to sort.
 * @param {Object} occurences - the occurences of the specified triplets.
 * @returns {string[][]} - the sorted unique list of triplets.
 */
function getSortedUniqueTriplets(triplets, occurences) {
  const unique_triplets = Array.from((new Map(triplets.map(visit => [visit.join("$"), visit]))).values());

  const sorted_occurences = unique_triplets.sort((item1, item2) => {
    return occurences[item2.join("$")] - occurences[item1.join("$")]
  });

  return sorted_occurences;
}

/**
 * Get the 10 triplets within the logs.
 *
 * @param {string[][]} logs - the array of tuples [page, user].
 * @returns {string[][]} - the 10 most occuring triplets.
 */
function search_triplets(logs) {
  const uniqueVisits = getUniqueVisitsPerUser(logs);
  const triplets = [];

  Object.values(uniqueVisits).forEach(visit => {
    triplets.push(...getTtripletsFromUniqueVisit(visit));
  });

  const occurences = triplets.reduce((container, visit) => {
    const index = visit.join("$");

    container[index] = (container[index] || 0) + 1;

    return container;
  }, {});

  return getSortedUniqueTriplets(triplets, occurences)
    // only the first 10
    .slice(0, 10);
}

const logFile = [
  ['/', 'user_1'],
  ['/about', 'user_1'],
  ['/', 'user_3'],
  ['/features', 'user_1'],
  ['/about', 'user_2'],
  ['/purchase', 'user_2'],
  ['/purchase', 'user_1'],
  ['/thank-you', 'user_1'],
  ['/about', 'user_3'],
  ['/thank-you', 'user_2'],
  ['/purchase', 'user_3'],
  ['/thank-you', 'user_3'],
];

console.debug(search_triplets(logFile));
