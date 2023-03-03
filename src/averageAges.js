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
  const allMen = !century
    ? setGender(people, 'm')
    : setGender(people, 'm')
      .filter(person => (Math.ceil(person.died / 100)) === century);

  return averageAge(allMen);

  // write code here
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
  const womens = !withChildren
    ? setGender(people, 'f')
    : setGender(people, 'f')
      .filter(person => people.some(child => child.mother === person.name));

  return averageAge(womens);
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
  const allChild = (!onlyWithSon)
    ? people.filter(child => people
      .some(women => women.name === child.mother))
    : setGender(people, 'm').filter(child => people
      .some(women => women.name === child.mother));

  const childWithMotherBorn = allChild.map(child => {
    child.motherBorn = people.find(women => women.name === child.mother).born;

    return child;
  });

  const ageDifference = childWithMotherBorn
    .map(child => child.born - child.motherBorn);

  return ageDifference.reduce((sum, age) => sum + age) / ageDifference.length;
}

// Some auxiliary function

function averageAge(people) {
  return people.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / people.length;
}

function setGender(people, sex) {
  return people.filter(person => person.sex === sex);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
