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

function sumAges(people) {
  return people.reduce((sum, person) => sum + (person.died - person.born), 0);
};

function filterBySex(people, sex) {
  return people.filter(person => person.sex === sex);
};

function calculateMenAverageAge(people, century) {
  let men = filterBySex(people, 'm');

  men = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  return +(sumAges(men) / men.length).toFixed(2);
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
  let women = filterBySex(people, 'f');

  women = withChildren
    ? women.filter(woman => people.some(person => woman.name === person.mother))
    : women;

  return +(sumAges(women) / women.length).toFixed(2);
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
    const hasMother = people.some(person => kid.mother === person.name);
    const isSon = kid.sex === 'm';

    return onlyWithSon ? isSon && hasMother : hasMother;
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
