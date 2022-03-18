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
  const menAges = [];
  let sumAges = 0;

  if (century !== undefined) {
    people.map(person => {
      const age = person['died'] - person['born'];
      const diedCentury = Math.ceil(person['died'] / 100);

      if (person['sex'] === 'm' && diedCentury === century) {
        menAges.push(age);
      }
    });

    menAges.map((age) => {
      sumAges += age;
    });

    return (sumAges / menAges.length);
  }

  people.map(person => {
    const age = person['died'] - person['born'];

    if (person['sex'] === 'm') {
      menAges.push(age);
    }
  });

  menAges.map((age) => {
    sumAges += age;
  });

  return (sumAges / menAges.length);
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
  const result = [];
  let sumAges = 0;

  if (withChildren) {
    let mothersName = '';
    const isMother = [];
    const women = [];

    for (const obj of people) {
      if (obj.sex === 'f') {
        women.push(obj);
        mothersName = obj.name;

        if (people.some(person => person.mother === mothersName)) {
          isMother.push(obj.died - obj.born);
          sumAges += obj.died - obj.born;
        }
      }
    }

    return sumAges / isMother.length;
  }

  people.map(x => {
    const age = x['died'] - x['born'];

    if (x['sex'] === 'f') {
      result.push(age);
    }
  });

  for (const i of result) {
    sumAges += i;
  }

  return (sumAges / result.length);
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
  const potentialMothers = [];
  let agesSum = 0;
  const agesArray = [];

  potentialMothers.push(people.map(person => {
    if (person.sex === 'f') {
      potentialMothers.push(person);
    }
  }));

  if (onlyWithSon) {
    for (const woman of potentialMothers) {
      people.some(person => {
        if (person.sex === 'm' && person.mother === woman.name) {
          agesArray.push(person.born - woman.born);
          agesSum += person.born - woman.born;
        }
      });
    }

    return agesSum / agesArray.length;
  }

  for (const woman of potentialMothers) {
    people.some(person => {
      if (person.mother === woman.name) {
        agesArray.push(person.born - woman.born);
        agesSum += person.born - woman.born;
      }
    });
  }

  return agesSum / agesArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
