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
  let menList;

  century
    ? menList = people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : menList = people.filter(person => person.sex === 'm');

  const menAge = menList.map(man => man.died - man.born);

  return averageAge(menAge);
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
  let womenList;

  withChildren
    ? womenList = people.filter(person => person.sex === 'f'
      && people.some(child => child.mother === person.name))
    : womenList = people.filter(person => person.sex === 'f');

  const womenAge = womenList.map(man => man.died - man.born);

  return averageAge(womenAge);
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
  const hasMother = people.filter(person => {
    let personMother;

    onlyWithSon
      ? personMother = person.sex === 'm'
      && people.some(mother => mother.name === person.mother)
      : personMother = people.some(mother => mother.name === person.mother);

    return personMother;
  });
  const ageDifference = hasMother.map(person => {
    const mother = people.find(motherPers => motherPers.name === person.mother);

    return person.born - mother.born;
  });

  return averageAge(ageDifference);
}

function averageAge(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
