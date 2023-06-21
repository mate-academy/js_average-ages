/*eslint-disable */
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
function calculateMenAverageAge(people, century = 0) {
  const mens = people.filter((human) => human.sex === "m");

  const filtered = century
    ? mens
        .filter((item) => {
          return Math.ceil(item.died / 100) === century;
        })
        .map(({ died, born }) => {
          return died - born;
        })
    : mens.map(({ died, born }) => {
        return died - born;
      });

  const sum = filtered.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);

  return sum / filtered.length;
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
function calculateWomenAverageAge(people, withChildren = 0) {
  const women = people
    .filter((human) => {
      const female = human.sex === "f";
      const isWithChild = people.some((item) => item.mother === human.name);

      if (withChildren) {
        return female && isWithChild;
      } else {
        return female;
      }
    })
    .map(({ died, born }) => {
      return died - born;
    });

  const womenAverage = women.reduce((acc, cur) => {
    return (acc += cur);
  }, 0);

  return womenAverage / women.length;
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
  if (onlyWithSon) {
    const filteredPeople = people.filter((person) => {
      return person.sex === "m";
    });

    const ageDifferences = filteredPeople.map((person) => {
      const mother = people.find((mom) => {
        return person.mother === mom.name;
      });

      if (mother) {
        return person.born - mother.born;
      }

      return null;
    });

    const filteredAgeDiffs = ageDifferences.filter((ageDif) => {
      return ageDif !== null;
    });

    const totalAgeDifferences = filteredAgeDiffs.reduce((previous, current) => {
      return previous + current;
    }, 0);

    return totalAgeDifferences / filteredAgeDiffs.length;
  } else {
    const ageDifferences = people.map((person) => {
      const mother = people.find((mom) => {
        return person.mother === mom.name;
      });

      if (mother) {
        return person.born - mother.born;
      }

      return null;
    });

    const filteredAgeDiffs = ageDifferences.filter((ageDif) => {
      return ageDif !== null;
    });

    const totalAgeDifferences = filteredAgeDiffs.reduce((previous, current) => {
      return previous + current;
    }, 0);

    return totalAgeDifferences / filteredAgeDiffs.length;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
