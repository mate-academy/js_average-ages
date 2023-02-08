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
  const men = people.filter(human =>
    century
      ? human.sex === 'm' && Math.ceil(human.died / 100) === century
      : human.sex === 'm'
  );

  const menAges = men.map(human => human.died - human.born);

  return getAverageAge(menAges);
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
  const womans = people.filter(human =>
    withChildren
      ? human.sex === 'f' && people.some(child => child.mother === human.name)
      : human.sex === 'f'
  );

  const womansAges = womans.map(human => human.died - human.born);

  return getAverageAge(womansAges);
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
  const children = people.filter(human =>
    onlyWithSon
      ? people.some(mother => mother.name === human.mother) && human.sex === 'm'
      : people.some(mother => mother.name === human.mother)
  );

  const childrenAges = children.map(child =>
    child.born - (people.find(mother => mother.name === child.mother)).born
  );

  return getAverageAge(childrenAges);
}

function getAverageAge(ages) {
  const averageAge = ages.reduce((sum, age) => sum + age, 0);

  return averageAge / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
