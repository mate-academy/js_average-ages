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
    .filter(man => man.sex === 'm')
    .filter(man => century ? Math.ceil(man.died / 100) === century : true);

  const ageMan = filterMan.filter(man => man.sex === 'm')
    .map((age) => differenceAge(age));

  return calculatePeoplesAge(ageMan);
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
    ? findMomByName(people, wom) : wom.sex === 'f');

  const ageWom = filterWom.map((age) => differenceAge(age));

  return calculatePeoplesAge(ageWom);
}

function findMomByName(people, wom) {
  return people.some(nameMother => wom.name === nameMother.mother);
}

function differenceAge(age) {
  return age.died - age.born;
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
  const filterWom = people.filter(wom => findMomByName(people, wom));

  const kids = people.filter(kid =>
    onlyWithSon
      ? kid.sex === 'm'
         && filterKidsByMom(people, kid) : filterKidsByMom(people, kid));

  const ageDifference = kids.reduce((sum, kid) => {
    const mother = filterWom.find(mom => mom.name === kid.mother);
    const difference = kid.born - mother.born;

    return sum + difference;
  }, 0);

  return ageDifference / kids.length;
}

function filterKidsByMom(people, kid) {
  return people.some(mother => mother.name === kid.mother);
}

function calculatePeoplesAge(ageMan) {
  return ageMan.reduce((sum, age) => (sum + age), 0) / ageMan.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
