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
  const peopleDiedInCentury = people.filter(person => {
    return Math.ceil(person.died / 100) === century && person.sex === 'm';
  });

  const averageAgeDied = peopleDiedInCentury
    .map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / peopleDiedInCentury.length;

  const peopleMan = people.filter(person => person.sex === 'm')
    .map(person => person.died - person.born);

  const averageAge = +(peopleMan
    .reduce((a, b) => a + b, 0) / peopleMan.length).toFixed(2);

  const isCentury = century ? averageAgeDied : averageAge;

  return isCentury;
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
  const peopleWoman = people.filter(person => person.sex === 'f');

  const peopleMother = peopleWoman.filter(mother => people
    .some(person => person.mother === mother.name));

  const averageWoman = peopleWoman.map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / peopleWoman.length.toFixed(2);

  const averageMother = peopleMother.map(person => person.died - person.born)
    .reduce((a, b) => a + b, 0) / peopleMother.length.toFixed(2);

  return (withChildren && averageMother) || averageWoman;
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
  // write code here
  const peopleWoman = people.filter(person => person.sex === 'f');

  const peopleMother = peopleWoman.filter(mother => people
    .some(person => person.mother === mother.name));

  const peopleChild = people.filter(person => peopleMother
    .some(mother => mother.name === person.mother));

  const peopleSon = people.filter(person => peopleMother
    .some(mother => mother.name === person.mother) && person.sex === 'm');

  const averageAge = peopleChild
    .map(child => child.born - peopleMother
      .filter(person => person.name === child.mother)[0].born)
    .reduce((a, b) => a + b, 0) / peopleChild.length
    .toFixed(2);

  const averageAgeOnlySon = peopleSon
    .map(child => child.born - peopleMother
      .filter(person => person.name === child.mother)[0].born)
    .reduce((a, b) => a + b, 0) / peopleSon.length
    .toFixed(2);

  return (onlyWithSon && averageAgeOnlySon) || averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
