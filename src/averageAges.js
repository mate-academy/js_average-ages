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
  let filterMan;

  if (century === undefined) {
    filterMan = people.filter(person => {
      return person.sex === 'm';
    });
  } else {
    filterMan = people.filter(person => {
      return century === Math.ceil(person.died / 100) && person.sex === 'm';
    });
  }

  const averageAge = filterMan.reduce((summAge, person) => {
    return summAge + (person.died - person.born);
  }, 0);

  return averageAge / filterMan.length;
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
  let filterWoman;

  const hasChildren = (woman) => {
    return people.some(person => person.mother === woman.name);
  };

  if (withChildren === undefined) {
    filterWoman = people.filter(person => {
      return person.sex === 'f';
    });
  } else {
    filterWoman = people.filter(person => {
      return person.sex === 'f';
    }).filter(person => hasChildren(person));
  }

  const averageAge = filterWoman.reduce((summAge, person) => {
    return summAge + (person.died - person.born);
  }, 0);

  return averageAge / filterWoman.length;
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
  let filterChildren;

  const getMother = (children) => {
    return people.find(person => children.mother === person.name);
  };

  if (onlyWithSon === undefined) {
    filterChildren = people.filter(person => getMother(person));
  } else {
    filterChildren = people.filter(person => {
      return person.sex === 'm';
    }).filter(person => getMother(person));
  }

  const differenceAge = filterChildren.reduce((summAge, children) => {
    return summAge + (children.born - getMother(children).born);
  }, 0);

  return differenceAge / filterChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
