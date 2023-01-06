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
  const onlyMan = person => person.sex === 'm';
  let allMan = people.filter(onlyMan);

  if (century) {
    const bornInCentury = person => Math.ceil(person.died / 100) === century;

    allMan = allMan.filter(bornInCentury);
  }

  const manAges = allMan.map((person) => person.died - person.born);
  const manAgesSum = manAges.reduce((prev, curr) => prev + curr);
  const averageManAge = manAgesSum / manAges.length;

  return averageManAge;
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
  const onlyWomen = person => person.sex === 'f';
  let allWomen = people.filter(onlyWomen);

  if (withChildren) {
    const childrenFilter = woman => people.some(
      person => person.mother === woman.name);

    allWomen = allWomen.filter(childrenFilter);
  }

  const womenAges = allWomen.map((person) => person.died - person.born);
  const womenAgesSum = womenAges.reduce((prev, curr) => prev + curr);
  const averageWomenAge = womenAgesSum / womenAges.length;

  return averageWomenAge;
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
  const children = onlyWithSon
    ? people.filter(child =>
      people.some(mother =>
        child.mother === mother.name
        && child.sex === 'm'
      ))
    : people.filter(child =>
      people.some(mother => child.mother === mother.name
      ));

  const mothers = people.filter(mother =>
    children.find(child => child.mother === mother.name
    ));

  const ageDifferenses = children.map(child => {
    const childMother = mothers.find(mother => child.mother === mother.name);

    return child.born - childMother.born;
  });
  const ageDifferensesSum = ageDifferenses.reduce((prev, curr) => prev + curr);
  const averageAgeDifferense = ageDifferensesSum / ageDifferenses.length;

  return averageAgeDifferense;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
