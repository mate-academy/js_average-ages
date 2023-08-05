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
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  let avgOfDeathForMen = 0;
  const menOfDesiredAge = people.filter((person) => {
    const men = person.sex === 'm';
    const menOfCentury = men && Math.ceil(person.died / 100) === century;

    return century !== undefined ? menOfCentury : men;
  });

  const ageOfLife = menOfDesiredAge.map(person => {
    const ageOfDeath = person.died - person.born;

    return menOfDesiredAge ? ageOfDeath : 0;
  });

  const sumAge = ageOfLife.reduce((years, age) => {
    return years + age;
  });

  avgOfDeathForMen = Math.round(sumAge / menOfDesiredAge.length * 100) / 100;

  return avgOfDeathForMen;
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
  let avgOfDeathForWomen = 0;

  const womenOfDesiredAge = people.filter(person => {
    const mother = people.some(el => el.mother === person.name);
    const women = person.sex === 'f';

    return withChildren !== undefined ? mother : women;
  });

  // skopiowano z funkcji powyżej

  const ageOfLife = womenOfDesiredAge.map(person => {
    const ageWomen = person.died - person.born;

    return womenOfDesiredAge ? ageWomen : 0;
  });

  const sumAge = ageOfLife.reduce((years, age) => {
    return years + age;
  });

  avgOfDeathForWomen = Math.round(sumAge / womenOfDesiredAge.length * 100)
  / 100;

  return avgOfDeathForWomen;
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
  // 1. find a mother of each person (or only for men)
  // 2. keep people who have mothers in the array
  // 3. calculate the difference child.born - mother.born
  // 4. return the average value

  let avgAge = 0;
  let sumAge = 0;

  const kids = people.filter(person => {
    const child = people.find(v => person.mother === v.name);
    const onlySons = people.find(v => person.mother === v.name
      && person.sex === 'm');

    return onlyWithSon !== undefined ? onlySons : child;
  });

  const yearsOfLife = kids.map(person => {
    const mother = people.find(v => person.mother === v.name);

    return mother ? person.born - mother.born : 0;
  });

  sumAge = yearsOfLife.reduce((acc, item) => acc + item);

  avgAge = Math.round((sumAge / yearsOfLife.length) * 100) / 100;

  return avgAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
