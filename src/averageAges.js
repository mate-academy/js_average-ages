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
  const mens = people.filter(person => person.sex === 'm');

  if (century) {
    const mensOfCentury = mens
      .filter(person => Math.ceil(person.died / 100) === century);

    const sumAgesOfCentury = mensOfCentury.reduce((sum, { born, died }) => {
      const personAge = (died - born);

      return sum + personAge;
    }, 0);

    return sumAgesOfCentury / mensOfCentury.length;
  }

  const sumAges = mens.reduce((sum, { born, died }) => {
    const personAge = (died - born);

    return sum + personAge;
  }, 0);

  return sumAges / mens.length;
}

/**
@@ -34,7 +53,35 @@ function calculateMenAverageAge(people, century) {
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(person => person.sex === 'f');

  if (withChildren) {
    const mothers = [];

    womens.forEach(women => {
      people.forEach(person => {
        if (women.name === person.mother && !mothers.includes(women)) {
          mothers.push(women);
        }
      });
    });

    const sumAgesWithChildren = mothers.reduce((sum, { born, died }) => {
      const personAge = (died - born);

      return sum + personAge;
    }, 0);

    return sumAgesWithChildren / mothers.length;
  }

  const sumAges = womens.reduce((sum, { born, died }) => {
    const personAge = (died - born);

    return sum + personAge;
  }, 0);

  return sumAges / womens.length;
}

// calculateWomenAverageAge(people, true);

/**
@@ -52,7 +99,39 @@ function calculateWomenAverageAge(people, withChildren) {
 * @return {number}
 */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const womens = people.filter(person => person.sex === 'f');
  const mothersAndChildren = [];

  womens.forEach(women => {
    people.forEach(person => {
      if (women.name === person.mother && !mothersAndChildren.includes(women)) {
        mothersAndChildren.push([women, person]);
      }
    });
  });

  if (onlyWithSon) {
    const mothersWithSons = mothersAndChildren
      .filter(element => element[1].sex === 'm');

    const sumAgesWithSon = mothersWithSons.map(element => {
      return element[1].born - element[0].born;
    }).reduce((sum, current) => sum + current, 0);

    return sumAgesWithSon / mothersWithSons.length;
  }

  const sumAges = mothersAndChildren.map(element => {
    return element[1].born - element[0].born;
  }).reduce((sum, current) => sum + current, 0);

  return sumAges / mothersAndChildren.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
