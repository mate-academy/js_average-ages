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
  const manList = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const manWithAge = manList.map(person =>
    (
      {
        ...person, age: person.died - person.born,
      }));

  const sumManAges = manWithAge.reduce((sum, x) => sum + x.age, 0);
  const averageAge = sumManAges / manList.length;

  return averageAge;
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
  // const womanList = withChildren
  //   ? people.filter(person => person.sex === 'f'
  //   && people.some(child => child.mother === person.name))
  //   : people.filter(person => person.sex === 'f');

  const womanList = people.filter(person => withChildren
    ? person.sex === 'f' && people.some(child => child.mother === person.name)
    : person.sex === 'f');

  const womanWithAge = womanList.map(person =>
    (
      {
        ...person, age: person.died - person.born,
      }));

  const sumWomanAge = womanWithAge.reduce((sum, x) => sum + x.age, 0);
  const averageAge = sumWomanAge / womanList.length;

  return averageAge;
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

  const childrenList = people.filter(person => onlyWithSon
    ? person.sex === 'm'
    && people.find(mother => mother.name === person.mother)
    : people.find(mother =>
      mother.name === person.mother));

  const agesDifference = childrenList.reduce((sum, person) =>
    sum + person.born - people.find(mother =>
      person.mother === mother.name).born, 0);

  const averageAge = agesDifference / childrenList.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
