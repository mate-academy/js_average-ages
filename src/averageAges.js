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
  let arr = people.filter(person => person.sex === 'm');

  arr = century
    ? arr.filter(person => Math.ceil(person.died / 100) === century)
    : arr;

  const summ = arr.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);

  return arr.length ? summ / arr.length : 0;
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
  let arr = people.filter(person => person.sex === 'f');

  arr = withChildren
    ? arr.filter(person => people.find(el => el.mother === person.name))
    : arr;

  const summ = arr.reduce((sum, person) => {
    return sum + (person.died - person.born);
  }, 0);

  return (arr.length) ? summ / arr.length : 0;
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
  const mothers = [];
  let childrens = people.filter(child => {
    return people.find(person => {
      if (person.name === child.mother) {
        mothers.push(person);
      };

      return person.name === child.mother;
    });
  });

  childrens = onlyWithSon
    ? childrens.filter(el => el.sex === 'm')
    : childrens;

  const summ = childrens.reduce((sum, child) => {
    const mother = mothers.find(mom => mom.name === child.mother);

    return sum + (child.born - mother.born);
  }, 0);

  return summ / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
