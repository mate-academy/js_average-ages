'use strict';

const totalAge = (array) => {
  return array.reduce((acc, per) => acc + (per.died - per.born), 0);
};

const isMale = (perosonSex) => {
  return perosonSex === 'm';
};

const isFemale = (perosonSex) => {
  return perosonSex === 'f';
};

function calculateMenAverageAge(people, century) {
  const newPeople = century ? people.filter(person =>
    isMale(person.sex)
        && Math.ceil(person.died / 100) === century
  )
    : people.filter(person => isMale(person.sex));

  return totalAge(newPeople) / newPeople.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const woman = withChildren
    ? people.filter(
      (person) =>
        isFemale(person.sex)
          && people.some((mother) => person.name === mother.mother)
    )
    : people.filter((person) => isFemale(person.sex));

  return totalAge(woman) / woman.length;
}

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter((person) => {
    const isMalePerson = isMale(person.sex);

    if (onlyWithSon) {
      return (
        people.some((child) => child.name === person.mother) && isMalePerson
      );
    }

    return people.some(child => child.name === person.mother);
  });

  let motherAge = 0;

  children.forEach((person) => {
    const mothers = people.find((mother) => mother.name === person.mother
    );

    if (mothers) {
      motherAge += person.born - mothers.born;
    }
  });

  return motherAge / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
