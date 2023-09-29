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
  const maleFiltered = people.filter((person) => person.sex === 'm'
    && (century ? Math.ceil(person.died / 100) === century : true));

  const maleAge = maleFiltered.map((person) => person.died - person.born);

  return countAverageAge(maleAge);
}

// function countAverageAge(ages) {
//   const avarageAge = ages.reduce((totalAge, age) =>
//     totalAge + age, 0) / ages.length;

//   return avarageAge;
// }

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
  const averageAgeWoman = people
    .filter(({ sex, name }) => withChildren
      ? isFemale(sex) && people.some(child => child.mother === name)
      : isFemale(sex)
    )
    .map((getAge) => getAge.died - getAge.born);

  const averagAge = countAverageAge(averageAgeWoman);

  return averagAge;
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
  const ageDifference = people
    .filter(({ mother, sex }) => onlyWithSon
      ? people.some(child => child.name === mother && isMale(sex))
      : people.some(child => child.name === mother)
    )
    .map((child) => {
      const mother = people.find((mothers) => mothers.name === child.mother);

      return child.born - mother.born;
    });

  const averagAge = countAverageAge(ageDifference);

  return averagAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};

function countAverageAge(averageValue) {
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
