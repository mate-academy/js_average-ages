'use strict';

function filterBySex(arr, sex) {
  return arr
    .filter(({ 'sex': currSex }) => currSex === sex);
}

function filterByCentury(arr, century) {
  return arr
    .filter(({ died }) => Math.ceil(died / 100) === century);
}

function sumAges(totalAge, { died, born }) {
  const age = died - born;

  return totalAge + age;
}

function getChildren(arr, momName) {
  return arr
    .filter(({ mother }) => {
      return arguments.length > 1
        ? mother === momName
        : typeof mother === 'string';
    });
}

function getMothers(arr) {
  const children = getChildren(arr);
  const motherNames = children.map(({ mother }) => mother);

  return arr
    .filter(({ name }) => motherNames.indexOf(name) !== -1);
}

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
  const sex = 'm';

  let men = filterBySex(people, sex);

  if (arguments.length > 1) {
    men = filterByCentury(men, century);
  }

  const totalAge = men.reduce(sumAges, 0);
  const avgAge = totalAge / men.length;

  return avgAge;
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
  let women;

  if (withChildren) {
    women = getMothers(people);
  } else {
    const sex = 'f';

    women = filterBySex(people, sex);
  }

  const totalAge = women.reduce(sumAges, 0);
  const avgAge = totalAge / women.length;

  return avgAge;
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
  const mothers = getMothers(people);
  const bornAges = [];

  for (const mom of mothers) {
    const children = arguments.length > 1
      ? filterBySex(getChildren(people, mom.name), 'm')
      : getChildren(people, mom.name);

    children.forEach(({ born }) => {
      const momAge = born - mom.born;

      bornAges.push(momAge);
    });
  }

  const totalBornAge = bornAges
    .reduce((sum, age) => sum + age);
  const avgBornAge = totalBornAge / bornAges.length;

  return avgBornAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
