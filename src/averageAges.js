'use strict';

// Methods for working with data base 'people'
const methods = {
  getFilteredPeopleBySex(people, sex) {
    return people.filter(person => person.sex === sex);
  },

  getFilteredMenByCentury(people, century) {
    return people.filter(person => Math.ceil(person.died / 100) === century);
  },

  calculateTotalAge(people) {
    return people
      .reduce((ages, person) => ages + (person.died - person.born), 0);
  },

  getAverage(amount, count) {
    return amount / count;
  },

  getOnlyMothersList(people) {
    const onlyMothersList = [];

    people.forEach(person => {
      if (typeof person.mother === 'string') {
        onlyMothersList.push(person.mother);
      }
    });

    const uniqueMothersList = [...new Set(onlyMothersList)];

    const mothers = uniqueMothersList.map(motherName => {
      return people.find(person => person.name === motherName);
    });

    return mothers.filter(mother => typeof mother !== 'undefined');
  },

  getSumAgeDiffWithMothers(sons, mothers) {
    return sons.reduce((result, son) => result + mothers[son.name], 0);
  },
};

/**
 * @param {object[]} people
 * @param {number} century - optional
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const men = methods.getFilteredPeopleBySex(people, 'm');

  const menByCentury = century >= 1
    ? methods.getFilteredMenByCentury(men, century)
    : men;

  const totalAge = methods.calculateTotalAge(menByCentury);

  return methods.getAverage(totalAge, menByCentury.length);
}

/**
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const onlyMothersList = methods.getOnlyMothersList(people);

  const totalMothersAge = methods.calculateTotalAge(onlyMothersList);

  const allWomenList = methods.getFilteredPeopleBySex(people, 'f');

  const allWomenTotalAge = methods.calculateTotalAge(allWomenList);

  const count = withChildren
    ? onlyMothersList.length
    : allWomenList.length;

  return withChildren
    ? methods.getAverage(totalMothersAge, count)
    : methods.getAverage(allWomenTotalAge, count);
}

/**
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.reduce((result, person) => {
    const mother = typeof person.mother === 'string'
    && people.find(woman => woman.name === person.mother);

    mother && (result[person.name] = person.born - mother.born);

    return result;
  }, {});

  const children
  = people.filter(person => mothers.hasOwnProperty(person.name));

  const sons = methods.getFilteredPeopleBySex(children, 'm');

  const totalAgeDiff = onlyWithSon
    ? methods.getSumAgeDiffWithMothers(sons, mothers)
    : methods.getSumAgeDiffWithMothers(children, mothers);

  const count = onlyWithSon
    ? sons.length
    : children.length;

  return methods.getAverage(totalAgeDiff, count);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
