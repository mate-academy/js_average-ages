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

  const filteredPeople = century
    ? people
      .filter(person => {
        return Math.ceil(person.died / 100) === century;
      })
    : people;

  const men = filteredPeople.filter(person => person.sex === 'm');

  const ages = men.reduce((sum, man) => sum + (man.died - man.born), 0);

  return ages / men.length;
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
  const filteredPeople = withChildren
    ? people
      .filter(person => {
        return people.some(child => child.mother === person.name);
      })
    : people;

  const women = filteredPeople.filter(person => person.sex === 'f');

  const ages = women.reduce((sum, woman) => sum + (woman.died - woman.born), 0);

  return ages / women.length;
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
  const women = people
    .filter(person => person.sex === 'f')
    .filter(person => people.some(child => child.mother === person.name));

  const ageGap = [];

  if (onlyWithSon) {
    women.map(woman => people.map(child => {
      if (child.sex === 'm' && child.mother === woman.name) {
        ageGap.push(child.born - woman.born);
      }
    }));
  } else {
    women.map(woman => people.map(child => {
      if (child.mother === woman.name) {
        ageGap.push(child.born - woman.born);
      }
    }));
  }

  return ageGap.reduce((sum, gap) => sum + gap) / ageGap.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
