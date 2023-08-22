'use strict';

const MAN = 'm';
const WOMAN = 'f';
/**
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(({ sex }) => sex === MAN);
  const menFromThisCentury = century
    ? allMen.filter(({ died }) => Math.ceil(died / 100) === century)
    : allMen;

  const sumOfMenAges = menFromThisCentury.reduce(
    (result, { died, born }) => result + (died - born), 0
  );

  return sumOfMenAges / menFromThisCentury.length;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const allWomen = people.filter(({ sex }) => sex === WOMAN);
  const womenWithChildren = withChildren
    ? allWomen.filter(({ name }) =>
      people.some(({ mother }) => mother === name)
    )
    : allWomen;

  const sumOfWomenAges = womenWithChildren.reduce(
    (result, { died, born }) => result + (died - born),
    0
  );

  return sumOfWomenAges / womenWithChildren.length;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const allChildrenOrSons = onlyWithSon
    ? people.filter(({ sex }) => sex === MAN)
    : people;
  const childrenWithMother = allChildrenOrSons.filter(({ mother }) =>
    people.some(({ name }) => name === mother)
  );

  const sumOfAgeDifferences = childrenWithMother.reduce((result, child) => {
    const childMother = people.find(({ name }) => name === child.mother);

    return result + (child.born - childMother.born);
  }, 0);

  return sumOfAgeDifferences / childrenWithMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
