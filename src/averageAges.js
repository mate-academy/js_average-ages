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

function getPersonAge(people) {
  return people.map(person => person.died - person.born);
}

function countPersonAverage(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function calculateMenAverageAge(people, century) {
  const manFilter = people.filter(person => person.sex === 'm'
  && (century === undefined ? true : Math.ceil(person.died / 100) === century));

  const totalAge = getPersonAge(manFilter);

  return countPersonAverage(totalAge);
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
  const womanFilter = people.filter(person => {
    const peopleWithMotherName = people.some(man => man.mother === person.name);

    return person.sex === 'f'
    && (withChildren === undefined ? true : peopleWithMotherName);
  });

  const totalAge = getPersonAge(womanFilter);

  return countPersonAverage(totalAge);
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
  const mothersList = people.filter(person => {
    const manMotherName = people.some(man => man.mother === person.name);

    return (person.sex === 'f') && manMotherName;
  });

  const childrenList = people.filter(person => {
    const momName = mothersList.some(mother => person.mother === mother.name);

    return momName && (onlyWithSon === undefined ? true : person.sex === 'm');
  });

  const difference = childrenList.map((child) =>
    child.born - people.find((mother) => mother.name === child.mother).born);

  const age = countPersonAverage(difference);

  return age;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
