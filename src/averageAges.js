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

  const arrMen = century ? people.filter(el => el.sex === 'm'
    && century === Math.ceil(el.died / 100))
    : people.filter(el => el.sex === 'm');

  const ages = arrMen.map(el => el.died - el.born);

  return ages.reduce((sum, x) => sum + x, 0) / ages.length;
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
  const arrWomen = withChildren ? people.filter(el => el.sex === 'f'
    && withChildren === people.some(human => human.mother === el.name))
    : people.filter(el => el.sex === 'f');

  const ages = arrWomen.map(el => el.died - el.born);

  return ages.reduce((sum, x) => sum + x, 0) / ages.length;
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
  const children = [];
  const mother = [];
  const arrDifference = [];

  for (const person of people) {
    for (const human of people) {
      if (person.mother === human.name) {
        children.push(person);
        mother.push(human);
      }
    }
  }

  for (const child of children) {
    for (const mam of mother) {
      if (child.mother === mam.name) {
        if (onlyWithSon) {
          if (child.sex === 'm') {
            arrDifference.push(child.born - mam.born);
            break;
          }
        } else {
          arrDifference.push(child.born - mam.born);
          break;
        }
      }
    }
  }

  return arrDifference.reduce((sum, x) => sum + x, 0)
    / arrDifference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
