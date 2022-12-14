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
  const men = people
    .filter(person => person.sex === 'm' && (century === undefined ? true
      : Math.ceil(person.died / 100) === century));
  const menAge = men.map(man => man.died - man.born);
  const totalAge = menAge.reduce((sum, age) => sum + age, 0);

  return totalAge / menAge.length;
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
  const women = people.filter((person, index, all) =>
    person.sex === 'f'
      && (withChildren
        ? all.some(someone => someone.mother === person.name)
        : true
      )
  );

  const womenAge = women.map(woman => woman.died - woman.born);

  const totalAge = womenAge.reduce((sum, age) => sum + age, 0);

  return totalAge / womenAge.length;
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
  const mothers = people.filter(
    mother => mother.sex === 'f' && people.some(
      child => (onlyWithSon ? child.sex === 'm' : true)
        && child.mother === mother.name
    )
  );

  const children = people.filter(
    child => (onlyWithSon ? child.sex === 'm' : true)
      && mothers.some(mother => mother.name === child.mother)).map(child => {
    const currentMother = mothers.find(
      mother => mother.name === child.mother
    );

    child.bornOfMother = currentMother.born;

    return child;
  }
  );

  const totalAgeDiff = children.reduce(
    (sum, child) => sum + child.born - child.bornOfMother, 0
  );

  return totalAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
