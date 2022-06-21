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
  let menFiltered = people.filter(person => person.sex === 'm');

  if (century) {
    menFiltered
      = menFiltered.filter(men => century === Math.ceil(men.died / 100));
  }

  const menSumOfAge = menFiltered.reduce(
    (sum, item) => (sum + item.died - item.born),
    0,
  );

  const menAverageAge = menSumOfAge / menFiltered.length;

  return Math.round(menAverageAge * 100) / 100;
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
  let womenFiltered = people.filter(person => person.sex === 'f');

  if (withChildren) {
    womenFiltered
      = womenFiltered.filter(women => people.some(
        p => women.name === p.mother
      ));
  }

  const womenSumOfAge = womenFiltered.reduce(
    (sum, item) => sum + item.died - item.born,
    0,
  );
  const womenAverageAge = womenSumOfAge / womenFiltered.length;

  return Math.round(womenAverageAge * 100) / 100;
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
  const womenWithChild = people.filter(person => {
    let hasMetConditions = false;

    hasMetConditions = onlyWithSon
      ? person.sex === 'f' && people.some(
        p => person.name === p.mother && p.sex === 'm'
      )

      : person.sex === 'f' && people.some(
        p => person.name === p.mother
      );

    return hasMetConditions;
  });

  let childrenCount = 0;

  const womenSumOfAge = womenWithChild.reduce(function(previousValue, mother) {
    let children = [];

    children = onlyWithSon
      ? people.filter(p => p.mother === mother.name && p.sex === 'm')
      : people.filter(p => p.mother === mother.name);

    const sumMotherAge = children.reduce((prev, child) => {
      childrenCount++;

      return prev + child.born - mother.born;
    }, 0);

    return previousValue + sumMotherAge;
  }, 0);

  const womenAverageAge = womenSumOfAge / childrenCount;

  return Math.round(womenAverageAge * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
