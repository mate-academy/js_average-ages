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
  let men = people.filter((x) => (x.sex === 'm'));

  if (century !== undefined) {
    men = men.filter((x) => (Math.ceil(x.died / 100) === century));
  }

  const ageSum = men.map((x) => x.died - x.born)
    .reduce((a, b) => a + b);

  return ageSum / men.length;
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
  let women = people.filter((x) => (x.sex === 'f'));

  if (withChildren !== undefined) {
    const mothers = people.map((x) => x.mother)
      .filter((x) => x !== null);

    women = women.filter((x) => mothers.includes(x.name));
  }

  const ageSum = women.map((x) => x.died - x.born)
    .reduce((a, b) => a + b);

  return ageSum / women.length;
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
  const ageDiffs = [];

  let children = people.filter((a) => typeof a.mother === 'string');

  if (onlyWithSon !== undefined) {
    children = children.filter((b) => b.sex === 'm');
  }

  for (let i = 0; i < children.length; i++) {
    for (let c = 0; c < people.length; c++) {
      if (children[i].mother === people[c].name) {
        ageDiffs.push(Math.abs(children[i].born - people[c].born));
      }
    }
  }

  const ageDiffSum = ageDiffs.reduce((a, b) => a + b);

  return ageDiffSum / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
