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

function calculateAvarageAge(people) {
  const ages = people.map(person => person.died - person.born);
  const agesArr = ages.reduce((prev, person) => {
    return prev + person;
  }, 0) / ages.length;

  return agesArr;
}

function calculateMenAverageAge(people, century = false) {
  let mens = people.filter(person => person.sex === 'm');

  mens = century
    ? mens.filter(person => Math.ceil(person.died / 100) === century)
    : mens;

  return calculateAvarageAge(mens);
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
  let womens = people.filter(person => person.sex === 'f');

  womens = withChildren
    ? womens.filter(person => people
      .find(child => child.mother === person.name))
    : womens;

  return calculateAvarageAge(womens);
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
  let childrens = people.filter(child => child.mother
  && people.find(person => person.name === child.mother));

  childrens = onlyWithSon
    ? childrens.filter(child => child.sex === 'm')
    : childrens;

  const sum = childrens.reduce((prev, child) => {
    const mother = people.find(person => child.mother === person.name);
    const diff = child.born - mother.born;

    return prev + diff;
  }, 0);

  return sum / childrens.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
