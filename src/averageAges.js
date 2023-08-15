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
  let arrayOfAgeMan;
  let avgYear = 0;
  const parameter = century;

  parameter
    ? arrayOfAgeMan = people.filter((man) =>
      man.sex === 'm' && Math.ceil(man.died / 100) === century)
      .map((year) => year.died - year.born)

    : arrayOfAgeMan = people.filter((man) => man.sex === 'm')
      .map((year) => year.died - year.born);

  avgYear = (arrayOfAgeMan.reduce((sum, index) =>
    sum + index)) / arrayOfAgeMan.length;

  return +avgYear.toFixed(2);
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
  let arrayOfAgeWoman;
  let avgYear = 0;
  const parameter = withChildren;

  parameter
    ? arrayOfAgeWoman = people.filter((woman) => woman.sex === 'f' && people
      .find(person => woman.name === person.mother))
      .map((woman) => woman.died - woman.born)

    : arrayOfAgeWoman = people.filter((woman) => woman.sex === 'f')
      .map((woman) => woman.died - woman.born);

  avgYear = (arrayOfAgeWoman.reduce((sum, index) =>
    sum + index)) / arrayOfAgeWoman.length;

  return +avgYear.toFixed(2);
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
  const motherBirthYears = new Map();
  
  for (const person of people) {
    if (person.sex === 'f') {
      motherBirthYears.set(person.name, person.born);
    }
  }

  const filteredPeople = people.filter((person) =>
    onlyWithSon
      ? person.sex === 'm' && motherBirthYears.has(person.mother)
      : motherBirthYears.has(person.mother)
  );

  const ageDifferences = filteredPeople.map(
    (person) => person.born - motherBirthYears.get(person.mother)
  );

  return (
    ageDifferences.reduce((acc, age) => acc + age, 0) / ageDifferences.length
  );
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
