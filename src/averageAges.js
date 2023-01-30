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
  const men = century
    ? people.filter(person => (
      Math.ceil(person.died / 100) === century && person.sex === 'm')
    )
    : people.filter(person => person.sex === 'm');

  const ages = men.map(onePerson => onePerson.died - onePerson.born);

  return averageAges(ages, men.length);
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
  const women = withChildren
    ? people.filter(person =>
      people.some(child => child.mother === person.name) && person.sex === 'f')
    : people.filter(person => person.sex === 'f');

  const ages = women.map(onePerson => onePerson.died - onePerson.born);

  return averageAges(ages, women.length);
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
  const children = onlyWithSon
    ? people.filter(person =>
      people.some(mother => mother.name === person.mother)
      && person.sex === 'm')
    : people.filter(person =>
      people.some(mother => mother.name === person.mother));

  const agesKids = children.map(onePerson =>
    onePerson.born - people.find(mother =>
      mother.name === onePerson.mother).born);

  return averageAges(agesKids, children.length);
}

const averageAges = (ages, peopleCount) => {
  return ages.reduce((a, b) => a + b, 0) / peopleCount;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
