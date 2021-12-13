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
  const men = people.filter(x => x.sex === 'm'
  && ((!century) || Math.ceil(x.died / 100) === century));
  const sum = men.map(x => x.died - x.born).reduce((a, b) => a + b);

  return sum / men.length;
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
  const mothers = people.map(x => x.mother);
  const women = people.filter(x => x.sex === 'f'
  && ((!withChildren) || mothers.includes(x.name)));
  const sum = women.map(x => x.died - x.born).reduce((a, b) => a + b);

  return sum / women.length;
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
  const mothers = people.filter(x => (!onlyWithSon)
  || x.sex === 'm').map(x => ({
    motherName: x.mother,
    childBirth: x.born,
  }));
  const ageDiffs = [];

  for (const person of people) {
    mothers.forEach(function(mother) {
      if (mother.motherName === person.name) {
        ageDiffs.push(mother.childBirth - person.born);
      }
    });
  }

  const sum = ageDiffs.reduce((a, b) => a + b);

  return sum / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
