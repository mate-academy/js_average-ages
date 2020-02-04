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
  const ageArr = people
    .filter(human => {
      return century
        ? human.sex === 'm'
          && (Number(String(human.died).slice(0, 2)) + 1) === century
        : human.sex === 'm';
    })
    .map(person => person.died - person.born);

  const averageAge = [...ageArr].reduce((a, b) => a + b) / ageArr.length;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womenWithChildrenAge = people
    .filter(person => person.sex === 'f')
    .filter(woman => withChildren
      ? people.some(person => person.mother === woman.name)
      : true)
    .map(woman => woman.died - woman.born);

  const averageAge = womenWithChildrenAge.reduce(
    (a, b) => a + b)
    / womenWithChildrenAge.length;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
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
  const dif = [];

  people
    .filter(person => person.sex === 'f')
    .forEach(mom => {
      for (const child of people) {
        if ((mom.name === child.mother)
          && (onlyWithSon ? child.sex === 'm' : true)) {
          dif.push(child.born - mom.born);
        }
      }
    });

  const res = dif.reduce((a, b) => a + b) / dif.length;

  return res;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
