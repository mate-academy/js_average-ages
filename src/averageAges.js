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
    .filter(person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm')
    .map(personYears => personYears.died - personYears.born);

  return avarageAge(men);
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
    .filter(person => withChildren
      ? person.sex === 'f' && people.some(child => person.name === child.mother)
      : person.sex === 'f')
    .map(person => person.died - person.born);

  return avarageAge(women);
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
  const withMother = people
    .filter(person => onlyWithSon
      ? persWithMother(person, people) && person.sex === 'm'
      : persWithMother(person, people))
    .map(child =>
      child.born - people.find(person => child.mother === person.name).born
    );

  return avarageAge(withMother);
}

function avarageAge(person) {
  return person.reduce((acc, num) => (acc + num)) / person.length;
}

function persWithMother(pers, peopleList) {
  return peopleList.some(child => child.name === pers.mother);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
