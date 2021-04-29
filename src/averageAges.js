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
  const allMen = people.filter(({ sex }) => sex === 'm');
  const menByCentury = allMen.filter(({ died }) => {
    return Math.ceil(died / 100) === century;
  });

  const men = century ? menByCentury : allMen;

  const result = men.reduce((sum, person) => {
    return sum + (person.died - person.born) / men.length;
  }, 0);

  return +result.toFixed(2);
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
  const allWomen = people.filter(({ sex }) => sex === 'f');
  const womenWithKids = allWomen.filter(({ name }) => {
    return people.find(({ mother }) => mother === name);
  });

  const women = withChildren ? womenWithKids : allWomen;

  const result = women.reduce((a, b) => {
    return a + (b.died - b.born) / women.length;
  }, 0);

  return +result.toFixed(2);
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
  const allKids = people.filter(({ mother }) => {
    return people.find(({ name }) => name === mother);
  });

  const onlyBoys = allKids.filter(({ sex }) => sex === 'm');
  const children = onlyWithSon ? onlyBoys : allKids;

  const result = children.reduce((prev, { mother, born: childBorn }) => {
    const age = childBorn - people.find(({ name }) => name === mother).born;

    return prev + (age / children.length);
  }, 0);

  return +result.toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
