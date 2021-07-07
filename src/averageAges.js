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
  // creating callback to find men which are suitable for the condition
  function searchMen(key) {
    return century
      ? key.sex === 'm' && Math.ceil(key.died / 100) === century
      : key.sex === 'm';
  }
  // creating callback to calculate avarage age

  function searchAge(prev, a) {
    return prev + (a.died - a.born);
  }
  // implementation of our callbacks in methods

  const manArr = people.filter(searchMen);
  const averageMenAge = manArr.reduce(searchAge, 0) / manArr.length;

  return averageMenAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
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
  // creating callback to find woman which are suitable for the condition

  function searchWoman(key) {
    return withChildren
      ? key.sex === 'f' && people.some(child => key.name === child.mother)
      : key.sex === 'f';
  }
  // creating callback to calculate avarage age

  function searchWomenAge(prev, b) {
    return prev + (b.died - b.born);
  }
  // implementation of our callbacks in methods

  const womenArr = people.filter(searchWoman);
  const averageWomAge = womenArr.reduce(searchWomenAge, 0) / womenArr.length;

  return averageWomAge;
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
  // fill in the array with sons by filter method

  const childArr = people.filter(human => {
    return onlyWithSon
      ? human.sex === 'm' && people.some(woman => woman.name === human.mother)
      : people.some(woman => woman.name === human.mother);
  });
  // fill in the array with age difference by map method

  const ageDiff = childArr.map(children => {
    const mother = people.find(women => children.mother === women.name);

    return children.born - mother.born;
  });
  // calculating avarage age

  const averageAge = ageDiff.reduce((a, b) => a + b) / ageDiff.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
