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

const filterPeopleBySex = (people, sex) => {
  return people.filter(person => person.sex === sex);
};

const getAge = person => person.died - person.born;

const getAverageAge = people => {
  return people
    .reduce((sum, person) => (sum + getAge(person)), 0) / people.length;
};

function calculateMenAverageAge(people, century) {
  const men = filterPeopleBySex(people, 'm');
  const menDiedInCentury = men
    .filter(man => century === Math.ceil(man.died / 100));

  const menAverageAge = !century
    ? getAverageAge(men)
    : getAverageAge(menDiedInCentury);

  return menAverageAge;
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
  const women = filterPeopleBySex(people, 'f');
  const womenWithChild = people
    .filter(person => people
      .some(child => child.mother === person.name));

  const womenAverageAge = !withChildren
    ? getAverageAge(women)
    : getAverageAge(womenWithChild);

  return womenAverageAge;
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
  const findMothers = child => people
    .find(mother => mother.name === child.mother);

  const poepleWithChildren = people.filter((child) => onlyWithSon
    ? child.sex === 'm' && findMothers(child)
    : findMothers(child));

  const ageDifferences = poepleWithChildren
    .map(child => child.born - findMothers(child).born);

  const ageDifferencesSum = ageDifferences.reduce((a, b) => a + b);
  const averageAgeDiff = ageDifferencesSum / ageDifferences.length;

  return averageAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
