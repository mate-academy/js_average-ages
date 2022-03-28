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
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const menAges = men.map(person => person.died - person.born);
  const sumOfMenAge = menAges.reduce((sum, x) => sum + x, 0);
  const averageMenAges = sumOfMenAge / menAges.length;

  return averageMenAges;
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
  const childrens = people.filter(person => !!person.mother === true);
  const mothers = childrens.map(children => children.mother);

  const women = people.filter(person => withChildren
    ? person.sex === 'f' && mothers.includes(person.name)
    : person.sex === 'f');

  const womenAges = women.map(person => person.died - person.born);
  const sumOfWomenAges = womenAges.reduce((sum, x) => sum + x, 0);
  const averageWomenAges = sumOfWomenAges / womenAges.length;

  return averageWomenAges;
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
  const women = people.filter(person => person.sex === 'f');

  let childrens = people.filter(person => onlyWithSon
    ? !!person.mother === true && person.sex === 'm'
    : !!person.mother === true);

  let motherNames = childrens.map(children => children.mother);
  const mothers = women.filter(person => motherNames.includes(person.name));

  motherNames = mothers.map(mother => mother.name);

  childrens = childrens.filter(children =>
    motherNames.includes(children.mother));

  const birthOfMothers = mothers.reduce((prev, mother) => ({
    ...prev,
    [mother.name]: mother.born,
  }), {});

  const differences = childrens.map(children =>
    children.born - birthOfMothers[children.mother]);
  const sumOfDifferences = differences.reduce((sum, x) => sum + x, 0);
  const averageDifferencesAge = sumOfDifferences / differences.length;

  return averageDifferencesAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
