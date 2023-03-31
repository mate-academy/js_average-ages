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
  const arrayOfMen = people.filter(person => person.sex === 'm');
  const arrayOfAges = (!century)
    ? getAge(arrayOfMen)
    : getAge(arrayOfMen.filter(
      person => Math.ceil(person.died / 100) === century));

  return getAverageAge(arrayOfAges);
}

function getAge(array) {
  return array.map(man => man.died - man.born);
}

function getAverageAge(array) {
  return array.reduce(
    (sum, age) => sum + age, 0) / array.length;
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
  const arrayOfWomen = (!withChildren)
    ? people.filter(person => person.sex === 'f')
    : people
      .filter(person => person.sex === 'f'
      && people.some(pers => pers.mother === person.name));
  const arrayOfAges = arrayOfWomen.map(person => person.died - person.born);

  return getAverageAge(arrayOfAges);
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
  const arrayOfKids = (!onlyWithSon)
    ? people.filter(person => people.some(pers => pers.name === person.mother))
    : people.filter(person => people.some(pers => pers.name === person.mother)
        && person.sex === 'm');

  const ageDifference = arrayOfKids.map(person => {
    const mother = people.find(p => p.name === person.mother);
    const difference = person.born - mother.born;

    return difference;
  });

  return getAverageAge(ageDifference);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
