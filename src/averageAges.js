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
  const validAgeRange = [];
  const filterFunction = (personGender, personDeathDate) => {
    const genderFilter = (gender) => gender === 'm';
    const centuryFilter = (death) => Math.ceil(death / 100) === century;

    return century
      ? genderFilter(personGender) && centuryFilter(personDeathDate)
      : genderFilter(personGender);
  };
  const validPeople = people.filter((person) => {
    return filterFunction(person.sex, person.died);
  });

  validPeople.forEach((person) => {
    validAgeRange.push(person.died - person.born);
  });

  const averageAge = validAgeRange.reduce((acc, curr) => {
    return acc + curr;
  }, 0) / validAgeRange.length;

  return averageAge;
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
  const validAgeRange = [];
  const filterFunction = (personGender, personName) => {
    const genderFilter = (gender) => gender === 'f';
    const isMother = (name) => people.some((person) => person.mother === name);

    return withChildren
      ? genderFilter(personGender) && isMother(personName)
      : genderFilter(personGender);
  };
  const validPeople = people.filter((person) => {
    return filterFunction(person.sex, person.name);
  });

  validPeople.forEach((person) => {
    validAgeRange.push(person.died - person.born);
  });

  const averageAge = validAgeRange.reduce((acc, curr) => {
    return acc + curr;
  }, 0) / validAgeRange.length;

  return averageAge;
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
  const validAgeRange = [];
  const findPerson = (name) => people.find((somebody) => {
    return somebody.name === name;
  });
  const filterFunction = (personMother, personGender) => {
    const hasMother = (mother) => !!mother && findPerson(mother);
    const isSon = (gender) => gender === 'm';

    return onlyWithSon
      ? hasMother(personMother) && isSon(personGender)
      : hasMother(personMother);
  };
  const validPeople = people.filter((person) => {
    return filterFunction(person.mother, person.sex);
  });

  validPeople.forEach((person) => {
    const mother = findPerson(person.mother);

    validAgeRange.push(person.born - mother.born);
  });

  const averageAge = validAgeRange.reduce((acc, curr) => {
    return acc + curr;
  }, 0) / validAgeRange.length;

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
