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
  let newArr = [...people];

  (century) && (newArr = newArr.filter(el =>
    Math.ceil(el.died / 100) === century));

  const onlyMen = newArr.filter(el =>
    el.sex === 'm').map(el =>
    el.died - el.born);
  const averageYearsMen = onlyMen.reduce((total, amount) => {
    return total + amount;
  }, 0) / onlyMen.length;

  return averageYearsMen;
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
  // write code here
  let secondArr = [...people];
  const arrMom = secondArr.map(el => el.mother); // created array of all mothers

  (withChildren) && (secondArr = secondArr.filter(el =>
    arrMom.includes(el.name)));

  const onlyWomen = secondArr.filter(el =>
    el.sex === 'f').map(el => el.died - el.born);
  const averageYearsWomen = onlyWomen.reduce((total, amount) => {
    return total + amount;
  }, 0) / onlyWomen.length;

  return averageYearsWomen;
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
  const childArr = people.filter(el => {
    return onlyWithSon
      ? el.sex === 'm' && people.some(woman => woman.name === el.mother)
      : people.some(woman => woman.name === el.mother);
  });
  const ageDiff = childArr.map(children => {
    const mother = people.find(women => children.mother === women.name);

    return children.born - mother.born;
  });
  const averageAge = ageDiff.reduce((a, b) => a + b) / ageDiff.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
