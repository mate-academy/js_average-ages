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
  let menArray = people.filter(person => person.sex === 'm');

  if (arguments.length === 2) {
    menArray = menArray.filter(
      person => Math.ceil(person.died / 100) === century
    );
  }

  const countAge = menArray.map(
    person => person.died - person.born
  ).reduce((sum, age) => sum + age, 0);

  return countAge / menArray.length;
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
  let womenArray = people.filter(person => person.sex === 'f');
  const mothersArray = people.map(el => el.mother);

  if (withChildren) {
    womenArray = womenArray.filter(
      person => mothersArray.includes(person.name)
    );
  }

  const countAge = womenArray.map(
    person => person.died - person.born
  ).reduce((sum, age) => sum + age, 0);

  return countAge / womenArray.length;
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
  let children = people.filter(child => people.find(
    mother => child.mother === mother.name
  ));

  if (onlyWithSon) {
    children = children.filter(child => child.sex === 'm');
  }

  children = children.map(child => child.born - people.find(
    mother => child.mother === mother.name).born);

  const childrenAverageAge = children.reduce(
    (sum, age) => sum + age, 0) / children.length;

  return childrenAverageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
