/* eslint-disable max-len */
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
  const men = people.filter(person =>
    (!century || Math.ceil(person.died / 100) === century) && person.sex === 'm'
  );

  const totalAge = men.reduce((sum, person) => sum + (person.died - person.born), 0);

  return totalAge / men.length;
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
  const filteredWomen = people.filter((person) =>
    person.sex === 'f' && (!withChildren || people.some((child) => child.mother === person.name))
  );

  const totalAge = filteredWomen.reduce((sum, woman) => sum + (woman.died - woman.born), 0);

  return totalAge / filteredWomen.length;
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
  const mothers = people.reduce((mothersArr, person) => {
    return people.some((child) => child.mother === person.name) ? [...mothersArr, person] : mothersArr;
  }, []);

  const children = people.filter(({ mother, sex }) => {
    return people.some(({ name }) => {
      return mother === name && (onlyWithSon ? sex === 'm' : true);
    });
  });

  const sumOfAges = children.reduce((sum, child) => {
    const mother = mothers.find((person) => person.name === child.mother);
    const diff = mother ? child.born - mother.born : 0;

    return sum + diff;
  }, 0) / children.length;

  return sumOfAges;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
