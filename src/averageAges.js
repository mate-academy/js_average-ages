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
  const men = people.filter(person => century
    ? (Math.ceil(person.died / 100) === century) && (person.sex === 'm')
    : person.sex === 'm');

  return averAge(men);
}

function averAge(human) {
  const agesHuman = human.map(person => person.died - person.born);
  const result = agesHuman.reduce((sum, data) => sum + data, 0) / human.length;

  return result;
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
  const women = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(woman => person.name === woman.mother)
    : person.sex === 'f');

  return averAge(women);
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
  let amountChildren = 0;
  let children = {};
  const defAges = people.map(mother => {
    onlyWithSon
      ? children = people.filter(person => mother.name === person.mother
      && person.sex === 'm')
      : children = people.filter(person => mother.name === person.mother);

    const agesOfChildren = children.map(child =>
      child.born - mother.born).reduce((sum, age) => sum + age, 0);

    amountChildren += children.length;

    return agesOfChildren;
  });

  const averageAge = defAges.reduce((sum, def) => sum + def, 0)
    / amountChildren;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
