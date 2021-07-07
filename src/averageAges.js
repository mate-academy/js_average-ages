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
  const filteredMen = people.filter(person => {
    const deathCentury = Math.ceil(person.died / 100);
    const isMan = person.sex === 'm';

    return century ? isMan && century === deathCentury : isMan;
  });

  return filteredMen.reduce((age, person) => {
    return age + (person.died - person.born);
  }, 0) / filteredMen.length;
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
  const filteredWomen = people.filter(person => {
    const isMother = people.some(child => child.mother === person.name);
    const isFemale = person.sex === 'f';

    return withChildren ? isMother && isFemale : isFemale;
  });

  return filteredWomen.reduce((age, person) => {
    return age + (person.died - person.born);
  }, 0) / filteredWomen.length;
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
  const children = people.filter(person => {
    const child = people
      .find(potentialChild => potentialChild.name === person.mother);

    return onlyWithSon ? child && person.sex === 'm' : child;
  });

  return children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  }).reduce((age, nextAge) => age + nextAge) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
