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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const filteredMales = peopleFilter(people, 'm', century);

  return averageAge(filteredMales);
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
  const filteredFemales = peopleFilter(people, 'f', false, withChildren);

  return averageAge(filteredFemales);
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
  // write code here
  const filteredChildren = (!onlyWithSon)
    ? people.filter(person => people
      .find(mother => mother.name === person.mother))
    : peopleFilter(
      people.filter(person => people
        .find(mother => mother.name === person.mother)),
      'm'
    );

  const ageDifference = filteredChildren
    .reduce((prev, curr) =>
      (prev + curr.born - people
        .find(person =>
          person.name === curr.mother).born), 0);

  return ageDifference / filteredChildren.length;
}

function peopleFilter(people, sex, century, withChildren) {
  let filtered = people.filter(person => person.sex === sex);

  if (century) {
    filtered = filtered.filter(person =>
      Math.ceil(person.died / 100) === century
    );
  }

  if (withChildren) {
    filtered = filtered.filter(person => people.find(
      child => child.mother === person.name
    ));
  }

  return filtered;
}

function averageAge(filteredArray) {
  const sumOfAge = filteredArray.reduce((prev, curr) => {
    const ages = curr.died - curr.born;

    return prev + ages;
  }, 0);

  return sumOfAge / filteredArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
