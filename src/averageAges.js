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
function calculateAverageLifeDuration(peopleArray) {
  return peopleArray.reduce((averageAge, person) =>
    averageAge + (person.died - person.born), 0) / peopleArray.length;
}

function calculateMenAverageAge(people, century) {
  const names = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  return calculateAverageLifeDuration(names);
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
    .filter(person => person.mother !== null)
    .map(person => person.mother);

  const names = people.filter(person => withChildren
    ? motherNames.includes(person.name)
    : person.sex === 'f');

  return calculateAverageLifeDuration(names);
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
  const childrenArray = people.filter(child => onlyWithSon
    ? (people.find(mother => child.mother === mother.name
      && child.sex === 'm'))
    : (people.find(mother => child.mother === mother.name)));

  return childrenArray.reduce((difference, child) => {
    return difference + child.born - people.find(mother =>
      child.mother === mother.name).born;
  }, 0) / childrenArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
