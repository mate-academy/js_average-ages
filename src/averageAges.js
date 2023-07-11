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

  const men = people.filter(person => person.sex === 'm');

  const menCentury = century
    ? men.filter(person => Math.ceil(person.died / 100) === century)
    : men;

  const menAge = menCentury.map(person => person.died - person.born);

  return getAverageSum(menAge);
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
  // write code here
  const women = people.filter(person => person.sex === 'f');

  const womenChild = withChildren
    ? women.filter(person => {
      return people.find(wom => person.name === wom.mother);
    })
    : women;

  const womenAge = womenChild.map(person => person.died - person.born);

  return getAverageSum(womenAge);
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

  const womenChild = people
    .filter(person => people.find(wom => person.name === wom.mother));

  const haveMother = people.filter(person => {
    return womenChild.find(ch => person.mother === ch.name);
  });

  const getHaveMother = onlyWithSon
    ? haveMother.filter(person => person.sex === 'm')
    : haveMother;

  const difference = getHaveMother.map(child => {
    const mother = womenChild.find(moth => moth.name === child.mother);

    return child.born - mother.born;
  });

  return getAverageSum(difference);
}

function getSum(items) {
  return items.reduce((sum, current) => sum + current, 0);
}

function getAverageSum(items) {
  return getSum(items) / items.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
