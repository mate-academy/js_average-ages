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
  let peopleArr = [...people];

  (century) && (peopleArr = people.filter(
    person => Math.ceil(person.died / 100) === century)
  );

  const onlyMen = peopleArr.filter(person => person.sex === 'm')
    .map(person => person.died - person.born);

  const result = onlyMen.reduce((sum, age) =>
    sum + age, 0) / onlyMen.length;

  return result;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const peopleArr = [...people];

  const onlyWomen = withChildren
    ? peopleArr.filter(person => person.sex === 'f'
    && people.some(elem => elem.mother === person.name))
      .map(person => person.died - person.born)
    : peopleArr.filter(person => person.sex === 'f')
      .map(person => person.died - person.born);

  const result = onlyWomen.reduce((sum, age) =>
    sum + age, 0) / onlyWomen.length;

  return result;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const peopleArr = [...people];

  const onlyMother = onlyWithSon
    ? peopleArr.filter(person => person.sex === 'm'
    && peopleArr.some(elem => elem.name === person.mother))
    : peopleArr.filter(person =>
      peopleArr.some(elem => elem.name === person.mother));

  const diffAge = onlyMother.map(person => {
    const diff = peopleArr.find(elem => elem.name === person.mother);

    return person.born - diff.born;
  });

  const result = diffAge.reduce((prev, person) =>
    prev + person, 0) / diffAge.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
