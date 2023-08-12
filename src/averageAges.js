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
  const mens = people.filter((men) => men.sex === 'm'
    && (!century || Math.ceil(men.died / 100) === century));

  return getAverageAge(mens);
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
  const women = people.filter((woman) => woman.sex === 'f'
    && (withChildren === undefined
    || people.find((motherName) => motherName.mother === woman.name)));

  return getAverageAge(women);
}

function getAverageAge(genderList) {
  return Math.round(genderList.reduce((sum, currentPerson) => sum
    + currentPerson.died - currentPerson.born, 0)
    / genderList.length * 100) / 100;
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
  const children = people.map((person) => (
    {
      ...person,
      motherInfo: people
        .find((motherName) => motherName.name === person.mother),
    }))
    .filter(person => person.motherInfo && (onlyWithSon === undefined
  || person.sex === 'm'));

  return Math.round(children.reduce((sum, person) => sum
  + (person.born - person.motherInfo.born), 0)
    / children.length * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
