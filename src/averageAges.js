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

function averageAge(func, array) {
  const filteredArray = array.filter(func);
  const agesArray = filteredArray.map((person) => person.died - person.born);

  return agesArray.reduce((prev, age) => (
    prev + age
  ), 0) / agesArray.length;
}

function calculateMenAverageAge(people, century) {
  let result = 0;

  !century
    ? result = averageAge((person) => (person.sex === 'm'), people)
    : result = averageAge((person) => (
      person.sex === 'm' && Math.ceil(person.died / 100) === century
    ), people
    );

  return result;
};

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
  let result = 0;

  !withChildren
    ? result = averageAge((person) => (person.sex === 'f'), people)
    : result = averageAge((person) => (
      person.sex === 'f' && people.some((children) => (
        person.name === children.mother
      ))
    ), people);

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
  const childrensArray = people.filter((person) => {
    let hasMother = {};

    !onlyWithSon
      ? hasMother = people.some((perent) => person.mother === perent.name)
      : hasMother = people.some((perent) => (
        person.mother === perent.name && person.sex === 'm'
      ));

    return hasMother;
  });

  const agesArray = childrensArray.map((person) => {
    const ageDifference = person.born - (people.find((mother) => (
      person.mother === mother.name
    )).born);

    return ageDifference;
  });

  return agesArray.reduce((prev, age) => prev + age) / agesArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
