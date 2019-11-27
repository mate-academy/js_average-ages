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
    .filter(human => (century
      ? Math.ceil(human.died / 100) === century
      : true) && human.sex === 'm')
    .map(man => {
      return {
        ...man,
        diff: man.died - man.born,
      };
    });

  return getAverage(filteredPeople);
}

function getAverage(filtered) {
  return filtered.reduce(function(sum, current) {
    return sum + current.diff;
  }, 0) / filtered.length;
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
    .filter(human => human.sex === 'f'
      && (withChildren === true
        ? people.some(child => child.mother === human.name)
        : true))
    .map(woman => {
      return {
        ...woman,
        diff: woman.died - woman.born,
      };
    });

  return getAverage(filteredPeople);
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
    .filter(human => human.sex === 'f'
      && people.some(child => child.mother === human.name));

  const children = people
    .filter(child => mothers
      .some(mother => mother.name === child.mother));

  const childrenMotherBorn = children.map(child => {
    return {
      motherBorn: +mothers
        .filter(p => p.name === child.mother)
        .map(age => age.born).join(''),
      childBorn: child.born,
      sex: child.sex,
      diff: child.born - +mothers
        .filter(p => p.name === child.mother)
        .map(age => age.born).join(''),
    };
  });

  const filteredPerson = childrenMotherBorn
    .filter(child => onlyWithSon
      ? child.sex === 'm'
      : true);

  return getAverage(filteredPerson);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
