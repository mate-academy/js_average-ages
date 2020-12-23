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
  function menFilter(person) {
    const deathCentury = Math.ceil(person.died / 100);

    return century
      ? person.sex === 'm' && deathCentury === century
      : person.sex === 'm';
  }

  const men = people.filter(menFilter);

  function agesAccumulator(acc, person) {
    return acc + (person.died - person.born);
  }

  return (men.reduce(agesAccumulator, 0) / men.length);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  function womenFilter(person) {
    return person.sex === 'f';
  }

  function motherFilter(person) {
    function isMother(child) {
      return person.name === child.mother;
    }

    return withChildren ? people.find(isMother) : true;
  }

  const women = people.filter(withChildren ? motherFilter : womenFilter);

  function agesAccumulator(acc, person) {
    return acc + (person.died - person.born);
  }

  return (women.reduce(agesAccumulator, 0) / women.length);
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
  function hasMother(person) {
    const motherInList = !!(people.find(possibleMother =>
      possibleMother.name === person.mother));

    return onlyWithSon
      ? motherInList && person.sex === 'm' : motherInList;
  }

  const children = people.filter(hasMother);

  function ageDifferencecAcc(acc, child) {
    const mother = people.find(possibleMother =>
      possibleMother.name === child.mother);

    return acc + child.born - mother.born;
  }

  return +(children.reduce(ageDifferencecAcc, 0) / children.length).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
