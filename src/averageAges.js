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
  const men = (century)
    ? people.filter(person => {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    })
    : people.filter(person => person.sex === 'm');

  const totalAges = men.reduce((sum, { born, died }) => {
    return sum + died - born;
  }, 0);

  return totalAges / men.length;
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
  const women = (withChildren)
    ? people.filter(mother => {
      return people.find(person => person.mother === mother.name);
    })
    : people.filter(person => person.sex === 'f');

  const totalAges = women.reduce((sum, { born, died }) => {
    return sum + died - born;
  }, 0);

  return totalAges / women.length;
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
  const children = (onlyWithSon)
    ? people.filter(child => {
      return people.some(person => {
        return person.name === child.mother && child.sex === 'm';
      });
    })
    : people.filter(child => {
      return people.some(person => person.name === child.mother);
    });

  const totalAges = children.reduce((sum, child) => {
    const mother = people.find(person => child.mother === person.name);

    return sum + child.born - mother.born;
  }, 0);

  return totalAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
