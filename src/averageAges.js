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
  const men = people.filter(item => item.sex === 'm');
  const menCentury = people.filter(item => item.sex === 'm'
    && Math.ceil(item.died / 100) === century);

  return century === undefined
    ? +(men.map(item => item.died - item.born)
      .reduce((accum, item) => accum + item) / men.length).toFixed(2)
    : +(menCentury.map(item => item.died - item.born)
      .reduce((accum, item) => accum + item) / menCentury.length).toFixed(2);
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
  const women = people.filter(item => item.sex === 'f');
  const WithChildren = people.filter(person =>
    people.some(child => person.name === child.mother));

  return withChildren === undefined
    ? +(women.map(item => item.died - item.born)
      .reduce((accum, item) => accum + item) / women.length).toFixed(2)
    : +(WithChildren.map(item => item.died - item.born)
      .reduce((accum, item) => accum + item) / WithChildren.length).toFixed(2);
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
  const women = [];
  const withSon = [];

  people.filter(child =>
    people.filter(woman => {
      if (child.mother === woman.name) {
        women.push(child.born - woman.born);
      }
    })
  );

  people.filter(child =>
    people.filter(woman => {
      if (child.mother === woman.name && child.sex === 'm') {
        withSon.push(child.born - woman.born);
      }
    })
  );

  return onlyWithSon === undefined
    ? +(women.reduce((accum, item) => accum + item) / women.length)
      .toFixed(2)
    : +(withSon.reduce((accum, item) => accum + item) / withSon.length)
      .toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
