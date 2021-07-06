'use strict';

const averageAge = (people) => {
  const age = people.reduce((prev, item) => {
    return prev + (item.died - item.born);
  }, 0) / people.length;

  return age;
};

function calculateMenAverageAge(people, century) {
  const mens = people.filter(person => {
    const isMens = person.sex === 'm';
    const isMensWhoDiedCentury = Math.ceil(person.died / 100) === century
      && person.sex === 'm';

    return century ? isMensWhoDiedCentury : isMens;
  });

  return averageAge(mens);
}

function calculateWomenAverageAge(people, withChildren) {
  const womens = people.filter(person => {
    const isMothers = people.find(child => child.mother === person.name);
    const isWomens = person.sex === 'f';

    return withChildren ? isMothers : isWomens;
  });

  return averageAge(womens);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenList = people.filter(person => {
    const isMothersWithSon = people.some(child => child.name === person.mother)
      && person.sex === 'm';
    const isMothers = people.some(child => child.name === person.mother);

    return onlyWithSon ? isMothersWithSon : isMothers;
  });

  const ageDiffList = childrenList.map(child => {
    const motherOfChild = people.find(mother => mother.name === child.mother);

    return child.born - motherOfChild.born;
  });

  const ageDiffSum = ageDiffList.reduce((prev, ageDiff) => prev + ageDiff);

  return ageDiffSum / ageDiffList.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
