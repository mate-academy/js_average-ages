'use strict';

const isMale = person => person.sex === 'm';
const turnToCentury = deathDate => Math.ceil(deathDate / 100);
const calculateAge = person => person.died - person.born;
const calculateTotalAgeOfGroup = (sum, person) => sum + person;
const takeAverage = value => Math.round(value * 100) / 100;

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? isMale(person) && turnToCentury(person.died) === century
    : isMale(person)
  );

  const menAge = men.map(calculateAge);

  const totalAge = menAge.reduce(calculateTotalAgeOfGroup);

  const averageAge = takeAverage(totalAge / menAge.length);

  return averageAge;
}

const isFemale = person => person.sex === 'f';
const isMother = (mother, child) => mother.name === child.mother;

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => withChildren
    ? people.find(child => isMother(person, child))
    : isFemale(person)
  );

  const womenAge = women.map(calculateAge);

  const totalAge = womenAge.reduce(calculateTotalAgeOfGroup);

  const average = takeAverage(totalAge / womenAge.length);

  return average;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothers = people.filter(person => onlyWithSon
    ? people.find(child => isMother(person, child) && isMale(child))
    : people.find(child => isMother(person, child))
  );

  const children = people.filter(person => onlyWithSon
    ? isMale(person) && people.find(mother => isMother(mother, person))
    : people.find(mother => isMother(mother, person))
  );

  const ageDifference = children.map(child => {
    return child.born - mothers.find(mother => isMother(mother, child)).born;
  });

  const totalAge = ageDifference.reduce(calculateTotalAgeOfGroup);

  const averageAge = takeAverage(totalAge / ageDifference.length);

  return averageAge;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
