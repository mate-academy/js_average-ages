'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death  by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const menFilterByCentury = (person) => {
    return Math.ceil(person.died / 100) === century && person.sex === 'm';
  };

  const filterByGender = (person) => {
    return person.sex === 'm';
  };

  const filteredMen = people.filter(
    century ? menFilterByCentury : filterByGender
  );

  return filteredMen.reduce((prevPerson, nextPerson, index, array) => {
    return (prevPerson + (nextPerson.died - nextPerson.born) / array.length);
  }, 0);
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
  const filterByGender = person => person.sex === 'f';

  const filterMotherWithChildren = mother => people.some(
    child => child.mother === mother.name
  );

  const filteredWoman = people.filter(
    withChildren ? filterMotherWithChildren : filterByGender
  );

  return filteredWoman
    .reduce((prevPerson, nextPerson, index, array) => {
      return (prevPerson + (nextPerson.died - nextPerson.born) / array.length);
    }, 0);
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
  const children = person => people.some(
    mother => person.mother === mother.name
  );

  const onlySon = child => child.sex === 'm' && people.some(
    mother => child.mother === mother.name
  );

  const filteredWoman = people.filter(
    onlyWithSon ? onlySon : children
  );

  const ageOfMathers = filteredWoman.map(
    child => child.born - people.find(
      mother => mother.name === child.mother
    ).born
  );

  return ageOfMathers.reduce((prevPerson, nextPerson, index, array) => {
    return (prevPerson + nextPerson / array.length);
  }, 0);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
