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

function reduceToSum(parameter) {
  return parameter.reduce((sum, num) => sum + (num.died - num.born), 0);
};

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const arrayWithMen = people.filter(el => el.sex === 'm');
  const diedThisCentury = century
    ? arrayWithMen.filter(el => Math.ceil(el.died / 100) === century)
    : arrayWithMen;
  const sumOfAges = reduceToSum(diedThisCentury);

  return sumOfAges / diedThisCentury.length;
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
  const arrayWithWoman = people.filter(el => el.sex === 'f');
  const womanWithKids = arrayWithWoman.filter(woman => {
    return people.some(child => woman.name === child.mother);
  });

  const sumOfAges = withChildren
    ? reduceToSum(womanWithKids)
    : reduceToSum(arrayWithWoman);

  return withChildren
    ? sumOfAges / womanWithKids.length
    : sumOfAges / arrayWithWoman.length;
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
  let counter = 0;
  const mapAndFilter = array => {
    return array.map(person => {
      const currentMother = array.filter(mother =>
        onlyWithSon
          ? person.mother === mother.name && person.sex === 'm'
          : person.mother === mother.name);

      if (currentMother.length > 0) {
        counter++;
      }

      return currentMother.length > 0 ? person.born - currentMother[0].born : 0;
    });
  };
  const ageDifference = mapAndFilter(people);
  const sumOfAges = ageDifference.reduce((sum, num) => sum + num, 0);

  return sumOfAges / counter;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
