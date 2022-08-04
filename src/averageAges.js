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
  /* eslint-disable */
  const findMen = people.filter(item => item.sex === 'm');
  const diedInCentury = findMen.filter(item => (Math.ceil(item.died / 100) === century));

  const manAverageAge = (century > 0)
        ? diedInCentury.map(item => item.died - item.born)
        : findMen.map(item => item.died - item.born);

  return manAverageAge.reduce((a, b) => (a + b), 0) / manAverageAge.length;
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
  const findWoman = people.filter(item => item.sex === 'f');
  const motherArr = people.map(item => item.mother);

  const womanWithChildren = people.filter(item => motherArr.includes(item.name));

  const womenAverageAge = (withChildren === true)
        ? womanWithChildren.map(item => item.died - item.born)
        : findWoman.map(item => item.died - item.born);

  return womenAverageAge.reduce((a, b) => (a + b), 0) / womenAverageAge.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothersArr.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothersArr = people.filter(woman =>
    people.find(person => person.mother === woman.name));

  const relativesArray = onlyWithSon
        ? people.filter(child =>
          mothersArr.find(mother => mother.name === child.mother) && child.sex === 'm')
        : people.filter(child =>
          mothersArr.find(mother => mother.name === child.mother));

  const agesDifference = relativesArray.map(child =>
    child.born - mothersArr.find(mother => child.mother === mother.name).born);

  return agesDifference.reduce((a, b) => a + b) / agesDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
