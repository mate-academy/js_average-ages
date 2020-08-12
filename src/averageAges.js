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
  let men = people.filter(person => person.sex === 'm'); // sex discrimination

  if (century) { // century of death discrimination
    men = men.filter(man => Math.ceil(man.died / 100) === century);
  }

  const avarageAge = men.reduce(
    (sum, currentMan) => sum + currentMan.died - currentMan.born, 0
  ) / men.length; // ages sum / count of persons

  return avarageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women = people.filter(person => person.sex === 'f'); // sex discrimination

  if (withChildren) {
    women = women // has children discrimination
      .filter(currentPerson => people
        .some(children => children.mother === currentPerson.name));
  }

  const avarageAge = women.reduce(
    (sum, currentMan) => sum + currentMan.died - currentMan.born, 0
  ) / women.length; // ages sum / count of persons

  return avarageAge;
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
  const birthAges = [];

  if (onlyWithSon) { // only son borning ages
    for (const child of people) {
      const currentChildMotherName = child.mother;

      for (const mother of people) {
        if (mother.name === currentChildMotherName && child.sex === 'm') {
          birthAges.push(child.born - mother.born);
        }
      }
    }
  } else { // every child borning ages
    for (const child of people) {
      const currentChildMotherName = child.mother;

      for (const mother of people) {
        if (mother.name === currentChildMotherName) {
          birthAges.push(child.born - mother.born);
        }
      }
    }
  }

  // get avarage
  return birthAges.reduce((sum, currentBirthAge) => sum + currentBirthAge)
  / birthAges.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
