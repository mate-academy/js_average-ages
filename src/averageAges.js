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
function calculateMenAverageAge(people, century) {
  const menAge = people
    .filter(person => {
      return century
        ? person.sex === 'm' && Math.ceil(person.died / 100) === century
        : person.sex === 'm';
    })
    .map(man => man.died - man.born);

  const sumAges = menAge.reduce((acc, curr) => acc + curr, 0);

  const average = sumAges / menAge.length;

  return Number(average.toFixed(2));
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
  const motherNames = people
    .filter(person => person.mother)
    .map(person => person.mother);

  const calculateWomenAge = people.filter(person => {
    return withChildren
      ? person.sex === 'f' && motherNames.includes(person.name)
      : person.sex === 'f';
  });

  const sumAges = calculateWomenAge
    .map(woman => woman.died - woman.born)
    .reduce((acc, curr) => acc + curr, 0);

  const averageAge = sumAges / calculateWomenAge.length;

  return Number(averageAge.toFixed(2));
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
  const children = people.filter(child => onlyWithSon
    ? people.find(person => child.mother === person.name && child.sex === 'm')
    : people.find(person => child.mother === person.name));

  const differenceAges = children
    .map(child =>
      (child.born - people.find(mother => mother.name === child.mother).born))
    .reduce((sum, age) => sum + age, 0);

  return Number((differenceAges / children.length).toFixed(2));
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
