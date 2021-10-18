'use strict';

// write code here
// learn how to use array methods like .filter .map .some .every .find .reduce
// avoid using loop and forEach
// replace `if ()` statement with &&, || or ?:
// without nesting
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
  const peopleArr = [...people];
  const men = peopleArr.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm').map(person =>
    person.died - person.born);// проверяем только пол

  const averageYearsMen = men.reduce((sum, age) =>
    sum + age, 0) / men.length;

  return averageYearsMen;
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
  // write code here
  const onlyWomen = withChildren
    ? people.filter(person => person['sex'] === 'f'
    && people.some(elem => elem['mother'] === person['name']))
    : people.filter(person =>
      person.sex === 'f');

  const averageYearsWomen = onlyWomen.map(person =>
    person.died - person.born).reduce((sum, age) =>
    sum + age, 0) / onlyWomen.length;

  return averageYearsWomen;
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
