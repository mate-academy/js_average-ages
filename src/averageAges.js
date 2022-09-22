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

function calculateAverageAge(peopleList) {
  const averageAge = peopleList.reduce((firstPerson, secondPerson) =>
    (firstPerson + secondPerson)
  ) / peopleList.length;

  return averageAge;
};

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm'
    && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  const menAges = men.map(person => person.died - person.born);

  const menAverageAge = calculateAverageAge(menAges);

  return menAverageAge;
};

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
  const women = people.filter(person => withChildren
    ? person.sex === 'f'
    && womenWithChildren(people, person)
    : person.sex === 'f'
  );

  const womenAges = women.map(person => person.died - person.born);

  const womenAverageAge = calculateAverageAge(womenAges);

  return womenAverageAge;
};

function womenWithChildren(people, mother) {
  return people.some(person => person.mother === mother.name);
};

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
  const children = people.filter(person => onlyWithSon
    ? person.sex === 'm'
    && hasMother(people, person.mother)
    : hasMother(people, person.mother)
  );

  const motherAges = children
    .map(person => person.born - bornMother(people, person.mother));

  const motherAverageAge = calculateAverageAge(motherAges);

  return motherAverageAge;
};

function hasMother(people, motherName) {
  return people.some(person => person.name === motherName);
};

function bornMother(people, motherName) {
  const mother = people.find(person => person.name === motherName);

  return mother.born;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
