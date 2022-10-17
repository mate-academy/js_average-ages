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
  const allMen = (century
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm'));

  const ages = allMen.map(person => person.died - person.born);
  const averageAge = ages.reduce((a, b) => a + b) / ages.length;

  return averageAge;
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
  const motherName = people.map(person => person.mother);
  const allWomen = (withChildren
    ? people.filter(person => person.sex === 'f'
      && motherName.includes(person.name))
    : people.filter(person => person.sex === 'f'));

  const ages = allWomen.map(person => person.died - person.born);
  const averageAge = ages.reduce((a, b) => a + b) / ages.length;

  return averageAge;
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
  const momAndChild = (onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.find(mother => person.mother === mother.name))
    : people.filter(person =>
      people.find(mother => person.mother === mother.name)));

  const ages = momAndChild.map(person =>
    person.born - people.find(mother =>
      person.mother === mother.name).born);

  const ageDiff = ages.reduce((a, b) => (a + b)) / ages.length;

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
