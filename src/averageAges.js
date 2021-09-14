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

function average(arr, length) {
  return arr.reduce((a, b) => a + b) / length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menInCentury = men.filter((man) =>
    Math.ceil(man.died / 100) === century
  );

  const allMen = century ? menInCentury : men;

  const menAge = allMen.map(man => man.died - man.born);

  return average(menAge, allMen.length);
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
  const women = people.filter(person => person.sex === 'f');

  const womenHasChild = women.filter(woman =>
    people.some(person => person.mother === woman.name)
  );

  const allWomen = withChildren ? womenHasChild : women;

  const womenAge = allWomen.map(woman => woman.died - woman.born);

  return average(womenAge, allWomen.length);
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
  const allChildren = people.filter(person =>
    person.mother !== null && people.some(woman => woman.name === person.mother)
  );

  const allSons = allChildren.filter(child => child.sex === 'm');

  const children = onlyWithSon ? allSons : allChildren;

  const ageDiff = children.map(child => {
    const mother = people.find(woman => woman.name === child.mother);

    return child.born - mother.born;
  });

  return average(ageDiff, children.length);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
