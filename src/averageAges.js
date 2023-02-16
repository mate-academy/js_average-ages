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

function getAverageAge(value, length) {
  return Math.round(value / length * 100) / 100;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => {
    const isMen = person.sex === 'm';

    return century ? isMen && Math.ceil(person.died / 100) === century : isMen;
  });

  const totalAge = men.reduce((acc, { died, born }) => {
    return acc + (died - born);
  }, 0);

  return getAverageAge(totalAge, men.length);
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
  const women = people.filter(person => {
    const isWomen = person.sex === 'f';

    return withChildren
      ? isWomen && people.some(({ mother }) => mother === person.name)
      : isWomen;
  });

  const totalAge = women.reduce((acc, { died, born }) => {
    return acc + (died - born);
  }, 0);

  return getAverageAge(totalAge, women.length);
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
  const children = people.filter(person => {
    return onlyWithSon
      ? people.some(({ name }) => name === person.mother && person.sex === 'm')
      : people.some(({ name }) => name === person.mother);
  });

  const diff = children.reduce((acc, child) => {
    const mother = people.find(({ name }) => name === child.mother);

    return acc + (child.born - mother.born);
  }, 0);

  return getAverageAge(diff, children.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
