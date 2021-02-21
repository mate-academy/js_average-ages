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
  const functionToApply
    = (century === undefined) ? allMen() : menOfTheCentury();

  return functionToApply;

  function allMen() {
    const men = people.filter(person => person.sex === 'm');

    const ages = men.map(person =>
      person.died - person.born);

    const result = (ages.reduce((sum, x) =>
      sum + x) / ages.length).toFixed(2);

    return +result;
  }

  function menOfTheCentury() {
    const men = people.filter(person => person.sex === 'm');

    const centuryMen = men.filter(person =>
      Math.ceil(person.died / 100) === century);

    const ages = centuryMen.map(person => person.died - person.born);

    const result = (ages.reduce((sum, x) =>
      sum + x) / ages.length).toFixed(2);

    return +result;
  }
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
  const functionToApply
    = (withChildren === undefined) ? allWomen() : womenWithChildren();

  return functionToApply;

  function allWomen() {
    const women = people.filter(person => person.sex === 'f');

    const ages = women.map(person => person.died - person.born);

    const result = (ages.reduce((sum, x) =>
      sum + x) / ages.length).toFixed(2);

    return +result;
  }

  function womenWithChildren() {
    const women = people.filter(person => person.sex === 'f');

    const womenWhoHaveChildren = women.filter(mother =>
      people.some(child => child.mother === mother.name));

    const ages = womenWhoHaveChildren.map(person => person.died - person.born);

    const result = (ages.reduce((sum, x) =>
      sum + x) / ages.length).toFixed(2);

    return +result;
  }
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
  const functionToApply
    = (onlyWithSon === undefined) ? allMothers() : mothersOfSons();

  return functionToApply;

  function allMothers() {
    const children = people.filter(person => people.some(child =>
      child.name === person.mother));

    const ages = children.map(child =>
      child.born - people.find(mother => mother.name === child.mother).born);

    const result = (ages.reduce((sum, x) =>
      sum + x) / ages.length).toFixed(2);

    return +result;
  }

  function mothersOfSons() {
    const men = people.filter(person => person.sex === 'm');

    const sons = men.filter(person => people.some(child =>
      child.name === person.mother));

    const ages = sons.map(son =>
      son.born - people.find(mother => mother.name === son.mother).born);

    const result = (ages.reduce((sum, x) =>
      sum + x) / ages.length).toFixed(2);

    return +result;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
