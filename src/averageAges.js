'use strict';

function filterPeopleBySex(people, sex) {
  return people.filter(person => person.sex === sex);
}

function filterPeopleByCentury(people, century) {
  return people.filter(person => {
    const personCentury = Math.ceil(person.died / 100);

    return (!century || personCentury === century);
  });
}

function calcAverageAge(arr) {
  const averageAge = arr
    .reduce((accumulator, age) => accumulator + age) / arrAge.length;
    
  return averageAge;
}

function calculateMenAverageAge(people, century) {
  const menArr = filterPeopleBySex(people, 'm');
  const menArrFiltered = filterPeopleByCentury(menArr, century);
  const arrAge = menArrFiltered.map(man => man.died - man.born);
 
  return calcAverageAge(arrAge);
}

function calculateWomenAverageAge(people, withChildren) {
  const womenArr = filterPeopleBySex(people, 'f');
  const womenArrFiltered = withChildren
    ? womenArr.filter(women => 'mother' in women
      && people.some(person => person.mother === women.name))
    : womenArr;
  const arrAge = womenArrFiltered.map(women => women.died - women.born);
 
  return calcAverageAge(arrAge);
}

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  const womenArr = filterPeopleBySex(people, 'f');
  const mothersWithChildren = womenArr.reduce((acc, mother) => {
    const children = people
      .filter(person => person.mother === mother.name
        && (!onlyWithSon || person.sex === 'm'));

    if (children.length) {
      acc.push({
        mother, children,
      });
    }

    return acc;
  }, []);
  const ageDifferences = mothersWithChildren.flatMap(entry => {
    const { mother, children } = entry;

    return children.map(child => child.born - mother.born);
  });
  const avgAgeDiff = ageDifferences
    .reduce((acc, val) => acc + val, 0) / ageDifferences.length;

  return avgAgeDiff;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
