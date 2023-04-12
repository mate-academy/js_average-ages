'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(man => man.sex === 'm');
  const inWhatCentury = men.filter(
    man => Math.ceil(man.died / 100) === century
  );

  const sumMenAvarageAges = (century)
    ? inWhatCentury.reduce(
      (sum, item) => (sum + item.died - item.born), 0) / inWhatCentury.length
    : men.reduce(
      (sum, item) => (sum + item.died - item.born), 0) / men.length;

  return sumMenAvarageAges;
};

function calculateWomenAverageAge(people, withChildren) {
  const women = (withChildren)
    ? people.filter(famale => famale.sex === 'f'
      && people.some(child => child.mother === famale.name))
    : people.filter(famale => famale.sex === 'f');

  const averageAge = (women
    .map(woman => woman.died - woman.born)
    .reduce((a, b) => a + b)) / women.length;

  return averageAge;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childs = people.filter(
    item => item.mother
      && people.some(each => each.name === item.mother)
  );

  const isSon = (onlyWithSon)
    ? (childs.filter(item => item.sex === 'm'))
    : childs;

  const kidsAge = isSon
    .map(son => son.born - people
      .find(mother => mother.name === son.mother).born);

  const differentAges = kidsAge.reduce((sum, age) => sum + age, 0);

  return differentAges / kidsAge.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
