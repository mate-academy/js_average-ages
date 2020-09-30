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
  const men = [...people].filter(({ sex, died }) => century
    ? sex === 'm' && Math.ceil(died / 100) === century
    : sex === 'm');

  const ages = [];

  men.forEach(({ born, died }) => ages.push(died - born));

  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = [...people].filter(({ sex }) => sex === 'f');
  const ages = [];

  if (withChildren) {
    const mothers = [];

    for (const woman of women) {
      people.forEach(person => {
        if (woman.name === person.mother && !mothers.includes(woman)) {
          mothers.push(woman);
        }
      });
    }

    mothers.forEach(({ born, died }) => ages.push(died - born));
  } else {
    women.forEach(({ born, died }) => ages.push(died - born));
  }

  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const ages = [];
  const women = [...people].filter(({ sex }) => sex === 'f');
  const mothers = [];

  for (const woman of women) {
    people.forEach(person => {
      if (woman.name === person.mother
        && !mothers.includes(woman)) {
        mothers.push(woman);
      }
    });
  }

  mothers.forEach(mother => {
    const children = onlyWithSon
      ? people.filter(child =>
        child.mother === mother.name && child.sex === 'm')
      : people.filter(child => child.mother === mother.name);

    children.forEach(child => ages.push(child.born - mother.born));
  });

  return ages.reduce((sum, age) => sum + age, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
