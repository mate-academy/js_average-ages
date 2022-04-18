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
  let ages = 0;

  const filtered = century
    ? people.filter(person => Math.ceil(person.died / 100) === century
    && person.sex === 'm')
    : people.filter(person => person.sex === 'm');

  filtered.map(person => {
    ages += (person.died - person.born);

    return ages;
  });

  return ages / filtered.length;
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  let ages = 0;

  const filtered = withChildren
    ? people.filter(person => people.find(child =>
      child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  filtered.map(person => {
    ages += (person.died - person.born);
  });

  return ages / filtered.length;
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
  const womenArr = onlyWithSon
    ? people.filter(person => people.find(child => child.mother === person.name
      && child.sex === 'm'))
    : people.filter(person => people.find(child =>
      child.mother === person.name));

  const arr = [];

  onlyWithSon
    ? womenArr.map(person => people.find(child => {
      person.name === child.mother && child.sex === 'm'
          && arr.push(child.born - person.born);
    }))
    : womenArr.map(person => people.find(child => {
      person.name === child.mother
        && arr.push(child.born - person.born);
    }));

  let ages = 0;

  arr.map(age => {
    ages += age;
  });

  return ages / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
