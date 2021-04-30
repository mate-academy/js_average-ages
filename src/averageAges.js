'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');

  const menCentury = men.filter(person => {
    return century ? (Math.ceil(person.died / 100) === century) : true;
  });

  const menAgeSum = menCentury.reduce((sumAges, person) => {
    return sumAges + (person.died - person.born) / menCentury.length;
  }, 0);

  return menAgeSum;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');

  const womenWithKids = women.filter(({ name }) => {
    return withChildren ? people.find(({ mother }) => mother === name) : true;
  });

  const womenAgeSum = womenWithKids.reduce((sumAges, person) => {
    return sumAges + (person.died - person.born) / womenWithKids.length;
  }, 0);

  return womenAgeSum;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  // const child = people.find(({ name }) => name === mother);

  const babies = onlyWithSon ? (people.filter(({ mother }) => {
    return people.find(({ name }) => name === mother);
  })).filter(({ sex }) => sex === 'm')
    : (people.filter(({ mother }) => {
      return people.find(({ name }) => name === mother);
    }));

  const diffsum = babies.reduce((acumulator, { mother, born: bornKid }) => {
    const age = bornKid - people.find(({ name }) => name === mother).born;

    return acumulator + (age / babies.length);
  }, 0);

  return diffsum;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
