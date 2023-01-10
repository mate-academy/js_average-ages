'use strict';

function getAverage(arr) {
  const adding = arr.reduce((acc, person) => {
    const sum = person.died - person.born;

    return sum + acc;
  }, 0);

  return +(adding / arr.length).toFixed(2);
}

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
  const menList = people.filter(person => {
    const inCentury = !century || Math.ceil(person.died / 100) === century;

    return person.sex === 'm' && inCentury;
  });

  return getAverage(menList);
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
  const womenList = people.filter(({ name, sex }) => {
    const hasChildren = !withChilden
    || people.some(person => person.mother === name);

    return sex === 'f' && hasChildren;
  });

  return getAverage(womenList);
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
    const motherBorn = people.find(mother => mother.name === child.mother);

    const difference = child.born - motherBorn.born;

    return acc + difference;
  }, 0);

  return ageDifference / childenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
