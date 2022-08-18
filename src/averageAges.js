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
  let average = 0;
  const arrayOfMen = people.filter(person => person.sex === 'm');
  const lifeYears = (!century)
    ? arrayOfMen.map(men => men.died - men.born)
    : arrayOfMen.filter(person => Math.ceil(person.died / 100) === century)
      .map(men => men.died - men.born);

  average = (lifeYears.reduce((sum, age) => sum + age, 0)) / lifeYears.length;

  return average;
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
  let average = 0;
  const arrayOfWomen = people.filter(person => person.sex === 'f');
  const nameMothers = people.map(person => person.mother);
  const arrayOfMothers = arrayOfWomen.filter(person =>
    nameMothers.includes(person.name));
  const lifeYears = (!withChildren)
    ? arrayOfWomen.map(women => women.died - women.born)
    : arrayOfMothers.map(women => women.died - women.born);

  average = (lifeYears.reduce((sum, age) => sum + age, 0)) / lifeYears.length;

  return average;
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
  let average = 0;
  const mothers = people.map(person => person.mother);
  const arrayOfMothers = people.filter(person => mothers.includes(person.name));
  const nameMothers = arrayOfMothers.map(person => person.name);
  const arrayOfChildren = (!onlyWithSon)
    ? people.filter(child => nameMothers.includes(child.mother))
    : people.filter(child => nameMothers.includes(child.mother)
     && child.sex === 'm');

  const differenceOfAge = arrayOfChildren.map(person => {
    const motherOfPerson = arrayOfMothers.find(mother =>
      mother.name === person.mother);

    return person.born - motherOfPerson.born;
  });

  average = differenceOfAge.reduce((sum, age) => sum + age, 0);

  return average / differenceOfAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
