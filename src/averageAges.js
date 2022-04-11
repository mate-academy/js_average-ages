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

  const centuryTrue = people
    .filter(person => person.sex === 'm'
  && Math.ceil(person.died / 100) === arguments[1]);

  const centuryFalse = people
    .filter(person => person.sex === 'm');

  const argLength = arguments.length;

  const ageMan = (argLength === 2) ? centuryTrue
    .map(person => person.died - person.born) : centuryFalse
    .map(person => person.died - person.born);

  const ageManLength = ageMan.length;

  return ageMan.reduce((sum, age) => sum + age) / ageManLength;
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
  const peopleList = people.map(person => person.mother);

  function checkAvailability(arr, val) {
    return arr.some(arrVal => val === arrVal);
  }

  const avalTrue = people
    .filter(person => person.sex === 'f'
&& checkAvailability(peopleList, person.name));

  const avalFalse = people
    .filter(person => person.sex === 'f');

  const ageWomen = (arguments.length === 2) ? avalTrue
    .map(person => person.died - person.born) : avalFalse
    .map(person => person.died - person.born);

  return ageWomen.reduce((sum, age) => sum + age) / ageWomen.length;
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
  let diffEach;

  const man = people.filter(({ mother, sex }) => sex === 'm'
  && people.find(({ name }) => (
    (mother === name))));

  const everyone = people.filter(({ mother }) => people.find(({ name }) => (
    (mother === name))));

  if (arguments.length === 2) {
    diffEach = man.map(son => {
      const motherOb = people.find(mom => mom.name === son.mother);

      return son.born - motherOb.born;
    });
  } else {
    diffEach = everyone.map(child => {
      const motherOb = people.find(mom => mom.name === child.mother);

      return child.born - motherOb.born;
    });
  }

  return diffEach.reduce((sum, x) => (sum + x), 0) / diffEach.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
