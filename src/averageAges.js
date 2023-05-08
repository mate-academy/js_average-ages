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
function calculateMenAverageAge(people, century = 0) {
  let handledItemsCounter = 0;

  function check(elem, period) {
    if (century === 0) {
      return true;
    }

    return Math.ceil(elem.died / 100) === period;
  };

  const menAge = people.reduce((sum, el) => {
    if (el.sex === 'm' && check(el, century)) {
      handledItemsCounter++;

      return sum + (el.died - el.born);
    };

    return sum;
  }, 0);

  return menAge / handledItemsCounter;
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
function calculateWomenAverageAge(people, withChildren = false) {
  let handledItemsCounter = 0;
  let womenAge = 0;

  function check(elem, arg) {
    const haveKids = people.find(({ mother }) => mother === elem.name);

    if (!arg && elem.sex === 'f') {
      return true;
    }

    if (arg && elem.sex === 'f' && haveKids) {
      return true;
    }

    return false;
  };

  womenAge = people.reduce((sum, el) => {
    if (check(el, withChildren)) {
      handledItemsCounter++;

      return sum + (el.died - el.born);
    };

    return sum;
  }, 0);

  return womenAge / handledItemsCounter;
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

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let handledItemsCounter = 0;
  let diff = 0;

  function count(parent, item) {
    handledItemsCounter++;
    diff += item.born - parent.born;
  };

  people.forEach(person => {
    if (onlyWithSon && person.sex === 'f') {
      people.forEach(el => {
        if (el.mother === person.name && el.sex === 'm') {
          count(person, el);
        }
      });
    } else if (person.sex === 'f') {
      people.forEach(el => {
        if (el.mother === person.name) {
          count(person, el);
        }
      });
    };
  });

  return diff / handledItemsCounter;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
