/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable quotes */
"use strict";

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
  const manArr = century
    ? people.filter(
        (item) => item.sex === "m" && Math.ceil(item.died / 100) === century
      )
    : people.filter((item) => item.sex === "m");

  const ages = manArr.map((item) => item.died - item.born);
  const sum = ages.reduce((acc, item) => acc + item, 0);

  return sum / ages.length;
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
  const womenArr = withChildren
    ? people.filter(
        (item) =>
          item.sex === "f" && people.some((el) => el.mother === item.name)
      )
    : people.filter((item) => item.sex === "f");
  const ages = womenArr.map((item) => item.died - item.born);
  const sum = ages.reduce((acc, item) => acc + item, 0);

  return sum / ages.length;
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
  const children = people.filter((child) =>
    onlyWithSon
      ? child.sex === "m" &&
        people.some((mother) => mother.name === child.mother)
      : people.some((mother) => mother.name === child.mother)
  );

  const sumAges = children.reduce((sum, child) => {
    const mother = people.find((person) => person.name === child.mother);
    const motherSon = child.born - mother.born;

    return sum + motherSon;
  }, 0);

  return sumAges / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
