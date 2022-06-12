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

  const findMen = arguments.length < 2
    ? people.filter(listOfMen =>
      listOfMen.sex === 'm')

    : people.filter(listOfMen =>
      Math.ceil(listOfMen.died / 100) === century && listOfMen.sex === 'm');

  const sumOfYears = findMen.reduce((previousValue, years) =>
    previousValue + (years.died - years.born), 0);

  const getAvarage = Math.ceil((sumOfYears / findMen.length) * 100) / 100;

  return getAvarage;
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
  const children = people.filter(child =>
    child.mother !== null);
  let findWomen = people.filter(listOfWomen =>
    listOfWomen.sex === 'f');

  if (arguments.length > 1) {
    const listWithChildren = [];

    for (let i = 0; i < children.length; i++) {
      const trueMothers = people.find(list => list.name === children[i].mother);

      if (!listWithChildren.includes(trueMothers)
      && typeof trueMothers !== 'undefined') {
        listWithChildren.push(trueMothers);
      }
    }
    findWomen = listWithChildren;
  }

  const sumOfYears = findWomen.reduce((previousValue, years) =>
    previousValue + (years.died - years.born), 0);
  const getAvarage = Math.round((sumOfYears / findWomen.length) * 100) / 100;

  return getAvarage;
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
  const children = arguments.length < 2
    ? people.filter(child =>
      child.mother !== null)

    : people.filter(child =>
      child.mother !== null && child.sex === 'm');

  const differencesOfYears = [];

  for (let i = 0; i < children.length; i++) {
    const trueMothers = people.find(list => list.name === children[i].mother);

    if (typeof trueMothers !== 'undefined') {
      differencesOfYears.push(children[i].born - trueMothers.born);
    }
  }

  const sumOfYears = differencesOfYears.reduce((previousValue, years) =>
    previousValue + years, 0);
  const getAvarage = Math.round(
    (sumOfYears / differencesOfYears.length) * 100) / 100;

  return getAvarage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
