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

  /* create array only with men, if century is passed
  than it creates a separate array */
  function getSex(male) {
    const men = (typeof century === 'undefined')
      ? (male['sex'] === 'm')
      : (male['sex'] === 'm')
    && (Math.ceil(male['died'] / 100) === century);

    return men;
  }

  const getOnlyMales = people.filter(getSex);

  // get ages of all men
  function getAgeDifference(age) {
    const lifeSpan = (age['died'] - age['born']);

    return lifeSpan;
  }

  const ageDifference = getOnlyMales.map(getAgeDifference);

  // add all ages
  const sumOfAges = ageDifference.reduce((first, next) => first + next, 0);

  // get average age
  const averageAge = sumOfAges / ageDifference.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  /* create array only with women, if withChildren is passed
  than it creates a separate array of mathers */
  function getSex(female) {
    const women = (typeof withChildren !== 'undefined')
      ? female.sex === 'f'
    && people.some(person => female.name === person.mother)
      : female['sex'] === 'f';

    return women;
  }

  const getOnlyFemales = people.filter(getSex);

  // get ages of all women
  function getAgeDifference(age) {
    const lifeSpan = (age['died'] - age['born']);

    return lifeSpan;
  }

  const ageDifference = getOnlyFemales.map(getAgeDifference);

  // add all ages
  const sumOfAges = ageDifference.reduce((first, next) => first + next, 0);

  // get average age
  const averageAge = sumOfAges / ageDifference.length;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  function getChildren(child) {
    const children = (typeof onlyWithSon !== 'undefined')
      ? people.some(person => person.name === child.mother)
      && child.sex === 'm'
      : people.some(person => person.name === child.mother);

    return children;
  }

  const getOnlyChildren = people.filter(getChildren);

  // get ages of all kids
  function getAgeDifference(child) {
    const lifeSpan = child.born
     - (people.find(mum => mum.name === child.mother)).born;

    return lifeSpan;
  }

  const ageDifference = getOnlyChildren.map(getAgeDifference);

  // add all ages
  const sumOfAges = ageDifference.reduce((first, next) => first + next, 0);

  // get average age
  const averageAge = sumOfAges / ageDifference.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
