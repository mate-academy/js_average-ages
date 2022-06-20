'use strict';

function getChildren(who, arr) {
  return who.filter(
    person => arr.some(one => one.name === person.mother)
  );
}

function getAge({ died, born }) {
  return died - born;
}

function getSex(arr, letter) {
  return arr.filter(person => person.sex === letter);
}

function findMothers(people, womenArray) {
  return people.find(person => person.mother === womenArray.name);
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
  const men = getSex(people, 'm');
  const menDiedInCentury = men.filter(
    person => Math.ceil(person.died / 100) === century || !century
  );
  const age = menDiedInCentury.map(year => getAge(year));
  const menAverageAge = age
    .reduce((sum, nextYear) => sum + nextYear, 0) / age.length;

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
  const womenArray = getSex(people, 'f');

  const women = withChildren
    ? womenArray.filter(person => findMothers(people, person))
    : womenArray;

  const age = women.map(year => getAge(year));
  const womenAverageAge = age
    .reduce((sum, nextYear) => sum + nextYear, 0) / age.length;

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
  const men = getSex(people, 'm');

  const children = onlyWithSon
    ? getChildren(men, people)
    : getChildren(people, people);

  const ageDifference = children.reduce((sum, current) => {
    const childMother = people
      .find(person => current.mother === person.name);

    const difference = current.born - childMother.born;

    return sum + difference;
  }, 0);

  return ageDifference / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
