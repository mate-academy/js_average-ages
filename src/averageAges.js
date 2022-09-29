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

const reducer = (a, b) => a + b;

function calculateMenAverageAge(people, century) {
  const menList = people.filter(man => century
    ? Math.ceil(man.died / 100) === century && man.sex === 'm'
    : man.sex === 'm'
  );

  const menAges = menList.map(man => man.died - man.born);

  const avarageAge = menAges
    .reduce(reducer) / menAges.length.toFixed(2);

  return avarageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const womenList = people.filter(woman => withChildren
    ? woman.sex === 'f' && people.some(person => person.mother === woman.name)
    : woman.sex === 'f'
  );

  const womenAges = womenList.map(woman => woman.died - woman.born);

  const womenAverageAge = womenAges
    .reduce(reducer) / womenAges.length;

  return womenAverageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenList = people.filter(woman =>
    woman.sex === 'f'
    && people.some(person => person.mother === woman.name));

  const children = people.filter(person =>
    onlyWithSon
      ? people.some(mother => person.mother === mother.name)
        && person.sex === 'm'
      : people.some(mother => person.mother === mother.name));

  const ages = children.map(child =>
    child.born - womenList.find(mother => mother.name === child.mother).born);

  return ages.reduce(reducer) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
