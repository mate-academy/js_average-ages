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
  const newArray = people.filter(person => person.sex === 'm'
   && (!century || Math.ceil(person.died / 100) === century));

  const sumOfYears = newArray.reduce((prev, person) =>
    prev + (person.died - person.born), 0);

  const menAverageAge = sumOfYears / newArray.length;

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
  const women = people
    .filter(person => withChildren
      ? person.sex === 'f' && people.some(chidren =>
        person.name === chidren.mother)
      : person.sex === 'f');

  const womenAverAge = women.map(person => person.died - person.born)
    .reduce((sum, num) => (sum + num), 0) / women.length;

  return womenAverAge;
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
  const arrWomen = people.filter(woman =>
    people.some(child => child.mother === woman.name && (onlyWithSon
      ? child.sex === 'm'
      : true)
    ));

  const children = people.filter(child =>
    people.some(woman =>
      woman.name === child.mother) && (onlyWithSon
      ? child.sex === 'm'
      : true));

  const age = children.reduce((prev, child) =>
    prev + (child.born - arrWomen.find(mother =>
      child.mother === mother.name).born), 0) / children.length;

  return age;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
