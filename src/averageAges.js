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
  const isNeedMen = century
    ? people.filter(person =>
      person.sex === 'm'
    && Math.ceil(person.died / 100) === century
    )
    : people.filter(person => person.sex === 'm');

  const menLifeLength = isNeedMen.map(person => person.died - person.born);

  const manAvarageAge = menLifeLength.reduce((sum, age) =>
    sum + age) / menLifeLength.length;

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

  const isNeedWomen = withChildren
    ? people.filter(person =>
      person.sex === 'f'
    && withChildrenList.includes(person.name)
    )
    : people.filter(person => person.sex === 'f');

  const womenLifeLength = isNeedWomen.map(person => person.died - person.born);

  const womenAvarageAge = womenLifeLength.reduce((sum, age) =>
    sum + age) / womenLifeLength.length;

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
      && person.sex === 'm'
    )
    : people.filter(person =>
      people.find(mother => person.mother === mother.name));

  const differences = isNeedChildren.map(person =>
    person.born - people.find(mother =>
      person.mother === mother.name).born);

  const averageAgeDiff = differences.reduce((sum, difference) =>
    sum + difference) / differences.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
