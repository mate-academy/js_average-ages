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

const calculateAvarageAge = (people) => {
  const calculateAllAges = people
    .map((person) => person.died - person.born)
    .reduce((prev, curr) => prev + curr);

  return calculateAllAges / people.length;
};

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
      : true));

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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  const isMother = (name) => {
    return people.some(human => onlyWithSon
      ? human.sex === 'm' && human.mother === name
      : human.mother === name);
  };

  const isChild = (person) => {
    return mothers.some(human => onlyWithSon
      ? human.name === person.mother && person.sex === 'm'
      : human.name === person.mother);
  };

  const findFamilyYearDiff = (mothersArr, motherName, childBorn) => {
    return childBorn - mothersArr.find(mom => motherName === mom.name).born;
  };

  const mothers = people.filter(({ name }) => isMother(name));

  const children = people.filter((person) => isChild(person));

  const diffAverage = (children
    .map(({ born, mother }) => findFamilyYearDiff(mothers, mother, born))
    .reduce((prev, curr) => prev + curr)) / children.length;

  return diffAverage;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
