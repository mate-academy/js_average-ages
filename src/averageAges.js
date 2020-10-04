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

  const ages = [];
  const men = people.filter(({ sex }) => sex === 'm');

  if (century) {
    // eslint-disable-next-line max-len
    const generation = men.filter(({ died }) => Math.ceil(died / 100) === century);

    generation.forEach(({ born, died }) => ages.push(died - born));
  } else {
    men.forEach(({ born, died }) => ages.push(died - born));
  }

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
  // write code here
  const womens = people.filter(({ sex }) => sex === 'f');
  const ages = [];

  if (withChildren) {
    const mothers = [];

    for (const women of womens) {
      people.forEach(person => {
        if (women.name === person.mother && !mothers.includes(women)) {
          mothers.push(women);
        }
      });
    }

    mothers.forEach(({ born, died }) => ages.push(died - born));
  } else {
    womens.forEach(({ born, died }) => ages.push(died - born));
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
  // write code here
  const women = people.filter(({ sex }) => sex === 'f');
  const ages = [];
  const mothers = [];

  for (const woman of women) {
    people.forEach(person => {
      if (woman.name === person.mother && !mothers.includes(woman)) {
        mothers.push(woman);
      }
    });
  }

  mothers.forEach(mother => {
    const children = onlyWithSon
      // eslint-disable-next-line max-len
      ? people.filter(child => child.mother === mother.name && child.sex === 'm')
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
