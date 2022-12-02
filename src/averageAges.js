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
  const men = people.filter(person => (
    century
      ? century === Math.ceil(person.died / 100) && person.sex === 'm'
      : person.sex === 'm')
  );

  const ages = men.map(person => person.died - person.born);

  return calcAverage(ages);
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
  const females = people.filter(person => (
    withChildren
      ? person.sex === 'f' && people.some(kid => kid.mother === person.name)
      : person.sex === 'f'
  ));

  const ages = females.map(person => person.died - person.born);

  return calcAverage(ages);
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
  const peopleWithMother = people.filter(person => people.some(mother => (
    onlyWithSon
      ? person.sex === 'm' && mother.name === person.mother
      : mother.name === person.mother
  )));

  const ageDifferences = peopleWithMother.map(person => {
    const personMother = people.find(mother => mother.name === person.mother);

    return person.born - personMother.born;
  });

  return calcAverage(ageDifferences);
}

function calcAverage(arr) {
  const sumAges = arr.reduce((sum, age) => sum + age);

  return Number((sumAges / arr.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
