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
  let result = 0;
  const avAge = 0;
  const man = people.filter(el => (el.sex === 'm'));

  let menAvAge = man.reduce(
    (accum, curr) => accum + (curr.died - curr.born),
    avAge);

  menAvAge /= man.length;

  const centuryMan = man.filter(
    el => (Math.ceil(el.died / 100) === century)
  );
  let centuryManAverage = centuryMan.reduce(
    (accum, curr) => accum + (curr.died - curr.born),
    avAge);

  centuryManAverage /= centuryMan.length;

  (century === undefined) ? result = menAvAge : result = centuryManAverage;

  return result;
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
  let result = 0;
  const avAge = 0;
  const woman = people.filter(el => (el.sex === 'f'));
  let womanAvAge = woman.reduce(
    (accum, curr) => accum + (curr.died - curr.born),
    avAge);

  womanAvAge /= woman.length;

  function isMother(e) {
    const motherCheck = people.find(el => e.name === el.mother);

    return motherCheck !== undefined;
  }

  const mothers = woman.filter(isMother, woman);

  let mothersAvAge = mothers.reduce(
    (accum, curr) => accum + (curr.died - curr.born),
    avAge);

  mothersAvAge /= mothers.length;

  (withChildren === undefined) ? result = womanAvAge : result = mothersAvAge;

  return result;
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
  let result = 0;
  const def = 0;
  let allChilds;
  const all = people.filter((e) => {
    const a = people.find(el => e.mother === el.name);

    if (a !== undefined) {
      return e;
    }
  });

  const allSons = people.filter((e) => {
    const a = people.find(el => (e.mother === el.name) && (e.sex === 'm'));

    if (a !== undefined) {
      return e;
    }
  });

  (onlyWithSon === undefined) ? allChilds = all : allChilds = allSons;

  const ageDiffArr = allChilds.map((e) => {
    const a = people.find(el => e.mother === el.name);

    return e.born - a.born;
  });

  const ageDiff = ageDiffArr.reduce((prev, next) => prev + next, def);

  const ageDiffChilds = ageDiff / allChilds.length;

  result = ageDiffChilds;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
