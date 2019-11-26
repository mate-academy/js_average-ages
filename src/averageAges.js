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
 * @return {Object}
 */
function calculateMenAverageAge(people, century) {
  const filteredPeople = people
    .filter(item => century
      ? Math.ceil(item.died / 100) === century
      : true)
    .filter(item => item.sex === 'm');

  return filteredPeople
    .reduce(function(sum, current) {
      return sum + (current.died - current.born);
    }, 0) / filteredPeople.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const filteredPeople = people
    .filter(item => item.sex === 'f'
      && (withChildren === true
        ? people.some(child => child.mother === item.name)
        : true));

  return filteredPeople
    .reduce(function(sum, current) {
      return sum + (current.died - current.born);
    }, 0) / filteredPeople.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * Function returns average difference in age between all mothers and their
 * children which are presented in the array.
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 *
 * @param onlyWithSon
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people
    .filter(item => item.sex === 'f'
      && people.some(child => child.mother === item.name));

  const children = people
    .filter(item => mothers
      .some(mother => mother.name === item.mother));

  const childrenMotherBorn = children.map(item => {
    return {
      motherBorn: +mothers
        .filter(p => p.name === item.mother)
        .map(age => age.born).join(''),
      childBorn: item.born,
      sex: item.sex,
    };
  });

  const result = childrenMotherBorn
    .filter(item => onlyWithSon
      ? item.sex === 'm'
      : true)
    .map(person => person.childBorn - person.motherBorn);

  return result
    .reduce(function(sum, current) {
      return sum + current;
    }, 0) / result.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
