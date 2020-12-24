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
  let arrAges = [];
  let averageAge = [];
  const man = people.filter(el => el.sex === 'm');

  if (century === undefined) {
    arrAges = man.map(el => el.died - el.born);
    averageAge = arrAges.reduce((a, b) => a + b) / man.length;
  } else {
    const centuryMen = man.filter(el =>
      century === Math.ceil(el.died / 100));

    arrAges = centuryMen.map(el => el.died - el.born);
    averageAge = arrAges.reduce((a, b) => a + b) / centuryMen.length;
  }

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let arrAges = [];
  let averageAge = [];
  const women = people.filter(el => el.sex === 'f');

  if (withChildren === false || withChildren === undefined) {
    arrAges = women.map(el => el.died - el.born);
    averageAge = arrAges.reduce((a, b) => a + b) / women.length;
  }

  if (withChildren) {
    const mothers = women.filter(el =>
      people.some(person => person.mother === el.name));

    arrAges = mothers.map(el => el.died - el.born);
    averageAge = arrAges.reduce((a, b) => a + b) / mothers.length;
  }

  return averageAge;
};
/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  let averageAge;
  let differentAge;
  const women = people.filter(el => el.sex === 'f');
  const mothers = women.filter(el =>
    people.some(person => person.mother === el.name));
  const children = people.filter(el =>
    mothers.some(m => m.name === el.mother));

  if (!onlyWithSon) {
    differentAge = children.map(ch => {
      const diff = ch.born - mothers.find(m => m.name === ch.mother).born;

      return diff;
    });

    averageAge = differentAge.reduce((a, b) => a + b) / children.length;
  }

  if (onlyWithSon === true) {
    const sons = children.filter(ch => ch.sex === 'm');
    const mothersWithSon = mothers.filter(m =>
      sons.some(s => s.mother === m.name));

    differentAge = sons.map(ch => {
      const diff = ch.born - mothersWithSon.find(m =>
        m.name === ch.mother).born;

      return diff;
    });

    averageAge = differentAge.reduce((a, b) => a + b) / sons.length;
  }

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
