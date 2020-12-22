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
  const men = century === undefined
    ? people.filter(person => person.sex === 'm') : people
      .filter(person => person.sex === 'm')
      .filter(person => Math.ceil(person.died / 100) === century);

  const years = men.map(person => person.died - person.born);
  const manAge = years.reduce((sum, year) => sum + year);

  return manAge / years.length;
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
  const women = people.filter(person => person.sex === 'f');

  const womenWithChildren = women
    .filter(person => people
      .findIndex(human => human.mother === person.name) !== -1);

  function averageAge(typeWomen) {
    const years = typeWomen.map(person => person.died - person.born);
    const womenAge = years.reduce((sum, age) => sum + age);

    return womenAge / years.length;
  }

  return withChildren === undefined
    ? averageAge(women) : averageAge(womenWithChildren);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
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
  const sons = people.filter(child => people
    .some(mother => mother.name === child.mother) && child.sex === 'm');

  const allChildren = people.filter(child => people
    .some(mother => mother.name === child.mother));

  function averageAge(children) {
    const years = children.map(child => child.born - people
      .find(mother => child.mother === mother.name).born);
    const childrenAge = years.reduce((sum, year) => sum + year);

    return childrenAge / years.length;
  }

  return onlyWithSon !== undefined
    ? averageAge(sons) : averageAge(allChildren);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
