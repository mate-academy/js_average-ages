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
  function getMenOfTheCentury() {
    return people.filter(
      person => Math.ceil(person.died / 100) === century && person.sex === 'm'
    );
  }

  function getAllMen() {
    return people.filter(person =>
      person.sex === 'm');
  }

  const filteredMen = century ? getMenOfTheCentury() : getAllMen();

  const menAverageAge = filteredMen.reduce((sum, person) =>
    sum + person.died - person.born, 0) / filteredMen.length;

  return +menAverageAge;
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
  function getAllWomen() {
    return people.filter(person => person.sex === 'f');
  }

  function getWomenWithChildren() {
    return people.filter(person =>
      people.some(human => human.mother === person.name));
  }

  const filteredWomen = withChildren ? getWomenWithChildren() : getAllWomen();

  const womenAverageAge = filteredWomen.reduce((sum, person) =>
    sum + person.died - person.born, 0) / filteredWomen.length;

  return +womenAverageAge;
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
  function getMothers() {
    return people.filter(person => people.some(child =>
      child.name === person.mother));
  }

  function getMothersOfSons() {
    return people.filter(person => people.some(child =>
      child.name === person.mother) && person.sex === 'm');
  }

  const mothersToFilter = onlyWithSon ? getMothersOfSons() : getMothers();

  const ages = mothersToFilter.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  const averageAgeDiff = ages.reduce((sum, age) =>
    sum + age, 0) / ages.length;

  return +averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
