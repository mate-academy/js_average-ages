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
  const filteredMan = people.filter(person =>
    person.sex === 'm' && (typeof century === 'undefined'
        || Math.ceil(person.died / 100) === century)
  );

  const sumOfAge = filteredMan.reduce((sumAge, person) => {
    return sumAge + (person.died - person.born);
  }, 0);

  return sumOfAge / filteredMan.length;
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
  const filteredWomen = people.filter(person => withChildren
    ? people.find(child => child.mother === person.name)
    : person.sex === 'f');

  const sumOfAge = filteredWomen.reduce((sumAge, person) => {
    return sumAge + (person.died - person.born);
  }, 0);

  return sumOfAge / filteredWomen.length;
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
  const peopleFilter = people.filter(person => onlyWithSon
    ? person.sex === 'm' && people.find(mother => mother.name === person.mother)
    : people.find(mother => mother.name === person.mother)
  );

  const sumOfAge = peopleFilter.reduce((sum, person) => {
    const mother = people.find(Currentmother =>
      person.mother === Currentmother.name
    );

    return sum + (person.born - mother.born);
  }, 0);

  return sumOfAge / peopleFilter.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
