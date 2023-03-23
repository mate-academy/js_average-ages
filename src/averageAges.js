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
function calculateAverage(groupOfPeople) {
  return groupOfPeople
    .map(human => human.died - human.born)
    .reduce((sum, age) => sum + age) / groupOfPeople.length;
}

function calculateMenAverageAge(people, century) {
  const mens = century
    ? people.filter(human => human.sex === 'm'
      && Math.ceil(human.died / 100) === century)
    : people.filter(human => human.sex === 'm');

  return calculateAverage(mens);
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
  const womans = withChildren
    ? people.filter(human => human.sex === 'f'
    && people.some(child => child.mother === human.name))
    : people.filter(human => human.sex === 'f');

  return calculateAverage(womans);
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
  const children = onlyWithSon
    ? people.filter(human => human.sex === 'm'
    && people.some(child => child.name === human.mother))
    : people.filter(human => people.some(child => child.name === human.mother));

  return children.reduce((sum, child) => {
    return sum + child.born
    - people.find(mother => mother.name === child.mother).born;
  }, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
