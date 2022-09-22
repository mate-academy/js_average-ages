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
  const allMens = people.filter(person => person.sex === 'm');
  const requiredMens = century
    ? allMens.filter(men => Math.ceil(men.died / 100) === century)
    : allMens;

  const menAges = requiredMens.map(men => men.died - men.born);

  const menAgesSum = menAges.reduce((pv, cv) => pv + cv, 0);

  return +(menAgesSum / menAges.length).toFixed(2);
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
  const allWomens = people.filter(women => women.sex === 'f');
  const requiredWomens = withChildren
    ? allWomens.filter(women =>
      people.filter(person => person.mother === women.name)
    )
    : allWomens;

  const womensAges = requiredWomens.map(women => women.died - women.born);

  const womensAgesSum = womensAges.reduce((pv, cv) => pv + cv, 0);

  return +(womensAgesSum / womensAges.length).toFixed(2);
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
  const onlyMothers = people.filter(person =>
    person.sex === 'f' && people.some(child =>
      child.mother === person.name));
  const requiredMothers = onlyWithSon
    ? onlyMothers.filter(mother => people.some(child =>
      child.sex === 'm' && child.mother === mother.name)
    )
    : onlyMothers;

  const motherAges = requiredMothers.map(mother => {
    const childOfMother = people.filter(child => child.mother === mother.name);
    const motherAgeAtChildBirth = childOfMother[0].born - mother.born;

    return motherAgeAtChildBirth;
  });

  const sumOfAllAges = motherAges.reduce((pv, cv) => pv + cv, 0);

  return +(sumOfAllAges / motherAges.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
