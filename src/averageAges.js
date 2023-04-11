'use strict';

function calculateAverageAge(people) {
  let average = 0;

  const func = function(person) {
    average += (person.died - person.born);

    return true;
  };

  people.every(func);

  return (average / people.length);
}

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
  // avoid using loop and forEach <= Hi, the checklist contradicts this
  // replace `if ()` statement with &&, || or ?: <= I quite honestly think I'm
  //                                                too stupid for this, I do
  //                                                not understand
  // without nesting

  let men = people.filter((person) => person.sex === 'm');

  if (century !== undefined) {
    men = men.filter((person) => Math.ceil(person.died / 100) === century);
  }

  return calculateAverageAge(men);
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
  let women = people.filter((person) => person.sex === 'f');

  if (withChildren === true) {
    women = women.filter((person) =>
      people.find((el) =>
        el.mother === person.name));
  }

  return calculateAverageAge(women);
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
  const mothers = [];
  let kids = [];

  const func = function(person) {
    if (people.find((el) => person.mother === el.name)) {
      mothers.push(people.find((el) => person.mother === el.name));

      return true;
    }

    return false;
  };

  const alternateFunc = function(person) {
    if (person.sex === 'f') {
      return false;
    }

    if (people.find((el) => person.mother === el.name)) {
      mothers.push(people.find((el) => person.mother === el.name));

      return true;
    }

    return false;
  };

  const getAverage = function(total, person) {
    const mom = mothers.find((el) => person.mother === el.name);

    return total + (person.born - mom.born);
  };

  if (onlyWithSon === true) {
    kids = people.filter(alternateFunc);
  } else {
    kids = people.filter(func);
  }

  return kids.reduce(getAverage, 0) / kids.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
