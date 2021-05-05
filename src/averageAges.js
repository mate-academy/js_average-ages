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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const men = people.filter((person) => {
    return century
      ? ((Math.ceil(person.died / 100) === century) && person.sex === 'm')
      : (person.sex === 'm');
  })
    .map(age => age.died - age.born);

  const meanAge = men.reduce((sum, age) => sum + age, 0);

  return Math.round((meanAge / men.length) * 100) / 100;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const women = people
    .filter((person) => {
      const name = person.name;

      return withChildren
        ? people.some((mothers) => mothers.mother === name)
        : person.sex === 'f';
    })
    .map(age => age.died - age.born);

  const meanAge = women.reduce((sum, age) => sum + age, 0);

  return Math.round((meanAge / women.length) * 100) / 100;
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
  // write code here
  const women = people.filter((person) => {
    const name = person.name;

    return people.some((child) => {
      return onlyWithSon
        ? child.mother === name && child.sex === 'm'
        : child.mother === name;
    });
  });

  const children = people.filter((child) => {
    return onlyWithSon
      ? women.some(mother => mother.name === child.mother) && child.sex === 'm'
      : women.some(mother => mother.name === child.mother);
  });

  const ages = children.map((childBorn) => {
    const womanBorn = women.find((motherBorn) => {
      return childBorn.mother === motherBorn.name;
    });

    return childBorn.born - womanBorn.born;
  });

  const meanAge = ages.reduce((sum, age) => sum + age, 0);

  return Math.round((meanAge / ages.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
