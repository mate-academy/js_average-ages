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
  function filteredMen(man) {
    const manDiedCentury = Math.ceil(man.died / 100);
    const maleGender = man.sex === 'm';

    return century ? manDiedCentury === century && maleGender : maleGender;
  }

  const men = people.filter(filteredMen);

  const averageAge = men.reduce((acc, man) =>
    acc + (man.died - man.born), 0
  ) / men.length;

  return averageAge;
}
/**
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
  function filteredWomen(woman) {
    const searchingChild = people.find(child => child.mother === woman.name);
    const femaleGender = woman.sex === 'f';

    return withChildren ? searchingChild && femaleGender : femaleGender;
  }

  const women = people.filter(filteredWomen);

  const averageAge = women.reduce((acc, woman) =>
    acc + (woman.died - woman.born), 0
  ) / women.length;

  return averageAge;
}
/**
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  function hasMother(child) {
    const motherInPeopleJs = Boolean(
      people.find(mother => child.mother === mother.name)
    );

    return onlyWithSon ? child.sex === 'm' && motherInPeopleJs
      : motherInPeopleJs;
  }

  const childrenWithMother = people.filter(hasMother);

  function agesDifference(child) {
    const motherWasBornIn = people.find(
      mother => child.mother === mother.name
    ).born;

    return child.born - motherWasBornIn;
  }

  const averageDifference = childrenWithMother.map(agesDifference)
    .reduce((acc, difference) => acc + difference, 0)
    / childrenWithMother.length;

  return averageDifference;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
