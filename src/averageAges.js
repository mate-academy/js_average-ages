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
function calculateMenAverageAge(people, century = 0) {
  const onlyMans = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return onlyMans.reduce((sumOfAges, { born, died }) =>
    sumOfAges + died - born, 0)
    / onlyMans.length;
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
  const womans = people.filter(person =>
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return womans.reduce((sumOfAge, { died, born }) => {
    return sumOfAge + died - born;
  }, 0) / womans.length;
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
  const mothersWithChild = people.filter(({ mother, sex }) =>
    onlyWithSon
      ? hasMother(mother, people) && sex === 'm'
      : hasMother(mother, people)
  );

  const ageDiff = mothersWithChild.map(({ born, mother }) =>
    born - parentBorn(people, mother));

  const average = ageDiff.reduce((sum, age) => sum + age);

  return average / ageDiff.length;
}

function hasMother(mother, people) {
  return people.some(({ name }) => name === mother);
}

function parentBorn(people, parentName) {
  return people.find(({ name }) => name === parentName).born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
