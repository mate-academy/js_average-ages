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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let peopleArr = [...people];

  (century) && (peopleArr = people.filter(
    person => Math.ceil(person.died / 100) === century)
  );

  const onlyMen = peopleArr.filter(person =>
    person.sex === 'm').map(person =>
    person.died - person.born);
  const averageYearsMen = onlyMen.reduce((sum, age) =>
    sum + age, 0) / onlyMen.length;

  return averageYearsMen;
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
  // write code here
  const onlyWomen = withChildren
    ? people.filter(person => person['sex'] === 'f'
    && people.some(elem => elem['mother'] === person['name'])).map(person =>
      person.died - person.born)
    : people.filter(person =>
      person.sex === 'f').map(person =>
      person.died - person.born);

  const averageYearsWomen = onlyWomen.reduce((sum, age) =>
    sum + age, 0) / onlyWomen.length;

  return averageYearsWomen;
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
  // write code here
  const arrMother = onlyWithSon
    ? people.filter(person => person.sex === 'm'
      && people.some(elem => elem.name === person.mother))
    : people.filter(person =>
      people.some(elem => (elem.name) === person.mother));

  const diffAge = arrMother.map(person => {
    const diff = people.find(elem => person.mother === elem.name);

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
