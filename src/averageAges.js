'use strict';

/* first exercise */

function calculateMenAverageAge(people, century) {
  const men = century ? getMenByCentury(people, century) : getAllMen(people);
  const menAverageAge = getMenStatistic(men);

  return menAverageAge;
};

function getAllMen(people) {
  return people.filter(man => man.sex === 'm');
};

function getMenByCentury(people, century) {
  return people.filter(man => Math.ceil(man.died / 100)
    === century && man.sex === 'm');
};

function getMenStatistic(men) {
  return men.reduce((sum, man) =>
    (sum + (man.died - man.born)), 0) / men.length;
};

/* second exercise */

function calculateWomenAverageAge(people, withChildren) {
  const women = withChildren ? getAllWomenWithChildren(people, withChildren)
    : getAllWomen(people);
  const womenAverageAge = getWomenStatistic(women);

  return womenAverageAge;
};

function getAllWomen(people) {
  return people.filter(woman => woman.sex === 'f');
};

function getAllWomenWithChildren(people) {
  return people.filter(woman => woman.sex === 'f'
    && people.some(child => woman.name === child.mother));
};

function getWomenStatistic(women) {
  return women.reduce((sum, woman) =>
    (sum + (woman.died - woman.born)), 0) / women.length;
}

/* third exercise */

function calculateAverageAgeDiff(people, onlyWithSon) {
  const women = onlyWithSon ? getAllWomenWithSon(people)
    : getAllWomenWithChildren(people);
  const children = onlyWithSon ? getAllSonWithMother(people)
    : getAllChildWithMother(people);
  const diffAge = getPersonBornAvg(children, women);

  return diffAge;
};

function getAllWomenWithSon(people) {
  return people.filter(woman => woman.sex === 'f'
    && people.some(son => son.sex === 'm' && woman.name === son.mother));
};

function getAllChildWithMother(people) {
  return people.filter(child => child.mother
    && people.some(woman => woman.name === child.mother));
};

function getAllSonWithMother(people) {
  return people.filter(son => son.sex === 'm'
    && people.some(woman => woman.name === son.mother));
};

function getPersonBornAvg(people, women) {
  return people.reduce((sum, person) =>
    sum + (person.born - women.find(woman =>
      person.mother === woman.name).born), 0) / people.length;
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
