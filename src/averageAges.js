'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function averageAge(somePeople) {
  return somePeople.reduce((a, b) => (a + (b.died - b.born)), 0)
  / somePeople.length;
}

function calculateMenAverageAge(people, century) {
  const onlyMen = people.filter(person => (century === undefined)
    ? person.sex === 'm'
    : person.sex === 'm' && Math.ceil(person.died / 100) === century);

  return averageAge(onlyMen);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const onlyWomen = people.filter(person => (withChildren === undefined)
    ? person.sex === 'f'
    : person.sex === 'f' && people.find(someone => someone.mother
       === person.name));

  return averageAge(onlyWomen);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenOfMothers = people.filter(person => (onlyWithSon !== undefined)

    ? people.some(someMother => someMother.name === person.mother)
    && person.sex === 'm'

    : people.some(someMother => someMother.name === person.mother));

  const ageDifference = childrenOfMothers.map(person => person.born
     - people.find(someMother => someMother.name === person.mother).born);

  return ageDifference.reduce((a, b) => a + b) / ageDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
