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
 *
 * @return {number}
 * @param year
 */

const getCentury = year => Math.floor((year + 99) / 100);
const getAge = (born, died) => died - born;
const getAverageAge = (arr) => {
  return arr.reduce((years, { born, died }) => years
      + getAge(born, died), 0)
    / arr.length;
};
const getGender = (gender) => {
  return ({ sex }) => sex === gender;
};

function calculateMenAverageAge(people, century) {
  const allMen = people.filter(getGender('m'));
  let menToCountAverageAge = [];

  !century
    ? menToCountAverageAge = allMen
    : menToCountAverageAge = allMen.filter(({ died }) => {
      return getCentury(died) === century;
    });

  return getAverageAge(menToCountAverageAge);
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
  const allWomen = people.filter(getGender('f'));
  let womenToCountAverageAge = [];

  withChildren
    ? womenToCountAverageAge = allWomen
      .filter(({ name }) => {
        return people.some(({ mother }) => {
          return name === mother;
        });
      })
    : womenToCountAverageAge = allWomen;

  return getAverageAge(womenToCountAverageAge);
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
  const allWomen = people.filter(getGender('f'));
  const womenWithChildren = allWomen
    .filter(({ name }) => {
      return people.some(({ mother }) => {
        return name === mother;
      });
    });

  let childrenToProcess = [];

  !onlyWithSon
    ? childrenToProcess = people
      .filter(({ mother }, _, arr) => {
        return arr.some(({ name }) => {
          return name === mother;
        });
      })
    : childrenToProcess = people
      .filter(({ mother, sex }, _, arr) => {
        return (arr.some(({ name }) => {
          return name === mother;
        })) && sex === 'm';
      });

  const agesOfBirth = childrenToProcess.map(({ mother, born }) => {
    return born - womenWithChildren
      .find(({ name }) => mother === name).born;
  });

  return agesOfBirth.reduce((sum, age) => sum + age, 0) / agesOfBirth.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
