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
  let result = people;
  let sumAge = 0;

  (century) ? result = people.filter(person =>
    (Math.ceil(person.died / 100) === century) && person.sex === 'm')
    : result = people.filter(person => person.sex === 'm');

  sumAge = result.reduce(
    (sum, person) => (sum + (person.died - person.born)), 0);

  return sumAge / result.length;
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
  let result = people;
  let sumAge = 0;

  if (withChildren) {
    result = people.filter(person =>
      people.some(children => person.name === children.mother)
       && person.sex === 'f');
  } else {
    result = people.filter(person => person.sex === 'f');
  }

  sumAge = result.reduce(
    (sum, person) => (sum + (person.died - person.born)), 0);

  return sumAge / result.length;
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

  let sumChildren = 0;
  let mother = [];

  const result = people.filter(person =>
    (people.filter(children => person.name === children.mother)).length > 0);

  const sum = people.reduce((summa, element) => {
    if (onlyWithSon) {
      mother = result.filter(human =>
        element.mother === human.name && element.sex === 'm');
    } else {
      mother = result.filter(human => element.mother === human.name);
    }

    if (mother.length > 0) {
      sumChildren++;

      return (element.born - mother[0].born) + summa;
    }

    return summa;
  }, 0);

  return sum / sumChildren;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
