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

const getAverageAge = list => list.reduce((sum, person) =>
  sum + (person.died - person.born), 0)
   / list.length;

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm');

  const averageAge = getAverageAge(men);

  return averageAge;

  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const woman = people.filter(person => person.sex === 'f');

  const allMotherPeople = people.map(person => person.mother);

  const mothers = woman.filter(person => allMotherPeople.includes(person.name));

  const averageAge = getAverageAge(mothers);

  const averageAgeWoman = getAverageAge(woman);

  return withChildren ? averageAge : averageAgeWoman;
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

const getMothersYrBorn = (mothers, motherName) => {
  const mother = mothers.filter(mom => mom.name === motherName);

  return mother.toString() === '' ? 0 : mother[0].born;
};

function calculateAverageAgeDiff(people, onlyWithSon) {
  const woman = people.filter(person => person.sex === 'f');

  const peopleMothers = people.filter(person =>
    person.mother !== null).map(person => person.mother);

  const mothers = woman.filter(person => peopleMothers.includes(person.name));

  const mothersNames = mothers.map(person => person.name);

  let children = people.filter(person => mothersNames.includes(person.mother));

  const sonChildren = children.filter(person =>
    person.sex === 'm');

  if (onlyWithSon === true) {
    children = sonChildren;
  }

  const ageDifferences = children.reduce((list, person) => {
    const childYrBorn = person.born;
    const motherName = person.mother;
    const motherYrBorn = getMothersYrBorn(mothers, motherName);
    const ageDiff = childYrBorn - motherYrBorn;

    list.push(ageDiff);

    return list;
  }, []);
  const result = ageDifferences.reduce((prev, nextVal) =>
    prev + nextVal) / children.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
