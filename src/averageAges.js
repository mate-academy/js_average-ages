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
  const men = people.filter(person => person['sex'] === 'm');
  let amountOfexistence = 0;
  let amountOfPeople = men.length;

  amountOfexistence = men.reduce((sum, manData) => (manData['died']
   - manData['born'] + sum), 0);

  if (century) {
    const menOfDefinedCentury = men.filter(person => Math.ceil(person['died']
     / 100) === century);

    amountOfexistence = menOfDefinedCentury.reduce((sum, person) =>
      (person['died'] - person['born'] + sum), 0);
    amountOfPeople = menOfDefinedCentury.length;
  }

  const res = amountOfexistence / amountOfPeople;

  return res;
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
  const women = people.filter(x => x['sex'] === 'f');
  let amountOfexistence = 0;
  let amountOfWomen = women.length;

  amountOfexistence = women.reduce((sum, person) =>
    (person['died'] - person['born'] + sum), 0);

  const peopleHaveMother = people.map(person => person['mother']);

  const womenHaveChildren = women.filter(woman =>
    peopleHaveMother.includes(woman['name']));

  if (withChildren) {
    amountOfexistence = womenHaveChildren.reduce((sum, woman) =>
      (woman['died'] - woman['born'] + sum), 0);

    amountOfWomen = womenHaveChildren.length;
  }

  const res = amountOfexistence / amountOfWomen;

  return res;
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
  const children = people.filter(person =>
    person['mother']).filter(person => person !== null);

  const mothersArr = people.map(person => person['mother']);
  const mothers = people.filter(person => mothersArr.includes(person['name']));
  let countOfpeople = 0;
  let result = 0;

  if (!onlyWithSon) {
    const amountOfDifferAges = children.reduce((previousValue, child) => {
      const mother = mothers.find((mom) => {
        if (mom['name'] === child['mother']) {
          return mom;
        }
      });

      let sum = previousValue;

      if (mother !== undefined) {
        sum += child['born'] - mother['born'];
        countOfpeople++;
      }

      return sum;
    }, 0);

    result = amountOfDifferAges / countOfpeople;
  }

  if (onlyWithSon) {
    const men = people.filter(person => person['sex'] === 'm');
    const boys = men.filter(y => y['mother']).filter(person => person !== null);
    let boysCount = 0;

    const amountOfDifferAges = boys.reduce((previousValue = 0, child) => {
      const mother = mothers.find((mom) => {
        if (mom['name'] === child['mother']) {
          return mom;
        }
      });

      let sum = previousValue;

      if (mother !== undefined) {
        sum += child['born'] - mother['born'];
        boysCount++;
      }

      return sum;
    }, 0);

    result = amountOfDifferAges / boysCount;
  }

  return result;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
