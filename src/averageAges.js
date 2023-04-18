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
  const filterMan = people
    .filter(man => man.sex === 'm' && century
      ? Math.ceil(man.died / 100) === century : true && man.sex === 'm');

  const personMan = filterMan.map((person) => differenceAge(person));

  return calculateAverageAge(personMan);
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
  const filterWom = people.filter(wom => withChildren
    ? isMother(people, wom) : wom.sex === 'f');

  const personWom = filterWom.map((person) => differenceAge(person));

  return calculateAverageAge(personWom);
}

function isMother(people, wom) {
  return people.some(nameMother => wom.name === nameMother.mother);
}

function differenceAge(person) {
  return person.died - person.born;
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
  const filterWom = people.filter(wom => isMother(people, wom));

  const kids = people.filter(kid =>
    onlyWithSon
      ? kid.sex === 'm'
         && hasMotherInPeople(people, kid) : hasMotherInPeople(people, kid));

  const ageDifference = kids.reduce((sum, kid) => {
    const mother = filterWom.find(mom => mom.name === kid.mother);
    const difference = kid.born - mother.born;

    return sum + difference;
  }, 0);

  return ageDifference / kids.length;
}

function hasMotherInPeople(people, kid) {
  return people.some(mother => mother.name === kid.mother);
}

function calculateAverageAge(personMan) {
  return personMan.reduce((sum, age) => (sum + age), 0) / personMan.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
