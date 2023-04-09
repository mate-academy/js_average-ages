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
  const men = people.filter(
    person => person.sex === 'm'
      && (!century || Math.ceil(person.died / 100) === century)
  );
  const sumAge = men.reduce(
    (sum, person) => sum + (person.died - person.born), 0
  );

  return sumAge / men.length;

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
  const women = people.filter(person => person.sex === 'f');
  const hasChildren = person => {
    return people.some(p => p.mother === person.name);
  };
  const womenWithChildren = withChildren ? women.filter(hasChildren) : women;
  const sumAge = womenWithChildren.reduce(
    (acc, cur) => acc + cur.died - cur.born, 0
  );

  return sumAge / womenWithChildren.length;
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
  let totalAgeDiff = 0;
  let numAgeDiffs = 0;

  for (let i = 0; i < people.length; i++) {
    const person = people[i];

    if (person.mother !== null && (!onlyWithSon || person.sex === 'm')) {
      const mother = people.find(p => p.name === person.mother);

      if (mother !== undefined) {
        totalAgeDiff += person.born - mother.born;
        numAgeDiffs++;
      }
    }
  }

  return totalAgeDiff / numAgeDiffs;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
