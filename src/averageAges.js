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
  const men = people.filter(({ sex, died }) => sex === 'm'
    && (century
      ? Math.ceil(died / 100) === century
      : true
    ));

  return calculateAvarageAge(men);
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
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
  const women = people.filter(({ sex, name }) => sex === 'f'
  && (withChildren
    ? people.some(person => person.mother === name)
    : true
  ));

  return calculateAvarageAge(women);
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
  const mothers = people.filter((person) => {
    return people.some((child) => child.mother === person.name);
  });

  const children = people.filter((child) => {
    const onlySon = onlyWithSon
      ? child.sex === 'm'
      : true;

    return onlySon && people.some((mother) => {
      return child.mother === mother.name;
    });
  });

  const ageDifference = children.map((child) => {
    return child.born - mothers.find(
      (person) => person.name === child.mother).born;
  });

  return countAverageAge(ageDifference);
}

function countAverageAge(ageArr) {
  const averageAge = ageArr.reduce((totalAges, age) => {
    return totalAges + age;
  }, 0) / ageArr.length;

  return averageAge;
}

function calculateAvarageAge(people) {
  const calculateAllAges = people
    .map((person) => person.died - person.born)
    .reduce((prev, curr) => prev + curr);

  return calculateAllAges / people.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
