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
  let result = century
    ? people.filter((person) => century === Math.ceil(person.died / 100))
    : people;

  result = getPersonBySex(result, 'm');
  result = getLifetimeArray(result);

  return calculateAverageAge(result);
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
  const mothersName = [];

  people.forEach(person => {
    mothersName.push(person.mother);
  });

  let result = withChildren
    ? people.filter((person) => mothersName.includes(person.name))
    : people;

  result = getPersonBySex(result, 'f');
  result = getLifetimeArray(result);

  return calculateAverageAge(result);
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
  function findMother(name) {
    return people.find(person => person.name === name);
  };

  const peopleWithChildOrSon = onlyWithSon
    ? getPersonBySex(people, 'm')
    : people;

  const peopleWithMother = peopleWithChildOrSon.filter(person => {
    return findMother(person.mother);
  });

  const diffAge = peopleWithMother.map(person => {
    const mother = findMother(person.mother);
    const motherAge = person.born - mother.born;

    return motherAge;
  });

  return calculateAverageAge(diffAge);
}

function getPersonBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getLifetimeArray(people) {
  return people.map(person => person.died - person.born);
}

function calculateAverageAge(people) {
  return people.reduce((personA, personB) => personA + personB) / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
