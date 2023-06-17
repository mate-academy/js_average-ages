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
  const men = people
    .filter(person => person.sex === 'm' && (
      !century || Math.ceil(person.died / 100) === century));

  const totalAge = sumAge(men);

  return totalAge / men.length;
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
  const women = people
    .filter(woman => woman.sex === 'f' && (!withChildren || people
      .find(child => child.mother === woman.name)));

  const totalAge = sumAge(women);

  return totalAge / women.length;
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
  const children = people
    .filter(child => people
      .find(mother => mother.name === child.mother && (
        !onlyWithSon || child.sex === 'm')));

  const ageDifference = children.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const totalAge = ageDifference
    .reduce((prev, difference) => prev + difference, 0);

  return totalAge / ageDifference.length;
}

function sumAge(persons) {
  return persons
    .reduce((prev, person) => prev + (person.died - person.born), 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
