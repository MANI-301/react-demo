import usersData from "../data/users.json";
import vouchersData from "../data/vouchers.json";
import examsData from "../data/exams.json";
import questionsData from "../data/questions.json";

var initData = function() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(usersData));
  }
  if (!localStorage.getItem("vouchers")) {
    localStorage.setItem("vouchers", JSON.stringify(vouchersData));
  }
  if (!localStorage.getItem("exams")) {
    localStorage.setItem("exams", JSON.stringify(examsData));
  }
  if (!localStorage.getItem("questions")) {
    localStorage.setItem("questions", JSON.stringify(questionsData));
  }
  if (!localStorage.getItem("results")) {
    localStorage.setItem("results", JSON.stringify([]));
  }
};

initData();

export var getUsers = function() { return JSON.parse(localStorage.getItem("users") || "[]"); };
export var addUser = function(user) {
  var users = getUsers();
  user.id = users.length > 0 ? Math.max.apply(null, users.map(function(u) { return u.id; })) + 1 : 1;
  user.role = "student";
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return user;
};
export var loginUser = function(email, password) {
  var users = getUsers();
  return users.find(function(u) { return u.email === email && u.password === password; }) || null;
};

export var getVouchers = function() { return JSON.parse(localStorage.getItem("vouchers") || "[]"); };
export var validateVoucher = function(code) {
  var vouchers = getVouchers();
  return vouchers.find(function(v) { return v.code === code && v.active; }) || null;
};
export var addVoucher = function(voucher) {
  var vouchers = getVouchers();
  voucher.id = vouchers.length > 0 ? Math.max.apply(null, vouchers.map(function(v) { return v.id; })) + 1 : 1;
  vouchers.push(voucher);
  localStorage.setItem("vouchers", JSON.stringify(vouchers));
  return voucher;
};
export var updateVoucher = function(id, data) {
  var vouchers = getVouchers();
  var idx = vouchers.findIndex(function(v) { return v.id === id; });
  if (idx !== -1) { vouchers[idx] = Object.assign({}, vouchers[idx], data); }
  localStorage.setItem("vouchers", JSON.stringify(vouchers));
};
export var deleteVoucher = function(id) {
  var vouchers = getVouchers().filter(function(v) { return v.id !== id; });
  localStorage.setItem("vouchers", JSON.stringify(vouchers));
};

export var getExams = function() { return JSON.parse(localStorage.getItem("exams") || "[]"); };
export var addExam = function(exam) {
  var exams = getExams();
  exam.id = exams.length > 0 ? Math.max.apply(null, exams.map(function(e) { return e.id; })) + 1 : 1;
  exams.push(exam);
  localStorage.setItem("exams", JSON.stringify(exams));
  return exam;
};
export var updateExam = function(id, data) {
  var exams = getExams();
  var idx = exams.findIndex(function(e) { return e.id === id; });
  if (idx !== -1) { exams[idx] = Object.assign({}, exams[idx], data); }
  localStorage.setItem("exams", JSON.stringify(exams));
};
export var deleteExam = function(id) {
  var exams = getExams().filter(function(e) { return e.id !== id; });
  localStorage.setItem("exams", JSON.stringify(exams));
  var questions = getQuestions().filter(function(q) { return q.examId !== id; });
  localStorage.setItem("questions", JSON.stringify(questions));
};

export var getQuestions = function() { return JSON.parse(localStorage.getItem("questions") || "[]"); };
export var getQuestionsByExam = function(examId) {
  return getQuestions().filter(function(q) { return q.examId === examId; });
};
export var addQuestion = function(question) {
  var questions = getQuestions();
  question.id = questions.length > 0 ? Math.max.apply(null, questions.map(function(q) { return q.id; })) + 1 : 1;
  questions.push(question);
  localStorage.setItem("questions", JSON.stringify(questions));
  return question;
};
export var updateQuestion = function(id, data) {
  var questions = getQuestions();
  var idx = questions.findIndex(function(q) { return q.id === id; });
  if (idx !== -1) { questions[idx] = Object.assign({}, questions[idx], data); }
  localStorage.setItem("questions", JSON.stringify(questions));
};
export var deleteQuestion = function(id) {
  var questions = getQuestions().filter(function(q) { return q.id !== id; });
  localStorage.setItem("questions", JSON.stringify(questions));
};

export var getResults = function() { return JSON.parse(localStorage.getItem("results") || "[]"); };
export var addResult = function(result) {
  var results = getResults();
  result.id = results.length > 0 ? Math.max.apply(null, results.map(function(r) { return r.id; })) + 1 : 1;
  results.push(result);
  localStorage.setItem("results", JSON.stringify(results));
  return result;
};
export var deleteResult = function(id) {
  var results = getResults().filter(function(r) { return r.id !== id; });
  localStorage.setItem("results", JSON.stringify(results));
};
