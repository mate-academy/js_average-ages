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

const calcAverageAge = (sumOfAges, { born, died }) => sumOfAges + died - born;

function calculateMenAverageAge(people, century = 0) {
  const onlyMans = people.filter(person =>
    century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm'
  );

  return onlyMans.reduce(calcAverageAge, 0)
    / onlyMans.length;
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
  const womans = people.filter(person =>
    withChildren
      ? people.find(child => child.mother === person.name)
      : person.sex === 'f'
  );

  return womans.reduce(calcAverageAge, 0) / womans.length;
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
  const mothersWithChild = people.filter(({ mother, sex }) =>
    hasMother(mother, people, sex, onlyWithSon)
  );

  const ageDiff = mothersWithChild.map(({ born, mother }) =>
    born - parentBorn(people, mother));

  const average = ageDiff.reduce((sum, age) => sum + age);

  return average / ageDiff.length;
}

function hasMother(mother, people, sex, onlyWithSon) {
  return onlyWithSon
    ? people.some(({ name }) => name === mother)
    && sex === 'm'
    : people.some(({ name }) => name === mother);
}

function parentBorn(people, parentName) {
  return people.find(({ name }) => name === parentName).born;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
