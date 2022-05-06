'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const diedInCentury = men.filter(man => {
    return Math.ceil(man.died / 100) === century;
  });

  return century ? getAverage(diedInCentury) : getAverage(men);
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const womenWithKids = people.filter(person => {
    return people.some(human => human.mother === person.name);
  });

  return withChildren ? getAverage(womenWithKids) : getAverage(women);
}

function getAverage(men) {
  const average = men.reduce((accum, man) => {
    return accum + (man.died - man.born);
  }, 0);

  return average / men.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => {
    return people.some(mother => mother.name === child.mother);
  });

  const maleChildren = people.filter(child => {
    return people.some(mother => mother.name === child.mother
      && child.sex === 'm');
  });

  return onlyWithSon ? getDiff(maleChildren) : getDiff(children);

  function getDiff(kids) {
    const ageDiffs = kids.map(kid => {
      const mother = people.find(mom => kid.mother === mom.name);

      return kid.born - mother.born;
    });

    return ageDiffs.reduce((accum, x) => accum + x, 0) / ageDiffs.length;
  }
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
