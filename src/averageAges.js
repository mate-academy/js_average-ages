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
  let count = 0;

  return round(people
    .filter(human => {
      return (human.sex === 'm' && !century)
        || (human.sex === 'm' && century === Math.ceil(human.died / 100));
    })
    .map((person) => {
      count++;

      return person.died - person.born;
    })
    .reduce((a, b) => a + b, 0) / count);
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
  let count = 0;

  return round(people
    .filter(human => {
      return (human.sex === 'f' && !withChildren)
        || (human.sex === 'f' && people.find(row => human.name === row.mother));
    })
    .map((woman) => {
      count++;

      return woman.died - woman.born;
    })
    .reduce((a, b) => a + b, 0) / count);
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
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const findMothers = (child) => people
    .find(mother => mother.name === child.mother);

  const arrWithChild = people.filter((child) => onlyWithSon
    ? child.sex === 'm' && findMothers(child)
    : findMothers(child));

  const arrayWithDiffAverageAge = arrWithChild
    .map(child => {
      return child.born - findMothers(child).born;
    });

  return arrayWithDiffAverageAge
    .reduce((a, b) => a + b) / arrayWithDiffAverageAge.length;
}

function round(num) {
  return (Math.round((num * Math.pow(10, 2))) / Math.pow(10, 2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
