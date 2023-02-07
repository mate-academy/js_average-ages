'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 * learn how to use array methods like .filter .map .some .every .find .reduce
 * avoid using loop and forEach
 * replace `if ()` statement with &&, || or ?:
 * without nesting
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menList = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const menAges = menList.map(person => {
    const { died, born } = person;

    return died - born;
  });

  return calculateAverage(menAges);
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
  const womenList = people.filter(person => withChildren
    ? people.some(child => person.name === child.mother)
    : person.sex === 'f');

  const womenAges = womenList.map(person => {
    const { died, born } = person;

    return died - born;
  });

  return calculateAverage(womenAges);
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
  const children = people.filter(child => onlyWithSon
    ? people.some(mother => mother.name === child.mother) && child.sex === 'm'
    : people.some(mother => mother.name === child.mother));

  const diffs = children.map(child => {
    const motherBorn = people.find(mother =>
      mother.name === child.mother);

    return child.born - motherBorn.born;
  });

  return calculateAverage(diffs);
}

function calculateAverage(listOfData) {
  return listOfData.reduce((sum, currentDiff) =>
    (sum + currentDiff)) / listOfData.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
