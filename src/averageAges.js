'use strict';

// const people = require('./people');

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
  const menList = people.filter(man => (
    !century
      ? man.sex === 'm'
      : man.sex === 'm' && Math.ceil(man.died / 100) === century
  ));

  const menAgesSum = menList.reduce((totalAge, man) => (
    totalAge + (man.died - man.born)
  ), 0);

  return menAgesSum / menList.length;
}

// console.log(calculateMenAverageAge(people, 18));

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
  const womenList = people.filter(woman => (
    !withChildren
      ? woman.sex === 'f'
      : people.some(child => child.mother === woman.name)
  ));

  const womenAgesSum = womenList.reduce((totalAge, woman) => (
    totalAge + (woman.died - woman.born)
  ), 0);

  return womenAgesSum / womenList.length;
}

// console.log(calculateWomenAverageAge(people, true));

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
  const childrenList = people.filter(child => (
    !onlyWithSon
      ? people.find(mother => mother.name === child.mother)
      : people.find(mother => mother.name === child.mother) && child.sex === 'm'
  ));

  const ageDiffs = childrenList.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  const ageDiffsSum = ageDiffs.reduce((total, age) => total + age, 0);

  return ageDiffsSum / ageDiffs.length;
}

// console.log(calculateAverageAgeDiff(people, true));

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
