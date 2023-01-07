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
  let average = 0;

  let menList = people.filter(person => person.sex === 'm');

  if (arguments.length === 2) {
    menList = people.filter(person => (
      person.sex === 'm' && century === Math.ceil(person.died / 100)
    ));
  }

  const yearsOfLife = menList.map(person => person.died - person.born);

  const sumOfYears = yearsOfLife.reduce((acc, number) => acc + number, 0);

  average = sumOfYears / yearsOfLife.length;

  return +average.toFixed(2);
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
function calculateWomenAverageAge(people, withChilden) {
  let average = 0;
  const womenList = people.filter(({ name, sex }) => {
    const hasChildren = !withChilden
    || people.some(person => person.mother === name);

    return sex === 'f' && hasChildren;
  });

  const yearsOfLife = womenList.map(person => person.died - person.born);
  const sumOfYears = yearsOfLife.reduce((acc, number) => acc + number, 0);

  average = sumOfYears / yearsOfLife.length;

  return +average.toFixed(2);
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
  const childenWithMother = people.filter(child => {
    const hasMother = people.some(mother => mother.name === child.mother);
    const isSon = !onlyWithSon || child.sex === 'm';

    return hasMother && isSon;
  });
  const ageDifference = childenWithMother.reduce((acc, child) => {
    const motherBorn = people.find(mother => mother.name === child.mother).born;

    const difference = child.born - motherBorn;

    return acc + difference;
  }, 0);

  return ageDifference / childenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
