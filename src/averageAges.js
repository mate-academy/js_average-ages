'use strict';

function calculateMenAverageAge(people, century) {
  const men = people.filter(person => century
    ? person.sex === 'm' && Math.ceil(person.died / 100) === century
    : person.sex === 'm'
  );

  return men.reduce((prev, current) => {
    return prev + (current.died - current.born);
  }, 0) / men.length;
}

function calculateWomenAverageAge(people, withChildren) {
  const women = people
    .filter(person => withChildren
      ? person.sex === 'f' && people.some(child => child.mother === person.name)
      : person.sex === 'f'
    );

  return women.reduce((prev, current) => {
    return prev + (current.died - current.born);
  }, 0) / women.length;
}

// 1. Находим детей у которых в этом массиве есть мать
// 2. Если onlyWithSon - оставляем только кто сын
// 3. Считаем разницу

function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(child =>
    people.some(mother => child.mother === mother.name));
  const sons = children.filter(son => son.sex === 'm');

  const actualArray = onlyWithSon ? sons : children;

  return actualArray.reduce((acc, child) => {
    const motherRef = people.find(mother => child.mother === mother.name);

    return acc + (child.born - motherRef.born);
  }, 0) / actualArray.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
