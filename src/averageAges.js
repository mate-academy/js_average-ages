'use strict';

function calculateAverageAge(listOfAges) {
  return listOfAges.reduce((acc, age) => {
    return acc + age;
  }, 0) / listOfAges.length;
}

function calculateMenAverageAge(people, century) {
  const mensList = people.filter(person => {
    const isMen = person.sex === 'm';
    const centuryMatch = century === Math.ceil(person.died / 100);

    return century ? (centuryMatch && isMen) : isMen;
  });

  const mensAges = mensList.map(men => men.died - men.born);

  return calculateAverageAge(mensAges);
}

function calculateWomenAverageAge(people, withChildren) {
  const womansList = people.filter(person => {
    const isWoman = person.sex === 'f';
    const hasChildren = people.some(child =>
      child.mother === person.name);

    return withChildren ? (hasChildren && isWoman) : isWoman;
  });

  const womansAges = womansList.map(men => men.died - men.born);

  return calculateAverageAge(womansAges);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenList = people.filter((person) => {
    const isMen = person.sex === 'm';
    const hasMother = people.some(women => women.name === person.mother);

    return onlyWithSon ? (hasMother && isMen) : hasMother;
  });

  const ageDifferences = childrenList.map(child => {
    const isMother = people.find(women => women.name === child.mother);

    const ageDifference = child.born - isMother.born;

    return ageDifference;
  });

  return calculateAverageAge(ageDifferences);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
