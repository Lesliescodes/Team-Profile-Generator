const Employee = require('../lib/Employee')

//Test name

test('input name from constructor', () => {
    const name = 'Leslie';
    const emp = new Employee(name);
    expect (emp.name).toBe(name);
});

test('set id with constructior', () => {
    const testValue = 50;
    const emp = new Employee('test', testValue);
    expect (emp.id).toBe(testValue);
});
