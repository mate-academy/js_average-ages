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
  let men;

  century
    ? men = people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : men = people.filter(person => person.sex === 'm');

  return +calculateAverageAge(men).toFixed(2);
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
  let female;

  withChildren
    ? female = people.filter(person =>
      people.map(human => human.mother).includes(person.name))
    : female = people.filter(person => person.sex === 'f');

  return +calculateAverageAge(female).toFixed(2);
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
  const mothers = people.filter(person =>
    people.map(human => human.mother).includes(person.name));
  let children;
  const ageDifference = [];

  onlyWithSon
    ? children = people.filter(person =>
      people.map(human => human.name).includes(person.mother)
      && person.sex === 'm')
    : children = people.filter(person =>
      people.map(human => human.name).includes(person.mother));

  children.forEach((child) => {
    const mother = mothers.find(human => human.name === child.mother);

    if (mother) {
      ageDifference.push(child.born - mother.born);
    }
  });

  const averageDifference = ageDifference.reduce((sum, difference) =>
    sum + difference, 0) / ageDifference.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

function calculateAverageAge(fiteredList) {
  return fiteredList.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / fiteredList.length;
}
