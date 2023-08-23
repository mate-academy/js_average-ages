'use strict';
/*
 * @param {object[]} people
 * @param {number} century
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  const averageAgeMan = people
    .filter((person) => century ? isMale(person.sex)
    && Math.ceil(person.died / 100) === century : isMale(person.sex))
    .map((getAge) => getAge.died - getAge.born);

  const averagAge = averageAges(averageAgeMan);

  return averagAge;
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const averageAgeWoman = people
    .filter(({ sex, name }) => {
      return withChildren ? isFemale(sex)
      && people.some(child => child.mother === name)
        : isFemale(sex);
    })
    .map((getAge) => getAge.died - getAge.born);

  const averagAge = averageAges(averageAgeWoman);

  return averagAge;
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon
 *
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const ageDiff = people
    .filter(({ mother, sex }) => {
      return onlyWithSon ? people.some(child => child.name === mother
        && isMale(sex))
        : people.some(child => child.name === mother);
    })
    .map((child) => {
      const mother = people.find((mothers) => mothers.name === child.mother);

      return child.born - mother.born;
    });

  const averagAge = averageAges(ageDiff);

  return averagAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

function averageAges(averageValue) {
  const average = averageValue
    .reduce((sum, age) => sum + age, 0);

  const result = average / averageValue.length;

  return +result.toFixed(2);
}

function isFemale(female) {
  return female === 'f';
}

function isMale(male) {
  return male === 'm';
}
