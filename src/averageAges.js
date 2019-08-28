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
  const onlyMen = people.filter(person => {
    if (!century) {
      return person.sex === 'm';
    } else {
      return person.sex === 'm' && Math.ceil(person.died / 100) === century;
    }
  });

  return onlyMen.reduce(
    (acc, man, i, arr) => acc + (man.died - man.born) / arr.length, 0
  );
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
  const onlyWomen = people.filter(person => {
    if (!withChildren) {
      return person.sex === 'f';
    } else {
      return people.some(child => child.mother === person.name);
    }
  });

  return onlyWomen.reduce(
    (acc, woman, i, arr) => acc + (woman.died - woman.born) / arr.length, 0);
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
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenWithMother = people.filter(person => {
    if (!onlyWithSon) {
      return people.some(mother => person.mother === mother.name);
    } else {
      return people.some(
        mother => person.mother === mother.name && person.sex === 'm'
      );
    }
  });

  return childrenWithMother.reduce((acc, child, i, arr) => {
    const mother = people.find(person => person.name === child.mother);

    return acc + (child.born - mother.born) / arr.length;
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
