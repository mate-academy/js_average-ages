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
  const men = people.filter(person => person.sex === 'm');
  const deadMenInCentury = men
    .filter(person => Math.ceil(person.died / 100) === century);

  const ages = (century)
    ? calculateAges(deadMenInCentury)
    : calculateAges(men);

  return calculateAverageAge(ages);
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
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = women
    .filter(mother => people.some(child => child.mother === mother.name));

  const ages = (withChildren)
    ? calculateAges(womenWithChildren)
    : calculateAges(women);

  return calculateAverageAge(ages);
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
  let children = people
    .filter(child => people.find(mother => mother.name === child.mother));

  children = (onlyWithSon)
    ? children = children.filter(child => child.sex === 'm')
    : children;

  const agesDiff = children
    .map(child => child.born - people
      .find(mother => mother.name === child.mother).born);

  return calculateAverageAge(agesDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

function calculateAverageAge(arrAges) {
  return arrAges.reduce((sum, number) => sum + number) / arrAges.length;
}

function calculateAges(persons) {
  return persons.map(person => person.died - person.born);
}
