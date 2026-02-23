
let students = [
  { id: 1, name: "Mugisha Yvan", age: 18, gender: "male", grade: 11 },
  { id: 2, name: "Shimwa Jane", age: 17, gender: "female", grade: 10 },
  { id: 3, name: "Manzi Smith", age: 19, gender: "male", grade: 11 }
];
function addStudent(name, age, gender, grade) {
  if (!name || name.trim() === "") {
    console.log("Name is required");
    return;
  }

  if (typeof age !== "number" || age <= 0) {
    console.log("Invalid age");
    return;
  }

  if (gender !== "male" && gender !== "female") {
    console.log("Gender must be male or female");
    return;
  }

  if (typeof grade !== "number") {
    console.log("Grade must be a number");
    return;
  }

  let duplicate = students.find(s => s.name === name);
  if (duplicate) {
    console.log("Duplicate student name not allowed");
    return;
  }

  let newId = students[students.length - 1].id + 1;

  students.push({
    id: newId,
    name,
    age,
    gender,
    grade
  });

  console.log("Student added successfully");
}

function getStudents() {
  return students;
}

function getStudentById(id) {
  let student = students.find(s => s.id === id);

  if (!student) {
    console.log("Student not found");
    return;
  }

  return student;
}

function updateStudent(id, newName, newAge, newGender, newGrade) {
  let student = students.find(s => s.id === id);

  if (!student) {
    console.log("Student not found");
    return;
  }

  if (typeof newAge !== "number" || newAge <= 0) {
    console.log("Invalid age");
    return;
  }

  if (newGender !== "male" && newGender !== "female") {
    console.log("Gender must be male or female");
    return;
  }

  student.name = newName;
  student.age = newAge;
  student.gender = newGender;
  student.grade = newGrade;

  console.log("Student updated successfully");
}

function deleteStudent(id) {
  let index = students.findIndex(s => s.id === id);

  if (index === -1) {
    console.log("Student not found");
    return;
  }

  students.splice(index, 1);
  console.log("Student deleted successfully");
}
function getMaleStudents() {
  return students.filter(s => s.gender === "male");
}
function sortStudentsByName() {
  return [...students].sort((a, b) => a.name.localeCompare(b.name));
}
function getOldestStudent() {
  return students.reduce((oldest, current) =>
    current.age > oldest.age ? current : oldest
  );
}
function countGrade11Students() {
  return students.filter(s => s.grade === 11).length;
}

console.log("Initial Students:", getStudents());

addStudent("Alpha Mugisha", 16, "male", 9);
addStudent("Keza Aline", 18, "female", 11);

console.log("All Students:", getStudents());

console.log("Student with ID 2:", getStudentById(2));

updateStudent(1, "Mugisha Yvan", 19, "male", 11);

deleteStudent(3);

console.log("Male Students:", getMaleStudents());
console.log("Sorted by Name:", sortStudentsByName());
console.log("Oldest Student:", getOldestStudent());
console.log("Total Grade 11 Students:", countGrade11Students());
