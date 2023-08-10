'use strict';

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const onlyMen = genderFilter(people, 'm');

  const filteredMen = (century)
    ? onlyMen.filter(person => Math.ceil(person.died / 100) === century)
    : onlyMen;

  const sumOfOnlyMenAge = sumAge(filteredMen);

  return sumOfOnlyMenAge / filteredMen.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = genderFilter(people, 'f');

  const filteredWomen = (withChildren)
    ? onlyWomen.filter(woman => people.some(p => p.mother === woman.name))
    : onlyWomen;

  const sumOfAllWomenAge = sumAge(filteredWomen);

  return sumOfAllWomenAge / filteredWomen.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value
}

function sumAge(people) {
  return people
    .reduce((acc, person) => acc + (person.died - person.born), 0);
}

function genderFilter(people, gender) {
  return people.filter(person => person.sex === gender);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

// I added some custom functions, since we use some calculations/checks twice;
