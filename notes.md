1. **Arrays:**

   - **APIs:**

     - Creation: `let array = [1, 2, 3];`
     - Accessing elements: `let firstElement = array[0];`
     - Adding elements: `array.push(4);`
     - Removing elements: `array.pop();`
     - Iterating: `array.forEach(item => console.log(item));`

   - **Exercise:**
     - Create an array of numbers and print their sum.
     - Remove the last element from the array.

2. **Objects:**

   - **APIs:**
     Creation: `let person = { name: 'John', age: 25 };` - Accessing properties: `let personName = person.name;` - Modifying properties: `person.age = 26;` - Adding properties: `person.job = 'Developer';` - Iterating:
     `` javascript
  for (let key in person) {
    console.log(`${key}: ${person[key]}`);
  }
   ``

   - **Exercise:**
     - Add a new property 'city' with a value to the person object.
     - Print all the properties and values of the person object.

3. **Linked Lists:**

   - **APIs:**

     - Node creation:
       ```javascript
       class Node {
         constructor(data) {
           this.data = data;
           this.next = null;
         }
       }
       ```
     - Creating a linked list:
       ```javascript
       let linkedList = new Node(1);
       linkedList.next = new Node(2);
       ```

   - **Exercise:**
     - Create a function to print the elements of a linked list.

4. **Stacks:**

   - **APIs:**

     - Creating a stack: `let stack = [];`
     - Pushing elements onto the stack: `stack.push(1);`
     - Popping elements from the stack: `let poppedElement = stack.pop();`

   - **Exercise:**
     - Implement a stack and use it to reverse an array.

5. **Queues:**

   - **APIs:**

     - Creating a queue: `let queue = [];`
     - Enqueuing elements: `queue.push(1);`
     - Dequeuing elements: `let dequeuedElement = queue.shift();`

   - **Exercise:**
     - Implement a queue and use it to simulate a simple task processing system.

6. **Filter:**

   - **API:**
     ```javascript
     let newArray = array.filter(callback(element[, index[, array]])[, thisArg]);
     ```
   - **Example:**
     ```javascript
     let numbers = [1, 2, 3, 4, 5];
     let evens = numbers.filter(num => num % 2 === 0);
     // Result: [2, 4]
     ```

7. **Map:**

   - **API:**
     ```javascript
     let newArray = array.map(callback(element[, index[, array]])[, thisArg]);
     ```
   - **Example:**
     ```javascript
     let numbers = [1, 2, 3, 4, 5];
     let squares = numbers.map(num => num * num);
     // Result: [1, 4, 9, 16, 25]
     ```

8. **Reduce:**

   - **API:**
     ```javascript
     let result = array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue]);
     ```
   - **Example:**
     ```javascript
     let numbers = [1, 2, 3, 4, 5];
     let sum = numbers.reduce(
       (accumulator, currentValue) => accumulator + currentValue,
       0,
     );
     // Result: 15
     ```

9. **forEach:**

   - **API:**
     ```javascript
     array.forEach(callback(currentValue[, index[, array]])[, thisArg]);
     ```
   - **Example:**
     ```javascript
     let numbers = [1, 2, 3, 4, 5];
     numbers.forEach(num => console.log(num));
     // Output: 1 2 3 4 5
     ```

10. **Some:**

    - **API:**
      ```javascript
      let result = array.some(callback(element[, index[, array]])[, thisArg]);
      ```
    - **Example:**
      ```javascript
      let numbers = [1, 2, 3, 4, 5];
      let hasEven = numbers.some(num => num % 2 === 0);
      // Result: true
      ```

11. **Every:**

    - **API:**
      ```javascript
      let result = array.every(callback(element[, index[, array]])[, thisArg]);
      ```
    - **Example:**
      ```javascript
      let numbers = [2, 4, 6, 8, 10];
      let allEven = numbers.every(num => num % 2 === 0);
      // Result: true
      ```

12. **Find:**

    - **API:**
      ```javascript
      let result = array.find(callback(element[, index[, array]])[, thisArg]);
      ```
    - **Example:**
      ```javascript
      let numbers = [1, 2, 3, 4, 5];
      let found = numbers.find(num => num > 3);
      // Result: 4
      ```

13. **IndexOf:**

    - **API:**
      ```javascript
      let index = array.indexOf(searchElement[, fromIndex]);
      ```
    - **Example:**
      ```javascript
      let fruits = ['apple', 'orange', 'banana', 'apple'];
      let index = fruits.indexOf('apple');
      // Result: 0 (index of the first occurrence)
      ```

14. **Object.keys:**

    - **API:**
      ```javascript
      let keys = Object.keys(obj);
      ```
    - **Example:**
      ```javascript
      let person = {name: 'John', age: 25, job: 'Developer'};
      let propertyNames = Object.keys(person);
      // Result: ['name', 'age', 'job']
      ```

15. **Object.values:**

    - **API:**
      ```javascript
      let values = Object.values(obj);
      ```
    - **Example:**
      ```javascript
      let person = {name: 'John', age: 25, job: 'Developer'};
      let propertyValues = Object.values(person);
      // Result: ['John', 25, 'Developer']
      ```

16. **Object.entries:**

    - **API:**
      ```javascript
      let entries = Object.entries(obj);
      ```
    - **Example:**
      ```javascript
      let person = {name: 'John', age: 25, job: 'Developer'};
      let propertyEntries = Object.entries(person);
      // Result: [['name', 'John'], ['age', 25], ['job', 'Developer']]
      ```

17. **Object.assign:**

    - **API:**
      ```javascript
      let mergedObj = Object.assign({}, obj1, obj2, ...);
      ```
    - **Example:**
      ```javascript
      let obj1 = {a: 1, b: 2};
      let obj2 = {b: 3, c: 4};
      let merged = Object.assign({}, obj1, obj2);
      // Result: { a: 1, b: 3, c: 4 }
      ```

18. **hasOwnProperty:**

    - **API:**
      ```javascript
      let hasProperty = obj.hasOwnProperty(prop);
      ```
    - **Example:**
      ```javascript
      let person = {name: 'John', age: 25, job: 'Developer'};
      let hasName = person.hasOwnProperty('name');
      // Result: true
      ```

19. **Object.freeze:**

    - **API:**
      ```javascript
      Object.freeze(obj);
      ```
    - **Example:**
      ```javascript
      let person = {name: 'John', age: 25};
      Object.freeze(person);
      person.age = 26; // This change will be ignored (in strict mode)
      ```

20. **Object.seal:**

    - **API:**
      ```javascript
      Object.seal(obj);
      ```
    - **Example:**
      ```javascript
      let person = {name: 'John', age: 25};
      Object.seal(person);
      delete person.age; // This operation will be ignored
      ```

21. **Object.getOwnPropertyNames:**
    - **API:**
      ```javascript
      let propertyNames = Object.getOwnPropertyNames(obj);
      ```
    - **Example:**
      ```javascript
      let person = {name: 'John', age: 25};
      let names = Object.getOwnPropertyNames(person);
      // Result: ['name', 'age']
      ```
