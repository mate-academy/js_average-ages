'use strict';

function calculateAverageAge(group) {
  return group
    .reduce(
      (prev, curr) => prev + (curr.died - curr.born), 0
    ) / group.length;
}

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
  const men = !century
    ? people.filter(he => he.sex === 'm')
    : people.filter(he => {
      return he.sex === 'm' && Math.ceil(he.died / 100) === century;
    });

  return calculateAverageAge(men);
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
  const women = people.filter(she => she.sex === 'f');
  const moms = women.filter(she => people.some((child) => {
    return child.mother === she.name;
  }));

  return withChildren
    ? calculateAverageAge(moms)
    : calculateAverageAge(women);
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
  const ageDiff = [];

  const moms = people.filter(mom => {
    return people.some(person => person.mother === mom.name);
  });

  const children = onlyWithSon
    ? people.filter(person => person.mother && person.sex === 'm')
    : people.filter(person => person.mother);

  for (const child of children) {
    const currentMom = moms.find(mom => mom.name === child.mother);

    if (currentMom) {
      ageDiff.push(child.born - currentMom.born);
    }
  }

  return ageDiff.reduce((prev, curr) => prev + curr, 0) / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
