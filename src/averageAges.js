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
  const newArr = people.filter(person =>
    century === undefined
      ? person.sex === 'm'
      : Math.ceil(person.died / 100) === century && person.sex === 'm');
  const personsAges = newArr.map(person => person.died - person.born);

  return personsAges.reduce((acu, cur) => acu + cur) / personsAges.length;
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
  const newArr = people.filter((person, idx, arr) =>
    withChildren === undefined
      ? person.sex === 'f'
      : arr.find(child => child.mother === person.name));
  const personsAges = newArr.map(person => person.died - person.born);

  return personsAges.reduce((acu, cur) => acu + cur) / personsAges.length;
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
  const arrayOfMothers = people.filter((person, idx, arr) =>
    onlyWithSon !== true
      ? arr.find(child => child.mother === person.name)
      : arr.find(child => (child.mother === person.name) && child.sex === 'm'));

  const arrayAgeDiff = [];

  for (const mother of arrayOfMothers) {
    for (const child of people) {
      if ((onlyWithSon === true)
          && (mother.name === child.mother)
          && (child.sex === 'm')) {
        arrayAgeDiff.push(child.born - mother.born);
      } else if (onlyWithSon !== true
                && (mother.name === child.mother)) {
        arrayAgeDiff.push(child.born - mother.born);
      }
    }
  }

  const sumOfAverageAge = arrayAgeDiff.reduce((acu, cur) => acu + cur);

  return sumOfAverageAge / arrayAgeDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
