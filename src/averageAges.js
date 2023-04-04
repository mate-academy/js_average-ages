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
  const men = people.filter(x => x.sex === 'm');
  const menFilter = century && century > 0
    ? men.filter(x => (Math.ceil(x.died / 100) === +century))
    : men;
  const middleAge = menFilter.reduce((prev, x) => prev + (x.died - x.born), 0);

  return middleAge / menFilter.length;
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
  const women = people.filter(x => x.sex === 'f');
  const womenWithChild = women.filter(woman => {
    return people.some(child => child.mother === woman.name);
  });
  const getTotalAges = (prev, x) => prev + (x.died - x.born);

  const totalWomenAverageAge = withChildren
    ? womenWithChild.reduce(getTotalAges, 0) / womenWithChild.length
    : women.reduce(getTotalAges, 0) / women.length;

  return totalWomenAverageAge;
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
  const arrayAges = [];
  const children = people.filter(kid =>
    people.some(mother => mother.name === kid.mother));

  const childrenFilter = onlyWithSon
    ? children.filter(son => son.sex === 'm')
    : children;

  const findDiference = childrenFilter.map(kid =>
    people.some(mother => {
      if (mother.name === kid.mother) {
        arrayAges.push(kid.born - mother.born);
      }
    })
  );

  return arrayAges.reduce((prev, x) => prev + x, 0) / findDiference.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
