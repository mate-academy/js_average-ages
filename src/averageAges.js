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
  const filteredMen = century
    ? people
      .filter(({ sex, died }) => {
        const isPersonCentury = Math.ceil(died / 100) === century;
        const isMale = sex === 'm';

        return isMale && isPersonCentury;
      })
    : people
      .filter(({ sex }) => sex === 'm');

  return calculateAverageAge(filteredMen);
}

function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const filteredWomen = withChildren
    ? people.filter((woman) => {
      const isMother = people.some(person => person.mother === woman.name);
      const isFemale = woman.sex === 'f';

      return isFemale && isMother;
    })
    : people.filter(({ sex }) => sex === 'f');

  return calculateAverageAge(filteredWomen);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const filteredChildren = onlyWithSon
    ? people.filter(person => {
      const hasMother = person.mother !== null;
      const hasMotherData = people
        .some(mother => mother.name === person.mother);
      const isSon = person.sex === 'm';

      return hasMother && hasMotherData && isSon;
    })
    : people.filter(person => {
      const hasMother = person.mother !== null;
      const hasMotherData = people
        .some(mother => mother.name === person.mother);

      return hasMother && hasMotherData;
    });

  const totalDifference = filteredChildren.reduce((totalDiff, child) => {
    const mother = people.find(person => person.name === child.mother);

    return totalDiff + (child.born - mother.born);
  }, 0);

  const childrenCount = filteredChildren.length;

  return Math.round(totalDifference / childrenCount * 100) / 100;
}

function calculateAverageAge(persons) {
  const totalAge = persons.reduce((total, { born, died }) => {
    const age = died - born;

    return total + age;
  }, 0);
  const personsCount = persons.length;

  return Math.round(totalAge / personsCount * 100) / 100;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
