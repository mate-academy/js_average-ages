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
  const menAges = people
    .filter(man =>
      (!century || Math.ceil(man.died / 100) === century) && man.sex === 'm'
    )
    .map(man => man.died - man.born);

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
  const womenAge = people
    .filter((woman) => !withChildren
      ? woman.sex === 'f'
      : woman.sex === 'f' && people.some(child => child.mother === woman.name))
    .map((person) => person.died - person.born);

  return getAverageAge(womenAge);
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
  const filteredChildPeople = people.filter(person => {
    const hasMother = people.some(mother => mother.name === person.mother);

    return onlyWithSon ? (person.sex === 'm' && hasMother) : hasMother;
  });

  const diffAge = filteredChildPeople.map(person =>
    person.born - people.find(mother => mother.name === person.mother).born);

  return getAverageAge(diffAge);
}

function getAverageAge(input) {
  return input.reduce((sum, age) => sum + age, 0) / input.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
