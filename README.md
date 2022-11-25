# Back-End Challenge

the following scripts were tested using NodeJs 14

### Shifted List Search

#### how to run

```sh
node shifted-list-search.js
```
#### questions:

> 1. Can you identify any edge cases that we need to account for?
- empty arrays, or numbers bigger than MAX_SAFE_INTEGER ( 9007199254740991 ).

> 2. Can you explain the orders of growth implications of the algorithm you implemented?
- O(log n)

> 3. Suppose our initial list contains 1 million elements, is there a more performant way we can find the answer?
- No, a more performant way would have O(1) complexity which means knowing exactly where the largest number could be, either a section of the divided original array. 

### Most Occurring Triplets

#### how to run:

```sh
node most-occurring-triplets.js
```
