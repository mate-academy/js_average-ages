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
  const men = people.filter(person => {
    const isCentury = century ? Math.ceil(person.died / 100) === century : true;

    return person.sex === 'm' && isCentury;
  });

  const menAge = men.map(age);

  return menAge.reduce(ageSum) / menAge.length;
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
  const women = people.filter(person => {
    const isWithChildren = withChildren ? haveChildren(people, person) : true;

    return person.sex === 'f' && isWithChildren;
  });

  const womenAge = women.map(age);

  return womenAge.reduce(ageSum) / womenAge.length;
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
  const mothers = people.filter(person => {
    return person.sex === 'f' && haveChildren(people, person);
  });

  const motherDifferences = mothers.map(mother => {
    const children = people.filter(person => {
      const isFilter = onlyWithSon ? person.sex === 'm' : true;

      return isFilter && person.mother === mother.name;
    });

    return children.map(child => child.born - mother.born);
  });

  const result = motherDifferences.reduce(ageDiff, [0, 0]);

  return result[0] / result[1];
}

function age(person) {
  return person.died - person.born;
}

function ageSum(age1, age2) {
  return age1 + age2;
}

function haveChildren(people, woman) {
  return people.some(person => person.mother === woman.name);
}

function ageDiff(prev, curr) {
  prev[0] += curr.reduce((a, b) => a + b, 0);
  prev[1] += curr.length;

  return prev;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
