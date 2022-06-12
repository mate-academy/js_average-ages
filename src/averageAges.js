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
  const callbackFilter = (a) => (
    century === undefined
      ? a.sex === 'm'
      : a.sex === 'm'
      && Math.ceil(a.died / 100) === century
  );
  const callbackReduce = (sum, elem) => {
    return sum + (elem.died - elem.born);
  };
  const filterObjects = people.filter(callbackFilter);

  return filterObjects.reduce(callbackReduce, 0) / filterObjects.length;
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
  const callbackFilter = (a) => (
    withChildren === true
      ? people.find(isMother => isMother.mother === a.name)
      : a.sex === 'f'
  );
  const callbackReduce = (sum, elem) => {
    return sum + (elem.died - elem.born);
  };
  const filterObjects = people.filter(callbackFilter);

  return filterObjects.reduce(callbackReduce, 0) / filterObjects.length;
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
  const children
    = onlyWithSon === undefined
      ? people.filter(child =>
        child.mother !== null
      )

      : people.filter(child =>
        child.mother !== null && child.sex === 'm'
      );

  const differenceOfYears = [];

  for (let i = 0; i < children.length; i++) {
    const isMother = people.find(list => list.name === children[i].mother);

    if (isMother !== undefined) {
      differenceOfYears.push(children[i].born - isMother.born);
    }
  }

  const sumOfYears = differenceOfYears.reduce((prevYears, years) =>
    prevYears + years, 0);
  const getAvarege = Math.round(
    (sumOfYears / differenceOfYears.length) * 100)
    / 100;

  return getAvarege;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
