'use strict';

function calculatePersonAverageAge(people) {
  return people
    .reduce((sum, age) => sum + (age.died - age.born), 0) / people.length;
}

/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = people
    .filter(person => century
      ? person.sex === 'm' && Math.ceil(person.died / 100) === century
      : person.sex === 'm');

  return calculatePersonAverageAge(men);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const women = people
    .filter(person => withChildren
      ? person.sex === 'f' && people.find(child => child.mother === person.name)
      : person.sex === 'f');

  return calculatePersonAverageAge(women);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let children = people.filter(child => child.mother
    && people.find(person => person.name === child.mother));

  children = onlyWithSon
    ? children.filter(child => child.sex === 'm')
    : children;

  const ageDifferenece = children
    .reduce((sum, age) => sum + age.born - people
      .find(person => person.name === age.mother).born, 0);

  return ageDifferenece / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
