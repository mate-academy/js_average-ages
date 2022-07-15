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

  let mans = people.filter(person =>
    (person.sex === 'm' && Math.ceil(person.died / 100) === century));

  if (century === undefined) {
    mans = people.filter(person => person.sex === 'm');
  }

  const ages = mans.map(person => person.died - person.born);

  if (!ages.length) {
    return 0;
  }

  const total = ages.reduce((a, b) => a + b);

  return (Math.ceil(total / ages.length * 100)) / 100;
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
  let woman = people.filter(person => person.sex === 'f' && (people.find((a) =>
    a.mother === person.name)));

  if (withChildren === undefined) {
    woman = people.filter(person => person.sex === 'f');
  }

  const ages = woman.map(person => person.died - person.born);

  if (!ages.length) {
    return 0;
  }

  const total = ages.reduce((a, b) => a + b);

  return total / ages.length;
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
  const mothers = people.filter(person => {
    const { name } = person;

    const womenWillBeCalculated = onlyWithSon
      ? people.find((child) => child.mother === name && child.sex === 'm')
      : people.find((child) => child.mother === name);

    return womenWillBeCalculated;
  });

  const babies = people.filter(child => {
    const result = onlyWithSon
      ? child.sex === 'm'
        && mothers.find(mother => child.mother === mother.name)
      : mothers.find(mother => child.mother === mother.name);

    return result;
  });

  const difference = babies.map(person => person.born - mothers.find(mother =>
    mother.name === person.mother).born);

  if (!difference.length) {
    return 0;
  }

  const total = difference.reduce((a, b) => a + b);

  return total / difference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
