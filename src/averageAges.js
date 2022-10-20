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
  const peopleMan = people.filter(persone => persone.sex === 'm');
  const peopleManWithCenturyDeathAndAge = peopleMan.map(persone => ({
    centuryDeath: Math.ceil(persone.died / 100),
    age: persone.died - persone.born,
  }));
  const filterCentury
  = century ? peopleManWithCenturyDeathAndAge.filter(
    persone => persone.centuryDeath === century)
    : peopleManWithCenturyDeathAndAge;

  return (filterCentury.reduce((
    a, { age }) => a + age, 0)) / filterCentury.length;
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
  const peopleWomenIsMotherAge = people.map(persone => ({
    ...persone,
    isMother: people.some(one => one.mother === persone.name),
    age: persone.died - persone.born,
  })).filter(persone => persone.sex === 'f');

  const peopleMother
  = peopleWomenIsMotherAge.filter(persone => persone.isMother);

  return !withChildren ? (peopleWomenIsMotherAge.reduce((
    a, { age }) => a + age, 0)) / peopleWomenIsMotherAge.length
    : (peopleMother.reduce((
      a, { age }) => a + age, 0)) / peopleMother.length;
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
  const peopleMotherDiff = people.map(persone => ({
    ...persone,
    isMother: people.some(one => one.mother === persone.name),
    children: people.filter(one => one.mother === persone.name),
  })).filter(persone => persone.isMother).map(persone => ({
    ...persone,
    diffAge: persone.children.map(child => child.born - persone.born),
  }));

  const peopleMotherOfSon = peopleMotherDiff.map(persone => ({
    ...persone,
    isMotherOfSon: persone.children.some(child => child.sex === 'm'),
    children: persone.children.filter(item => item.sex === 'm'),
  })).filter(persone => persone.isMotherOfSon).map(persone => ({
    diffAge: persone.children.map(child => child.born - persone.born),
  }));

  const differenceAge = !onlyWithSon
    ? (peopleMotherDiff.map(persone => persone.diffAge)).flat()
    : (peopleMotherOfSon.map(persone => persone.diffAge)).flat();

  return differenceAge.reduce((
    sum, item) => sum + item, 0) / differenceAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
