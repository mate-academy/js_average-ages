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
  const men = century
    ? people.filter(item => item.sex === 'm'
      && Math.ceil(item.died / 100) === century)
    : people.filter(item => item.sex === 'm');

  return men.reduce((acc, rec) => {
    return acc + (rec.died - rec.born);
  }, 0) / men.length;
};

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
  const women = withChildren
    ? people.filter((item, i, arr) => {
      return item.sex === 'f' && arr.find(el => el.mother === item.name);
    })
    : people.filter(item => item.sex === 'f');

  return women.reduce((acc, rec) => {
    return acc + (rec.died - rec.born);
  }, 0) / women.length;
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
  const childs = onlyWithSon
    ? people.filter((item, i, arr) => {
      return item.sex === 'm' && arr.some(el => el.name === item.mother);
    })
    : people.filter((item, i, arr) => arr.some(el => el.name === item.mother));

  return childs.reduce((acc, rec) => {
    const mother = people.find(el => el.name === rec.mother);

    return acc + (rec.born - mother.born);
  }, 0) / childs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
