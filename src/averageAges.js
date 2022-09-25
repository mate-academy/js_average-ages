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
  let men = people.filter(person => person.sex === 'm');

  men = !century ? men
    : men.filter(man => Math.ceil(man.died / 100) === century);

  const calculateMenAge = men.map(man => man.died - man.born);
  const menNumber = calculateMenAge.length;
  const calculateAverageAge = calculateMenAge.reduce((sum, x) => sum + x);

  return calculateAverageAge / menNumber;
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
  let women = people.filter(person => person.sex === 'f');
  let mother;

  women = !withChildren ? women
    : women.filter(woman => {
      mother = people.some(person => person.mother === woman.name);

      return mother;
    });

  const calculateWomenAge = women.map(woman => woman.died - woman.born);
  const womenNumber = calculateWomenAge.length;
  const calculateAverageAge = calculateWomenAge.reduce((sum, x) => sum + x);

  return calculateAverageAge / womenNumber;
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
  let childWithMother;
  let childsMother;

  let person = people.filter(child => {
    childWithMother = people.some(mom => child.mother === mom.name);

    return childWithMother;
  });

  person = !onlyWithSon ? person
    : person.filter(son => son.sex === 'm');

  const calculateAgeDifference = person.map(child => {
    childsMother = people.find(mother => mother.name === child.mother);

    return child.born - childsMother.born;
  });
  const calcAverDifference = calculateAgeDifference.reduce((sum, x) => sum + x);
  const childrenNumber = calculateAgeDifference.length;

  return calcAverDifference / childrenNumber;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
