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
  const men = people.filter(person => person.sex === 'm');

  const menCentury = men.filter(man =>
    Math.ceil(man.died / 100) === century);

  const MenAverageAge = men.reduce((sum, x) =>
    sum + (x.died - x.born), 0) / men.length;

  const MenAverageAgeCentury = menCentury.reduce((sum, x) =>
    sum + (x.died - x.born), 0) / menCentury.length;

  return century ? MenAverageAgeCentury : MenAverageAge;
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
  const women = people.filter(person => person.sex === 'f');

  const mothersNames = people.map(x => x.mother);

  const mothers = women.filter(x => mothersNames.includes(x.name));

  const womenAverageAge = women.reduce((sum, x) =>
    sum + (x.died - x.born), 0) / women.length;

  const mothersAverageAge = mothers.reduce((sum, x) =>
    sum + (x.died - x.born), 0) / mothers.length;

  return withChildren ? mothersAverageAge : womenAverageAge;
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
  const women = people.filter(person => person.sex === 'f');

  const mothersNames = people.map(x => x.mother);

  const mothers = women.filter(x => mothersNames.includes(x.name));

  const children = people.filter(kid =>
    mothers.find(mother => mother.name === kid.mother));

  const ageDiff = children.map(kid =>
    kid.born - mothers.find(mother =>
      mother.name === kid.mother).born);

  const averageAgeDiff = ageDiff.reduce((sum, diff) =>
    sum + diff) / ageDiff.length;

  const sons = children.filter(kid => kid.sex === 'm');

  const ageDiffSons = sons.map(son =>
    son.born - mothers.find(mother =>
      mother.name === son.mother).born);

  const averageAgeDiffSons = ageDiffSons.reduce((sum, diff) =>
    sum + diff) / ageDiffSons.length;

  return onlyWithSon ? averageAgeDiffSons : averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
