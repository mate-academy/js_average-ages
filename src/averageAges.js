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
  const menList = century
    ? people.filter(person =>
      person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const menLifeLength = menList.map(person => person.died - person.born);

  const manAvarageAge = resultRedusing(menLifeLength);

  return manAvarageAge;
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
  const withChildrenList = people.map(person => person.mother);

  const womenList = withChildren
    ? people.filter(person =>
      person.sex === 'f'
      && withChildrenList.includes(person.name))
    : people.filter(person => person.sex === 'f');

  const womenLifeLength = womenList.map(person => person.died - person.born);

  const womenAvarageAge = resultRedusing(womenLifeLength);

  return womenAvarageAge;
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
  const isNeedChildren = onlyWithSon
    ? people.filter(person =>
      people.find(mother => person.mother === mother.name)
      && person.sex === 'm')
    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const differences = isNeedChildren.map(person =>
    person.born - people.find(mother =>
      person.mother === mother.name).born);

  const averageAgeDiff = resultRedusing(differences);

  return averageAgeDiff;
}

function resultRedusing(listToReduce) {
  return listToReduce.reduce((sum, property) =>
    sum + property) / listToReduce.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
