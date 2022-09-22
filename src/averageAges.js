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
function calculateMenAverageAge(people, century = 0) {
  const onlyMan = century
    ? people.filter(person => person.sex === 'm'
       && Math.ceil(person.died / 100) === century)
    : people.filter(person => person.sex === 'm');

  const averageAge = onlyMan.reduce((total, person) => {
    let sum = total;

    sum += (person.died - person.born) / onlyMan.length;

    return sum;
  }, 0);

  return Math.round(averageAge * 100) / 100;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for wom6
 *
 *  * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = 0) {
  const onlyWomen = withChildren
    ? people.filter(person => person.sex === 'f'
      && people.find(child => child.mother === person.name))
    : people.filter(person => person.sex === 'f');

  const averageAge = onlyWomen.reduce((total, person) => {
    let sum = total;

    sum += (person.died - person.born) / onlyWomen.length;

    return sum;
  }, 0);

  return Math.round(averageAge * 100) / 100;
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
  const onlyChildrens = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.some(woman => woman.name === person.mother))
    : people.filter(person =>
      people.some(woman => woman.name === person.mother));

  const diferentAge = onlyChildrens.map(child =>
    child.born - people.find(mother => mother.name === child.mother).born);

  return diferentAge.reduce((a, b) => a + b, 0) / diferentAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
