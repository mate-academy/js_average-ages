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
  const menArray = people.filter((p) => p.sex === 'm');

  const menArrayFilteredByCentury = menArray.reduce((acc, m) => {
    const manCenturyDied = Math.ceil(m.died / 100);

    return century === manCenturyDied ? [...acc, m] : acc;
  }, []);

  const menArr = century ? menArrayFilteredByCentury : menArray;

  const sumAges = menArr.reduce((acc, m) => {
    return acc + (m.died - m.born);
  }, 0);

  const result = menArr.length === 0 ? 0 : sumAges / menArr.length;

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
  const women = people.filter((p) => p.sex === 'f');

  const mothersNames = people.reduce((acc, child) => {
    const isDouble = acc.some((name) => name === child.mother);

    return !isDouble ? [...acc, child.mother] : acc;
  }, []);

  const mothers = mothersNames.reduce((acc, name) => {
    const mother = women.find((p) => p.name === name);

    return mother ? [...acc, mother] : acc;
  }, []);

  const womenArr = withChildren ? mothers : women;

  const sumAges = womenArr.reduce((acc, w) => {
    return acc + (w.died - w.born);
  }, 0);

  const result = womenArr.length === 0 ? 0 : sumAges / womenArr.length;

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
  const children = people.filter((p) => p.mother !== null);
  const sons = children.filter((p) => p.sex === 'm');

  const childrenArr = onlyWithSon ? sons : children;

  const childrenRes = childrenArr.reduce((acc, child) => {
    const mother = people.find((p) => p.name === child.mother);

    const diff = mother ? child.born - mother.born : 0;

    const childWithDiffAge
      = diff !== 0
        ? {
          ...child,
          ageDiff: diff,
        }
        : null;

    return childWithDiffAge ? [...acc, childWithDiffAge] : acc;
  }, []);

  const sumAgeDiff = childrenRes.reduce((acc, child) => acc + child.ageDiff, 0);

  const result = childrenRes.length === 0 ? 0 : sumAgeDiff / childrenRes.length;

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
