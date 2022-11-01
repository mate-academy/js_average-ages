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

function calculateSumAges(people) {
  const sumAges = people.reduce((ages, person) =>
    (person.died - person.born) + ages, 0);

  return sumAges / people.length;
}

function getPersonsGender(people, gender) {
  return people.filter(person => person.sex === gender);
}

function calculateMenAverageAge(people, century) {
  const mens = century
    ? getPersonsGender(people, 'm')
      .filter(person => Math.ceil(person.died / 100) === century)
    : getPersonsGender(people, 'm');

  return calculateSumAges(mens);
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
  const womens = withChildren
    ? getPersonsGender(people, 'f')
      .filter(person => (people.find(human => human.mother === person.name)))
    : getPersonsGender(people, 'f');

  return calculateSumAges(womens);
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
  const children = onlyWithSon
    ? getPersonsGender(
      people.filter(child =>
        people.find(mother => child.mother === mother.name)), 'm')
    : people.filter(child =>
      people.find(mother => child.mother === mother.name));

  const sumDiffAge = children.reduce((sum, child) => {
    const age = child.born
    - people.find(mother => child.mother === mother.name).born;

    return sum + age;
  }, 0);

  return sumDiffAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
