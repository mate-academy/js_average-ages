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
function summAgeFunction(humans) {
  return humans.reduce(
    function(accumulatorAge, person) {
      return accumulatorAge + person.died - person.born;
    },
    0);
};

function calculateMenAverageAge(people, century = 0) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  function checkCentryDied(person) {
    return century === 0
      ? true
      : Math.ceil(person.died / 100) === century;
  }

  const checkForMen = (person) => person.sex === 'm';

  const men = people.filter((person) => {
    return checkForMen(person) && checkCentryDied(person);
  });

  const amountMen = men.length;

  const summAge = summAgeFunction(men);

  return +(summAge / amountMen).toFixed(2);
}

// done
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
  const checkForWoMen = (person) => person.sex === 'f';

  function checkForMother(person) {
    return people.some((child) => person.name === child.mother);
  }

  function doWeNeedMothers(check, person) {
    return (!check ? true : checkForMother(person));
  }

  const women = people.filter((person) => {
    return checkForWoMen(person) && doWeNeedMothers(withChildren, person);
  });

  const amountMen = women.length;

  const summAge = summAgeFunction(women);

  return +(summAge / amountMen).toFixed(2);
  // write code here
}

// done

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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  const filteredKid = people.filter(({ mother, sex }) => onlyWithSon
    ? people.some(person => person.name === mother) && sex === 'm'
    : people.some(person => person.name === mother)
  );
  const summAgeDiff = filteredKid.reduce(
    function(accumulatorAge, kid) {
      const mothers = people.find(mother => mother.name === kid.mother);

      return accumulatorAge + (+kid.born) - (+mothers.born);
    },
    0);

  const amountKid = filteredKid.length;

  return +(summAgeDiff / amountKid).toFixed(2);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
