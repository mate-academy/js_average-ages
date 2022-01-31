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
    ? people.filter(person => person.sex === 'm'
      && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const avgAge = menList.reduce((prevAge, man) => (
    prevAge + (man.died - man.born)
  ), 0) / menList.length;

  return avgAge;
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
  const motherNameList = [];
  let women = people.filter(person => person.sex === 'f');

  people.map(name => motherNameList.push(name.mother));

  if (withChildren) {
    women = women.filter(child => child.name === motherNameList.find(mother =>
      mother === child.name));
  }

  const avgAge = women.reduce((prevAge, currentAge) =>
    prevAge + (currentAge.died - currentAge.born), 0) / women.length;

  return avgAge;
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
  const childs = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.some(son => person.mother === son.name))
    : people.filter(women => people.some(son => women.mother === son.name));

  const avgAge = childs.map(person => (
    person.born - people.find(child => person.mother === child.name).born)
  ).reduce((prevAge, currentAge) => prevAge + currentAge, 0) / childs.length;

  return avgAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
