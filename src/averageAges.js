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
  const men = people.filter(p => p.sex === 'm');
  let menDiedInPassedCentury = men;

  if (arguments.length > 1) {
    menDiedInPassedCentury = men.filter(
      m => Math.ceil(m.died / 100) === century
    );
  }

  const totalAge = menDiedInPassedCentury.reduce(
    (a, b) => a + (b.died) - (b.born), 0
  );

  return totalAge / menDiedInPassedCentury.length;
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
  const women = people.filter(p => p.sex === 'f');
  let womenWithChildren = women;

  if (arguments.length > 1 && withChildren) {
    const mothers = people.map(m => m.mother);

    womenWithChildren = women.filter(w => mothers.includes(w.name));
  }

  const totalAge = womenWithChildren.reduce((a, b) => a + (b.died - b.born), 0);

  return totalAge / womenWithChildren.length;
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
  const ageDiffs = people.map(
    p1 => {
      const mother = people.find(
        p2 => {
          if (onlyWithSon) {
            return p1.mother === p2.name && p1.sex === 'm';
          } else {
            return p1.mother === p2.name;
          }
        }
      );

      if (mother) {
        return p1.born - mother.born;
      }
    }
  ).filter(a => a !== undefined);

  const totalAge = ageDiffs.reduce((a, b) => a + b, 0);

  return totalAge / ageDiffs.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
