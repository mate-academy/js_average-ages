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
  const men = people.filter(man => man.sex === 'm');

  const menOfCentury = men.filter(man => {
    return Math.ceil(man.died / 100) === century;
  });

  const menArray = century ? menOfCentury : men;

  return menArray.reduce(sumOfAge, 0) / menArray.length;
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
  const women = people.filter(woman => woman.sex === 'f');

  const womenWithChildren = women.filter(woman => {
    return people.some(person => person.mother === woman.name);
  });

  const womenArray = withChildren ? womenWithChildren : women;

  return womenArray.reduce(sumOfAge, 0) / womenArray.length;
}

function sumOfAge(sum, person) {
  return sum + (person.died - person.born);
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
  const mothers = people.filter(person => person.sex === 'f'
    && people.find(person1 => person1.mother === person.name));

  const children = onlyWithSon
    ? people.filter(person => {
      return mothers.find(mother => {
        return person.mother === mother.name && person.sex === 'm';
      });
    })
    : people.filter(person => {
      return mothers.find(mother => person.mother === mother.name);
    });

  const differenceAges = children.map(person => {
    const childBorn = person.born;

    const motherBorn = mothers.find(
      mother => mother.name === person.mother
    )['born'];

    return childBorn - motherBorn;
  });

  const average = differenceAges.reduce((sum, difference) =>
    sum + difference, 0) / differenceAges.length;

  return average;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
