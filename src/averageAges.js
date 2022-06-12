'use strict';

function getPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function getAverageAge(people) {
  return people.reduce((sum, person) => (
    sum + person.died - person.born
  ), 0) / people.length;
}

function haveChildred(woman, people) {
  return people.some(person => person.mother === woman.name);
}

function getAgeDiff(people, womenWithChildrens) {
  const ageDiff = people.map(person => {
    const personMother = womenWithChildrens.find(woman =>
      woman.name === person.mother
    );

    return (!personMother) ? personMother : person.born - personMother.born;
  }).filter(a => a);

  return ageDiff.reduce((sum, a) => (sum + a)) / ageDiff.length;
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
  const normalizedPeople = (century)
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;

  return getAverageAge(getPeopleBySex(normalizedPeople, 'm'));
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
  const women = getPeopleBySex(people, 'f');

  const choosenWomen = (withChildren)
    ? women.filter(woman => !!haveChildred(woman, people))
    : women;

  return getAverageAge(choosenWomen);
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
  const women = getPeopleBySex(people, 'f');
  const mans = getPeopleBySex(people, 'm');

  const womenWithChildrens = (onlyWithSon)
    ? women.filter(woman => !!haveChildred(woman, mans))
    : women.filter(woman => !!haveChildred(woman, people));

  const ageDiff = (onlyWithSon)
    ? getAgeDiff(mans, womenWithChildrens)
    : getAgeDiff(people, womenWithChildrens);

  return ageDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
