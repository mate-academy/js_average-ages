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
  const men = people.filter(person => person.sex === 'm');
  const menWithCenturyDeathAndAge = men.map(person => ({
    centuryDeath: Math.ceil(person.died / 100),
    age: person.died - person.born,
  }));
  const menFilteredByDeathCentury
  = getResultArr(menWithCenturyDeathAndAge, century);

  return getAverageAge(menFilteredByDeathCentury);
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
  const womenIsMotherWithAge = people.map(person => ({
    ...person,
    isMother: people.some(one => one.mother === person.name),
    age: person.died - person.born,
  })).filter(person => person.sex === 'f');

  const mother
  = womenIsMotherWithAge.filter(person => person.isMother);

  return !withChildren
    ? getAverageAge(womenIsMotherWithAge)
    : getAverageAge(mother);
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
  const motherDiff = people.map(person => ({
    ...person,
    children: people.filter(one => one.mother === person.name),
  })).map(person => ({
    ...person,
    diffAge: person.children.map(child => child.born - person.born),
  }));

  const motherOfSon = motherDiff.map(person => ({
    ...person,
    children: person.children.filter(item => item.sex === 'm'),
  })).map(person => ({
    diffAge: person.children.map(child => child.born - person.born),
  }));

  const differenceAge = !onlyWithSon
    ? (motherDiff.map(person => person.diffAge)).flat()
    : (motherOfSon.map(person => person.diffAge)).flat();

  return differenceAge.reduce((
    sum, item) => sum + item, 0) / differenceAge.length;
}

function getResultArr(arr, value) {
  return value
    ? arr.filter(item => item.centuryDeath === value)
    : arr;
}

function getAverageAge(arr) {
  return (arr.reduce((a, { age }) => a + age, 0)) / arr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
