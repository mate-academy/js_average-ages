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
  const rightCentury = century
    ? people.filter(person => Math.ceil(person.died / 100) === century)
    : people;
  const menAges = rightCentury
    .filter(person => person.sex === 'm')
    .map(person => person.died - person.born);

  return menAges.reduce((age, sum) => sum + age, 0) / menAges.length;
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
  const newWomanArray = withChildren
    ? people.filter(person => people
      .find(human => human.mother === person.name))
    : people.filter(person => person.sex === 'f');
  const womanAges = newWomanArray.map(person => person.died - person.born);

  return womanAges.reduce((age, sum) => sum + age, 0) / womanAges.length;
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
  const childrenWithMotherInList = people
    .filter(child => people
      .some(person => person.name === child.mother));
  const newCildrenArray = !onlyWithSon
    ? childrenWithMotherInList
    : childrenWithMotherInList.filter(person => person.sex === 'm');
  const ages = newCildrenArray.map(child => {
    const mother = people.find(person => person.name === child.mother);

    return child.born - mother.born;
  });

  return ages.reduce((age, sum) => sum + age, 0) / ages.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
