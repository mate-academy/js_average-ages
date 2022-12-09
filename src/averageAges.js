'use strict';

function calculateMenAverageAge(people, century) {
  const averageMenAge = averageAge(
    people.filter((person) => person.sex === 'm')
  );

  const menOfCentury = people.filter(
    (person) => person.sex === 'm' && Math.ceil(person.died / 100) === century
  );

  const averageMenAgeOfCentury = averageAge(menOfCentury);

  return century ? averageMenAgeOfCentury : averageMenAge;
}

function calculateWomenAverageAge(people, withChildren) {
  const womenAverageAgeWithoutChild = averageAge(
    people.filter((person) => person.sex === 'f')
  );
  const mothersName = people.map((person) => person.mother);

  const womenAverageAgeWithChildren = averageAge(
    people.filter((person) => mothersName.includes(person.name))
  );

  return withChildren
    ? womenAverageAgeWithChildren
    : womenAverageAgeWithoutChild;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const mothersArr = people.map((person) => person.mother);
  const childsArr = people.map((person) => person.name);

  const mothers = people.filter((person) => mothersArr.includes(person.name));
  const childs = people.filter((person) => childsArr.includes(person.mother));

  return averageAgeDiff(mothers, childs, onlyWithSon);
}

const averageAge = (obj) => {
  const averageAgeCount
    = obj.reduce(
      (sum, currentObjKey) => sum + (currentObjKey.died - currentObjKey.born),
      0
    ) / obj.length;

  return +averageAgeCount.toFixed(2);
};

const averageAgeDiff = (mothers, childs, withSons) => {
  let count = 0;
  let ageSum = 0;

  mothers.some((mother) => {
    childs.some((child) => {
      if (withSons) {
        if (mother.name === child.mother && child.sex === 'm') {
          count++;
          ageSum += child.born - mother.born;
        }
      } else {
        if (mother.name === child.mother) {
          count++;
          ageSum += child.born - mother.born;
        }
      }
    });
  });

  return +(ageSum / count).toFixed(2);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
