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
  const men = people.filter(person => (
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  ));

  const lifeMenAges = men.map(onePerson => onePerson.died - onePerson.born);

  return averageAge(lifeMenAges, men.length);
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
  const women = people.filter(woman => (
    withChildren
      ? people.find(child => woman.name === child.mother)
      : woman.sex === 'f'
  ));

  const lifeWomenAges = women.map(onePerson => onePerson.died - onePerson.born);

  return averageAge(lifeWomenAges, women.length);
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
  const kids = people.filter(kid => (
    onlyWithSon
      ? people.find(mother => mother.name === kid.mother) && kid.sex === 'm'
      : people.find(mother => mother.name === kid.mother)
  ));

  const kidsAges = kids.map(kid => kid.born
    - people.find(mother => mother.name === kid.mother).born);

  return averageAge(kidsAges, kids.length);
}

const averageAge = (arrayAges, allNamesCount) => (
  arrayAges.reduce((sum, age) => sum + age, 0) / allNamesCount
);

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
