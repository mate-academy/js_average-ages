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
  let men = people.filter(person => (person.sex === 'm'));

  century ? men = men.filter(person => (
    Math.ceil(person.died / 100) === century
  )) : men.sort();

  return men.reduce((a, b) => (
    a + (b.died - b.born)
  ), 0) / men.length;
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
  let result = people.filter(person => (person.sex === 'f'));

  const mothers = result.filter(el => (
    people.findIndex(person => person.mother === el.name) !== -1
  )).map(person => person.name);

  withChildren ? result = result.filter(person => (
    mothers.includes(person.name))
  ) : result.sort();

  return result.reduce((a, b) => (
    a + (b.died - b.born)
  ), 0) / result.length;
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
  let children = [];

  onlyWithSon ? children = people.filter(el => (
    people.findIndex(person => person.name === el.mother) !== -1
  ) && el.sex === 'm')
    : children = people.filter(el => (
      people.findIndex(person => person.name === el.mother) !== -1
    ));

  const mothers = people.filter(woman => (woman.sex === 'f'))
    .filter(el => (
      children.findIndex(person => person.mother === el.name) !== -1
    ));

  const result = children.reduce((a, b) => {
    const mother = mothers.find(person => (
      person.name === b.mother
    ));

    return a + (b.born - (Object.entries(mother))
      .find(([key, value]) => (key === 'born'))[1]);
  }, 0);

  return result / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
