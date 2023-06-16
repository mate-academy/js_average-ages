'use strict';

/*
* function for calculate avarage age in array
*/
function calculateAverageAge(people) {
  const ages = people.map(person => person.died - person.born);
  const sumOfAges = ages.reduce((sum, age) => sum + age, 0);
  const averageAge = sumOfAges / ages.length;

  return averageAge;
}

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
  const menArray = people.filter(century
    ? person => Math.ceil(person.died / 100) === century
      && person.sex === 'm'
    : person => person.sex === 'm');

  return calculateAverageAge(menArray);
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
  const womenArray = people.filter(withChildren
    ? person => person.sex === 'f'
      && people.some(child => child.mother === person.name)
    : person => person.sex === 'f');

  return calculateAverageAge(womenArray);
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
  const children = people.filter(child => onlyWithSon
    ? child.sex === 'm' && people.some(mother => mother.name === child.mother)
    : people.some(mother => mother.name === child.mother));

  const averageAgeDifference = children.reduce((sum, child) => {
    const mother = people.find(woman => woman.name === child.mother);

    return sum + ((child.born - mother.born));
  }, 0) / children.length;

  return Math.round(averageAgeDifference * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
