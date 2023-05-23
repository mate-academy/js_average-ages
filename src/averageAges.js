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
function calculateAverageAges(peopleArray) {
  const sumOfAges = peopleArray.reduce((acc, curVal) =>
    acc + (curVal.died - curVal.born), 0
  );

  return (sumOfAges / peopleArray.length) || 0;
};

function calculateAgeDifference(differences) {
  const sumOfAges = differences.reduce((acc, curVal) =>
    acc + curVal, 0
  );

  return (sumOfAges / differences.length) || 0;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person =>
    century
      ? Math.ceil(person.died / 100) === century
        && person.sex === 'm'
      : person.sex === 'm',
  );

  return calculateAverageAges(men);
};

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
  const woman = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name)
        && person.sex === 'f'
      : person.sex === 'f',
  );

  return calculateAverageAges(woman);
};

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
  const child = people.filter(person =>
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  );
  const ageDiff = child.map(children => {
    const childMother = people.find(mother => mother.name === children.mother);

    return children.born - childMother.born;
  });

  return calculateAgeDifference(ageDiff);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
