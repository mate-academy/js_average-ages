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
  const menArr = people.filter(
    person => person.sex === 'm'
      && (century === undefined
        ? true
        : Math.ceil(person.died / 100) === century)
  );

  const menAge = menArr.map(man => man.died - man.born);
  const avgAge = (menAge.reduce((sum, age) => sum + age, 0))
    / menAge.length;

  return avgAge;
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
  const womenArr = people.filter((person, index, all) =>
    person.sex === 'f'
    && (withChildren
      ? all.some(someone => someone.mother === person.name) : true)
  );

  const womenAge = womenArr.map(woman => woman.died - woman.born);
  const avgAge = (womenAge.reduce((sum, age) => sum + age, 0))
    / womenAge.length;

  return avgAge;
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
  const childrenWithMother = people.filter((person) =>
    onlyWithSon
      ? people.some(
        (mother) => person.mother === mother.name && person.sex === 'm'
      )
      : people.some((mother) => person.mother === mother.name)
  );

  const avgDiff = childrenWithMother.reduce((accumulator, child) => {
    const mother = people.find((person) => person.name === child.mother);

    return accumulator + (child.born - mother.born);
  }, 0) / childrenWithMother.length;

  return avgDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
