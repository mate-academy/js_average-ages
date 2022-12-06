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
  const sexFilter = people.filter((person) => person.sex === 'm');

  const centuryCheck = (century)
    ? sexFilter.filter((man) => century === Math.ceil(man.died / 100))
    : sexFilter;

  const manAges = getAges(centuryCheck);

  return manAges.reduce((sum, value) => sum + value) / manAges.length;
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
  const womenCheck = people.filter(person =>
    withChildren
      ? person.sex === 'f' && people.find(child => person.name === child.mother)
      : person.sex === 'f'
  );

  const womanAge = getAges(womenCheck);

  return womanAge.reduce((sum, value) => sum + value) / womanAge.length;
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
  const checkChild = people.filter(person => {
    const hasMother = people.some(mother => person.mother === mother.name);
    const isBoy = person.sex === 'm';

    return (onlyWithSon)
      ? hasMother && isBoy
      : hasMother;
  });

  const diffAge = checkChild.map(kid => {
    const mom = people.find(mother => kid.mother === mother.name);

    return kid.born - mom.born;
  });

  return diffAge.reduce((sum, value) => sum + value) / diffAge.length;
}

const getAges = (people) => {
  return people.map(person => person.died - person.born);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
