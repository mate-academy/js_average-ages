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
  const allMen = people.filter((person) => person.sex === 'm');
  const menFromThisCentury = century === undefined
    ? allMen
    : allMen.filter((man) => Math.ceil(man.died / 100) === century);

  const menAge = menFromThisCentury.map((man) => man.died - man.born);
  const sumOfMenAges = menAge.reduce((result, age) => result + age, 0);

  return sumOfMenAges / menAge.length;
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
  const allWomen = people.filter((person) => person.sex === 'f');
  const womenWithChildren = withChildren === undefined
    ? allWomen
    : allWomen.filter((woman) =>
      people.some((child) => child.mother === woman.name));

  const womenAge = womenWithChildren.map((woman) => woman.died - woman.born);
  const sumOfWomenAges = womenAge.reduce((result, age) => result + age, 0);

  return sumOfWomenAges / womenAge.length;
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
  const allChildrenOrSons = onlyWithSon === undefined
    ? people
    : people.filter((person) => person.sex === 'm');
  const childrenWithMother = allChildrenOrSons.filter((child) =>
    people.some((person) => person.name === child.mother));

  const ageDifferences = childrenWithMother.map((child) => {
    const childMother = people.find((person) => person.name === child.mother);

    return child.born - childMother.born;
  });

  const sumOfAgeDifferences = ageDifferences.reduce((result, age) =>
    result + age, 0);

  return sumOfAgeDifferences / ageDifferences.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
