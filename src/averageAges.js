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
  const men = people.filter(person => person.sex === 'm');

  const menAges = century ?
    men.filter(male => Math.ceil(male.died / 100) === century)
    .map(male => male.died - male.born): // takes people who died in the century and returns people age
    men.map(male => male.died - male.born);

  const totalAges = menAges.reduce((a, b) => a + b);

  return Math.round((totalAges / menAges.length) * 100) / 100;
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
  // write code here

  const womenAges = withChildren
    ? people.filter(female => people.find(child => child.mother === female.name))
    : people.filter(female => female.sex === 'f');

  const womanAge = womenAges.map(woman => woman.died - woman.born)

  const totalAges = womanAge.reduce((a, b) => a + b);

  return Math.round((totalAges / womenAges.length) * 100) / 100;
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
  // write code here
  const mothers = onlyWithSon ?
    people.filter(person =>
      people.find(child => child.mother === person.name && child.sex === 'm')):
    people.filter(person =>
      people.find(child => child.mother === person.name));

  const children = onlyWithSon ?
    people.filter(person =>
      people.find(mother => person.mother === mother.name && person.sex === 'm')):
    people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const ages = children.map(child =>
    child.born - mothers.find(mother => child.mother === mother.name).born);

  const totalAges = ages.reduce((a, b) => a + b);

  return Math.round((totalAges / ages.length) * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
