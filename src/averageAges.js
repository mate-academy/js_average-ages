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
  /*
  if (century) {
    const oneCentury
    = this.filter(x => Math.ceil(x.died/100) * 100 === century);
  }
  */
  const arrayToUse = century
    ? people.filter(({ died }) => Math.ceil(died / 100) === century)
    : people;

  const men = arrayToUse.filter(({ sex }) => sex === 'm');
  const age = men.map(({ born, died }) => died - born);
  const sumOfAge = age.reduce((prev, x) => prev + x);

  return sumOfAge / men.length;
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
  const arrayToUse = withChildren
    ? people.filter(x => people.some(({ mother }) => mother === x.name))
    : people;

  const women = arrayToUse.filter(x => x.sex === 'f');
  const age = women.map(({ born, died }) => died - born);
  const sumOfAge = age.reduce((prev, x) => prev + x);

  return sumOfAge / women.length;
};

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
  const women = people.filter(x => x.sex === 'f');
  const men = people.filter(x => x.sex === 'm');
  const arrayToUse = onlyWithSon ? men : people;

  const children = arrayToUse.filter(({ mother }) => {
    return women.some(woman => woman.name === mother);
  });

  const ageDiff = children.map(child => {
    const mother = women.find(y => y.name === child.mother);

    return child.born - mother.born;
  });

  const averageDifference
    = ageDiff.reduce((prev, a) => prev + a) / ageDiff.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
