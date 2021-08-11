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
  const men = century === undefined
    ? people.filter(el => el.sex === 'm')
    : people.filter(el =>
      el.sex === 'm' && Math.ceil(el.died / 100) === century
    );

  const menAverageAge = men.reduce((a, b) =>
    a + (b.died - b.born), 0) / men.length;

  return menAverageAge;
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
  // write code here
  const women = people.filter(el => el.sex === 'f');

  let womenAverageAge = women.reduce((a, b) =>
    a + (b.died - b.born), 0) / women.length;

  womenAverageAge = +womenAverageAge.toFixed(2);

  const womenWithChildren = women.filter((el, i, arr) =>
    people.some(element => el.name === element.mother)
  );

  let womenAgeWithChildren = womenWithChildren.reduce((a, b) =>
    a + (b.died - b.born), 0) / womenWithChildren.length;

  womenAgeWithChildren = +womenAgeWithChildren.toFixed(2);

  return withChildren === undefined ? womenAverageAge : womenAgeWithChildren;
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
  // write code here
  const women = people.filter(el => el.sex === 'f');

  const children = onlyWithSon === undefined
    ? people.filter(el =>
      women.some(element => el.mother === element.name)
    )
    : people.filter(el => women.some(element =>
      el.mother === element.name && el.sex === 'm')
    );

  const sumAgesDiff = children.map(el => {
    let count = 0;

    people.map(element => {
      el.mother === element.name
        ? count += el.born - element.born : count += 0;
    });

    return count;
  }).reduce((a, b) => a + b, 0);

  let averageAgeDiff = sumAgesDiff / children.length;

  averageAgeDiff = +averageAgeDiff.toFixed(2);

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
