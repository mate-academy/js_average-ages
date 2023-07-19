'use strict';

function getAverageAge(ageOfPeople) {
  return ageOfPeople.reduce((sum, age) => sum + age, 0) / ageOfPeople.length;
}

function calculateMenAverageAge(people, century) {
  const menDied = people.filter(person => person.sex === 'm'
  && century ? Math.ceil(person.died / 100) === century : true);

  const menAge = menDied.map(person => person.died - person.born);

  return getAverageAge(menAge);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f'
    && withChildren ? people.some(child => {
      return person.name === child.mother;
    }) : true);

  const womenAge = women.map(person => person.died - person.born);

  return getAverageAge(womenAge);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = onlyWithSon
    ? people.filter(person => people.some(child => {
      return child.name === person.mother;
    })
    && person.sex === 'm')
    : people.filter(person => people.some(child => {
      return child.name === person.mother;
    }));
  const ageDiff = mothers.map((child) => {
    const mother = people.find(person => child.mother === person.name);
    const ages = child.born - mother.born;

    return ages;
  });

  return getAverageAge(ageDiff);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
