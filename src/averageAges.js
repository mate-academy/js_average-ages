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
  const callBack = century
    ? person => person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person => person.sex === 'm';

  const men = people.filter(callBack);

  const ages = men.map(man => man.died - man.born);

  return findAverageAge(ages);
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
  const mothers = withChildren
    ? people
      .filter(person => person.mother)
      .map(person => person.mother)
    : null;

  const callBack = withChildren
    ? person => person.sex === 'f' && mothers.includes(person.name)
    : person => person.sex === 'f';

  const women = people.filter(callBack);

  const ages = women.map(woman => woman.died - woman.born);

  return findAverageAge(ages);
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
  const peopleCopy = onlyWithSon
    ? people.filter(person => person.sex === 'm')
    : [...people];

  const ageDifferenceArr = peopleCopy
    .map(person => {
      const mother = people.find(per => per.name === person.mother);

      const difference = mother
        ? person.born - mother.born
        : false;

      return difference;
    })
    .filter(age => age);

  return findAverageAge(ageDifferenceArr);
}

function findAverageAge(ages) {
  const length = ages.length;
  const agesSum = ages.reduce((pv, age) => pv + age, 0);

  const averageAge = agesSum / length;

  return Math.round(averageAge * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
