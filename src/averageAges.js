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
  const men = people.filter(person => person.sex === 'm');
  let averageManAge;

  function getMenDiedInGivenCentury(mans) {
    return mans.filter(person => (
      Math.ceil(person.died / 100) === century
    ));
  }

  century
    ? averageManAge = getMenDiedInGivenCentury(men)
      .reduce((acc, person) => {
        return acc + (person.died - person.born);
      }, 0) / getMenDiedInGivenCentury(men).length

    : averageManAge = men.reduce((acc, person) => {
      return acc + (person.died - person.born);
    }, 0) / men.length;

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
  const women = people.filter(person => person.sex === 'f');
  let averageWomanAge;

  function getWomanWithChild(womans) {
    return womans.filter(person => (
      people.some(child => child.mother === person.name)
    ));
  }

  withChildren
    ? averageWomanAge = getWomanWithChild(women)
      .reduce((acc, person) => {
        return acc + (person.died - person.born);
      }, 0) / getWomanWithChild(women).length

    : averageWomanAge = women
      .reduce((acc, person) => {
        return acc + (person.died - person.born);
      }, 0) / women.length;

  return averageWomanAge;
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
  let averageAgeDiff;
  const women = people.filter(person => person.sex === 'f');
  const children = people.filter(child => (
    women.some(mother => mother.name === child.mother)
  ));

  function getSons(childs) {
    return people.filter(child => (
      women.some(mother => mother.name === child.mother) && child.sex === 'm'
    ));
  }

  onlyWithSon
    ? averageAgeDiff = getSons(children)
      .map(child => {
        const mother = women.filter(person => person.name === child.mother);

        return child.born - mother[0].born;
      })
      .reduce((acc, diff) =>
        (acc + diff), 0) / getSons(children).length

    : averageAgeDiff = children
      .map(child => {
        const mother = women.filter(person => person.name === child.mother);

        return child.born - mother[0].born;
      })
      .reduce((acc, diff) =>
        (acc + diff), 0) / children.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
