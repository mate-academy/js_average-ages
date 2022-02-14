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
  const addAge = people.map(item =>
    Object.assign(item, { age: (item.died - item.born) }, {
      centuries:
        Math.ceil(item.died / 100),
    }));
  let filSexDied = [];

  century
    ? filSexDied = addAge.filter(item => item.sex === 'm'
    && item.centuries === century)
    : filSexDied = addAge.filter(item => item.sex === 'm');

  const sum = filSexDied.reduce((ac, person) => ac + person.age, 0);

  return sum / filSexDied.length;
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
  const addAge = people.map(item =>
    Object.assign(item, { age: (item.died - item.born) }));

  let woman = [];

  withChildren
    ? woman = addAge.filter(women => women.sex === 'f'
      && people.some(item => item.mother === women.name))
    : woman = addAge.filter(item => item.sex === 'f');

  const sum = woman.reduce((ac, person) => ac + person.age, 0);

  return sum / woman.length;
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
  let childALL = [];

  onlyWithSon
    ? childALL = people.filter(child =>
      child.sex === 'm' && people.some(item => item.name === child.mother))
    : childALL = people.filter(child =>
      people.some(item => item.name === child.mother));

  const ageDiff = childALL.map(person => {
    const diff = people.find(elem => person.mother === elem.name);

    return person.born - diff.born;
  });

  const result = ageDiff.reduce((prev, next) =>
    prev + next, 0) / ageDiff.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
