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
  const menArr = people.filter(man =>
    century
      ? man.sex === 'm' && Math.ceil(man.died / 100) === century
      : man.sex === 'm',
  );

  const menAge = menArr.map(man => {
    man.age = man.died - man.born;

    return man.age;
  });

  return menAge.reduce((a, b) => a + b, 0) / menAge.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let womenArr = people.filter(woman => woman.sex === 'f');

  womenArr = withChildren
    ? womenArr.filter(gotChildren => people.some(person => {
      return person.mother === gotChildren.name;
    }))
    : womenArr;

  const womenAge = womenArr.map(woman => {
    woman.age = woman.died - woman.born;

    return woman.age;
  });

  return womenAge.reduce((a, b) => a + b, 0) / womenAge.length;
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
  const children = people.filter(child => onlyWithSon
    ? people.some(mother => child.mother === mother.name) && child.sex === 'm'
    : people.some(mother => child.mother === mother.name)
  );

  const ageDif = children.map(child => {
    return child.born - people.find(mother => {
      return child.mother === mother.name;
    }).born;
  });

  return ageDif.reduce((a, b) => a + b, 0) / ageDif.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
