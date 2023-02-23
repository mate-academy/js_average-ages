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

  getAverage(list) {
    const totalAge = methods.calculateTotalAge(list);

    return totalAge / list.length;
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

function calculateMenAverageAge(people, century) {
  const men = methods.getFilteredPeopleBySex(people, 'm');
  const menByCentury = century >= 1
    ? methods.getFilteredMenByCentury(men, century)
    : men;

  return methods.getAverage(menByCentury);
}

function calculateWomenAverageAge(people, withChildren) {
  const onlyMothersList = methods.getOnlyMothersList(people);
  const allWomenList = methods.getFilteredPeopleBySex(people, 'f');

  return withChildren
    ? methods.getAverage(onlyMothersList)
    : methods.getAverage(allWomenList);
}

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

  return totalAgeDiff / count;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
