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

  const manArr = century
    ? people.filter(
      person =>
        (person.sex === 'm') && (Math.ceil(person.died / 100) === century)
    )
    : people.filter(
      person =>
        person.sex === 'm'
    );

  const ages = manArr.map(men => men.died - men.born);

  return +(ages.reduce((sum, age) => sum + age, 0) / ages.length).toFixed(2);
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
  const womenArr = withChildren
    ? people.filter(
      (person) =>
        person.sex === 'f'
          && people.some(child => child.mother === person.name)
    )
    : people.filter((person) => person.sex === 'f');
  const womanAges = womenArr.map((person) => person.died - person.born);
  const sumOfAges = womanAges.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAges / womanAges.length;

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
  const childrenArr = onlyWithSon
    ? people.filter(
      child => people
        .some(mother => child.mother === mother.name) && child.sex === 'm'
    )
    : people.filter(
      child => people
        .some(mother => child.mother === mother.name)
    );

  const ages = childrenArr
    .map(child =>
      child.born - people.find(mother => mother.name === child.mother).born);

  return +(ages.reduce((sum, age) => sum + age, 0) / ages.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
