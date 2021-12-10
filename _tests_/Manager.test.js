const manager = require ('../lib/manager');

// test manager

test ('return manager', () => {
    const testValue = 'Manager';
    const mgr = new Manager ('test', 1, 'email@email.com',50);
    expect(mgr.getRole()).toBe(testValue);
       

});

// Test office number
test('get office number: getOffice()', 
() => {
    const testValue = 50;
   const mgr = new manager ("test", 1, "email@gmail.com", testValue);
   expect(man.getOfficeNumber()).toBe(testValue);
});