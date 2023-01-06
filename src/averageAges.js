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
  const menFilter = people.filter(person => person.sex === 'm');
  let men;

  century === undefined
    ? men = menFilter
    : men = menFilter.filter(person =>
      Math.ceil(person.died / 100) === century);

  const ages = men.map(person => person.died - person.born);
  const sum = ages.reduce((a, b) => a + b, 0);

  return +(sum / men.length).toFixed(2);
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
  const womenFiltered = people.filter(person => person.sex === 'f');
  let women;

  withChildren === undefined
    ? women = womenFiltered
    : women = womenFiltered.filter(woman => people.some(person =>
      woman.name === person.mother));

  const ages = women.map(person => person.died - person.born);
  const sum = ages.reduce((a, b) => a + b, 0);

  return +(sum / women.length).toFixed(2);
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
  const kids = people.filter(kid => {
    const mothers = people.some(person => kid.mother === person.name);
    const isSon = kid.sex === 'm';

    return onlyWithSon ? isSon && mothers : mothers;
  });

  const averageAgeDiff = kids.reduce((diffAgeSum, kid) => {
    const mother = people.find(mom => mom.name === kid.mother);
    const ageDiff = kid.born - mother.born;

    return diffAgeSum + ageDiff;
  }, 0) / kids.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
