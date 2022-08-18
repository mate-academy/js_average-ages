'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting

  // если не передали century то в переменной будет
  // массив с объектами только отсортированами по sex === 'm'
  // а если есть century то кинет массив с sex === 'm'
  // у которых есть сортировка на соответствие century
  const filteredPeople = !century
    ? people.filter(person => person.sex === 'm')
    : people.filter(person => person.sex === 'm'
    && Math.ceil(person.died / 100) === century);

  // высчитываем среднее значение
  // мы перебираем обекты, поэтому мы можем спокойно достучатся
  // до значений объекта person.died - person.born
  // и потом все это пишется в один результат sum и делится
  // в конце на filteredPeople.length

  const averageAge = filteredPeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / filteredPeople.length;

  return averageAge;
}

// console.log(calculateMenAverageAge(allPeople, 18));

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */

function calculateWomenAverageAge(people, withChildren) {
  const womenArr = people.filter(person => person.sex === 'f');
  const womenWithChildren = womenArr.filter((women) => {
    // тут мы внутри массива с женщинами начинаем перебор всех people.some
    // и пока мы перебирам все мы сравниваем с женщинами
    // мы берем имена женщин и сравниваем с именами матерей всех и муж и жен
    const isMother = people.some((person) => person.mother === women.name);

    return isMother;
  });

  const filteredPeople = !withChildren
    ? womenArr
    : womenWithChildren;

  const averageAge = filteredPeople.reduce((sum, person) =>
    sum + (person.died - person.born), 0) / filteredPeople.length;

  return averageAge;
}

// console.log(calculateWomenAverageAge(allPeople, true));
// console.log(calculateWomenAverageAge(allPeople ));

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

// const allPeople = require('./people');

function calculateAverageAgeDiff(people, onlyWithSon) {
  const childrenMother = people.filter(person => {
    // console.log(person);
    // избавился от нал в графе матери но остались андефайнд
    // но почему их нет в ответе.они есть в allChildren  но нет в childrenMother
    const allChildren = people.find((child) => person.mother === child.name
    && child.mother !== null);
    // console.table(allChildren);
    // let test = allChildren.filter(a => a !== undefined);
    // console.log(test);
    // return allChildren;

    return allChildren;
  })
    .map(person => {
      const boyMother = people.find(folk => person.mother === folk.name);

      return {
        ...person,
        motherBorn: boyMother.born,
      };
    });

  // console.table(childrenMother);

  // названия переменной меняй
  const chirdrenBoy = people.filter(person => {
    const boy = people.find((child) => person.mother === child.name
    && child.mother !== null
    && person.sex === 'm');
    // console.table(boy);

    return boy;
  })
  // через мап перебираем объект и ищем мам для людей в полном обекте
  // и потом копируем старый объект ...person,
  // и добавляем motherBorn: boyMother.born,
  // это для того чтобы можно было сразу отредюсить один обект без доп поиска
    .map(person => {
      const boyMother = people.find(folk => person.mother === folk.name);

      return {
        ...person,
        motherBorn: boyMother.born,
      };
    });

  // console.table(motherWithBoy);

  const filteredPeople = !onlyWithSon
    ? childrenMother
    : chirdrenBoy;

  const averageAge = filteredPeople.map(current =>
    current.born - current.motherBorn)
    .reduce((a, b) => a + b, 0) / filteredPeople.length;
    // console.log(averageAge);

  // const averageAge = filteredPeople.reduce((sum, current) => {
  //   // console.table(current);
  //   console.log(sum + (current.born - current.motherBorn));
  //   let sumAll = sum + (current.born - current.motherBorn)
  // / filteredPeople.length;
  //   // console.log(sumAll);
  //   // return sumAll
  // })

  // тут надо от рождения ребенка отнять рождение мамы
  // const averageAge = filteredPeople.reduce((sum, person) =>
  // sum + (person.born - people.find(child =>
  // child.mother === child.name)).born, 0) / filteredPeople.length;
  // const averageAge = filteredPeople.reduce((sum, person) =>
  //   sum + (person.died - person.born), 0) / filteredPeople.length;

  return averageAge;
}

// console.log(calculateAverageAgeDiff(allPeople, true));
// console.log(calculateAverageAgeDiff(allPeople));

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
