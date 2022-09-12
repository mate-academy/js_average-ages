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
  let men = people.filter(person => person.sex === 'm');

  if (century) {
    men = men.filter(man => Math.ceil(man.died / 100) === century);
  }

  const menAges = men.map(man => man.died - man.born);

  return menAges.reduce((sum, age) => sum + age, 0) / menAges.length;
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
  let women = people.filter(person => person.sex === 'f');

  if (withChildren) {
    women = women.filter((woman) =>
      people.some(person => woman.name === person.mother));
  }

  const womenAges = women.map(person => person.died - person.born);

  return womenAges.reduce((sum, age) => sum + age, 0) / womenAges.length;
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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChild = women.filter(woman => {
    return people.filter(person => person.mother === woman.name);
  });

  const children = onlyWithSon
    ? people.filter(person => {
      return womenWithChild
        .some(mother => mother.name === person.mother && person.sex === 'm');
    })
    : people.filter(person => {
      return womenWithChild.some(mother => mother.name === person.mother);
    });

  const diffAge = children.map(child => {
    const motherBorn = womenWithChild
      .find(woman => woman.name === child.mother).born;
    const childBorn = child.born;

    return childBorn - motherBorn;
  });

  return diffAge.reduce((sum, age) => sum + age, 0) / diffAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
