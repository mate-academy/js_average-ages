'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(({ sex, died }) => century ? sex === 'm'
    && Math.ceil(died / 100) === century : sex === 'm');

  const brosReducing = men.reduce((sum, man) => sum + man.died - man.born, 0);

  const calculatingTheAverageAgeForPeople = brosReducing / men.length;

  return calculatingTheAverageAgeForPeople;
}

function calculateWomenAverageAge(people, withChildren) {
  const moms = people.filter(mom => {
    const hasSon = people.some(person => person.mother === mom.name);

    return withChildren ? hasSon && mom.sex === 'f' : mom.sex === 'f';
  });

  const diffs = moms.reduce((acc, mom) => acc + mom.died - mom.born, 0);

  return diffs / moms.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child => {
    const hasMother = people.some(person => person.name === child.mother);

    return onlyWithSon ? hasMother && child.sex === 'm' : hasMother;
  });

  const diffs = children.reduce((acc, kid) => {
    const mother = people.find(mom => mom.name === kid.mother);

    return acc + (kid.born - mother.born);
  }, 0);

  return diffs / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
