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
  const men = people.filter((m) => m.sex === 'm');

  if (arguments.length === 1) {
    return men.map(p => p.died - p.born).reduce((a, b) => a + b) / men.length;
  } else {
    const cent = men.filter(p => Math.ceil(p.died / 100) === century);
    return cent.map(p => p.died - p.born).reduce((a, b) => a + b) / cent.length;
  }
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
  const women = people.filter((f) => f.sex === 'f');

  if (arguments.length === 1) {
    return women.map(p => p.died - p.born)
      .reduce((a, b) => a + b) / women.length;
  } else {
    const womenWithChildren = women.filter(woman => people
      .some(person => person.mother === woman.name));
    return womenWithChildren.map(w => w.died - w.born)
      .reduce((a, b) => a + b) / womenWithChildren.length;
  }
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
  const women = people.filter((f) => f.sex === 'f');
  const womenWithChildren = women.filter(woman => people
    .some(person => person.mother === woman.name));
  let children = people.filter(child => womenWithChildren
    .some(person => person.name === child.mother));

  children = onlyWithSon
    ? children.filter((child) => child.sex === 'm') : children;

  children.map(function(child) {
    const mother = (people.find(mom => mom.name === child.mother));
    child.mom = mother.born;
  });

  return children.reduce((a, b) => a + b.born - b.mom, 0) / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
