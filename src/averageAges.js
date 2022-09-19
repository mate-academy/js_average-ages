'use strict';

function avarageAge(people) {
  const ages = people.map(person => person.died - person.born);

  return ages.reduce((prev, current) => prev + current, 0) / ages.length;
}

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => person.sex === 'm');
  const menCentury = men
    .filter(person => Math.ceil(person.died / 100) === century);

  return !century ? avarageAge(men) : avarageAge(menCentury); ;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people.filter(person => person.sex === 'f');
  const womenWithChildren = women.filter(person => people.find(
    child => child.mother === person.name
  ));

  return !withChildren ? avarageAge(women) : avarageAge(womenWithChildren);
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const womenWithChildren = people.filter(child => child.mother
    && people.find(person => person.name === child.mother));

  const withSonOnly = womenWithChildren.filter(person => person.sex === 'm');

  const ageDifference = arr => arr.reduce((prev, curr) =>
    prev + curr.born - people.find(person =>
      person.name === curr.mother).born, 0) / arr.length;

  return !onlyWithSon
    ? ageDifference(womenWithChildren) : ageDifference(withSonOnly);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
