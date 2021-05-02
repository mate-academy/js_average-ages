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
  const isCenturySpecified = arguments.length > 1;

  const callback = (person) => {
    switch (isCenturySpecified) {
      case true:
        return Math.ceil(person.died / 100) === century
          ? [person.name, person.died - person.born]
          : null;

      case false:
        return [person.name, person.died - person.born];
    }
  };

  const maleData = people.filter((person) => person.sex === 'm').map(
    callback).filter(person => person !== null);

  return maleData.reduce(
    (sum, person) => person[1] + sum, 0) / maleData.length;
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
  // write code here
  const mothersData = new Set(people.map(person => {
    return person.mother;
  }));
  const hasChildren = arguments.length > 1;

  mothersData.delete(null);

  const callback = (person) => {
    switch (hasChildren) {
      case true:
        return mothersData.has(person.name)
          ? [person.name, person.died - person.born]
          : null;

      case false:
        return [person.name, person.died - person.born];
    }
  };

  const femaleData = people.filter((person) => person.sex === 'f').map(
    callback).filter(person => person !== null);

  return femaleData.reduce(
    (sum, person) => person[1] + sum, 0) / femaleData.length;
}

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
  // write code here
  const isOnlySonsSpecified = arguments.length > 1;

  const mothersBirthdayData = people.filter(
    human => human.sex === 'f').reduce((prev, person) => {
    return {
      ...prev,
      [person.name]: person.born,
    };
  }, {});

  const peopleMothersData = people.reduce((prev, person) => {
    switch (isOnlySonsSpecified) {
      case false:
        return person.mother in mothersBirthdayData
          ? [
            ...prev,
            [person.mother, mothersBirthdayData[person.mother], person.born],
          ]

          : prev;

      case true:
        return person.mother in mothersBirthdayData && person.sex === 'm'
          ? [
            ...prev,
            [person.mother, mothersBirthdayData[person.mother], person.born],
          ]

          : prev;
    }
  }, []);

  return peopleMothersData.reduce((sum, mother) => {
    return (mother[2] - mother[1]) + sum;
  }, 0) / peopleMothersData.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
