'use strict';

function getChildren(arr, motherName) {
  return arr
    .filter(({ mother }) => {
      return arguments.length > 1
        ? mother === motherName
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
  const age = people
    .filter(x => {
      if (century) {
        return (Math.ceil(x.died / 100) === century) && (x.sex === 'm');
      }

      return (x.sex === 'm');
    });

  const allPeople = age
    .map(year => (
      year.died - year.born
    ));

  const averageAge = allPeople
    .reduce((avarage, x) => avarage + x, 0) / allPeople.length;

  return averageAge;
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
  let age;

  if (withChildren) {
    age = getMothers(people);
  } else {
    age = people.filter((ind) => ind.sex === 'f');
  }

  const allPeople = age
    .map(year => (
      year.died - year.born
    ));

  const averageAge = allPeople
    .reduce((avarage, x) => avarage + x, 0) / allPeople.length;

  return averageAge;
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
  const allPeople = [];

  for (const mother of mothers) {
    let children;

    if (onlyWithSon) {
      children
      = getChildren(people, mother.name).filter((ind) => ind.sex === 'm');
    } else {
      children = getChildren(people, mother.name);
    }

    children.forEach(({ born }) => {
      const momAge = born - mother.born;

      allPeople.push(momAge);
    });
  }

  const averageAge = allPeople
    .reduce((avarage, x) => avarage + x, 0) / allPeople.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
