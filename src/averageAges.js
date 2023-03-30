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
  let peopleNew = [];
  let count = 0;

  function callback(arr) {
    return (Math.ceil(arr.died / 100) === century);
  };

  if (century !== undefined) {
    peopleNew = people.filter(callback);
  } else {
    peopleNew = people;
  }

  peopleNew = peopleNew.filter((arr) => (arr.sex === 'm'));

  function callbackSum(summa, n) {
    return (summa + n.died - n.born);
  }

  count = peopleNew.reduce(callbackSum, 0);

  return Number((count / peopleNew.length).toFixed(2));
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
  let peopleNew = [];
  let count = 0;
  let mother = '';

  if (withChildren === true) {
    for (const i of people) {
      mother = i.mother;

      if (people.find(callback)) {
        if (peopleNew.find((arr) => (arr.name === mother))) {
        } else {
          peopleNew.push({ ...people.find(callback) });
        }
      }
    }
  } else {
    peopleNew = people.filter((arr) => (arr.sex === 'f'));
  }

  function callback(arr) {
    return (arr.name === mother);
  };

  function callbackSum(summa, n) {
    return (summa + n.died - n.born);
  }

  count = peopleNew.reduce(callbackSum, 0);

  return Number((count / peopleNew.length).toFixed(2));
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
  const peopleNew = [];
  let count = 0;
  let mother = '';
  let bornChildren = 0;
  let peopleNew2 = {};

  if (onlyWithSon === true) {
    for (const i of people) {
      mother = i.mother;
      bornChildren = i.born;

      if (i.sex === 'm') {
        if (people.find(callback)) {
          peopleNew2 = people.find(callback);
          peopleNew2.bornChildren = bornChildren;
          peopleNew.push({ ...peopleNew2 });
        }
      }
    }
  } else {
    for (const i of people) {
      mother = i.mother;
      bornChildren = i.born;

      if (people.find(callback)) {
        peopleNew2 = people.find(callback);
        peopleNew2.bornChildren = bornChildren;
        peopleNew.push({ ...peopleNew2 });
      }
    }
  }

  function callback(arr) {
    return (arr.name === mother);
  };

  function callbackSum(summa, n) {
    return (summa + n.bornChildren - n.born);
  }

  count = peopleNew.reduce(callbackSum, 0);

  return Number((count / peopleNew.length).toFixed(2));
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
