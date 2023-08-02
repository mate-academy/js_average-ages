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
  const filteredByMen = people.filter((person) => person.sex === 'm');

  const filteredByCentury = century
    ? filteredByMen.filter((person) => Math.ceil(person.died / 100) === century)
    : filteredByMen;

  const menAges = filteredByCentury.map((person) => person.died - person.born);

  const totalMenAges = menAges.reduce((sum, age) => sum + age, 0);

  return totalMenAges / menAges.length;
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
  const filteredByWomen = people.filter((person) => person.sex === 'f');

  const filteredByChildren = withChildren
    ? filteredByWomen.filter((person) =>
      people.some((p) => p.mother === person.name)
    )
    : filteredByWomen;

  const womenAges = filteredByChildren.map(
    (person) => person.died - person.born
  );
  const totalAgesOfWomen = womenAges.reduce((sum, age) => sum + age, 0);

  return totalAgesOfWomen / womenAges.length;
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
  const childrenWithMothers = people.filter((person) => {
    const hasMother = people.some((p) => p.name === person.mother);

    return onlyWithSon ? hasMother && person.sex === 'm' : hasMother;
  });

  const ageDiff = childrenWithMothers.map((child) => {
    const mother = people.find((p) => p.name === child.mother);

    return child.born - mother.born;
  });

  const totalageDiff = ageDiff.reduce((sum, diff) => sum + diff, 0);

  return totalageDiff / ageDiff.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
