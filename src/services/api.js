import axios from "axios";
import dbData from "../data/db.json";

var API_BASE = "";

var initData = function () {
  if (!localStorage.getItem("db")) {
    localStorage.setItem("db", JSON.stringify(dbData));
  }
};

initData();

var getDB = function () {
  return JSON.parse(localStorage.getItem("db") || JSON.stringify(dbData));
};

var saveDB = function (db) {
  localStorage.setItem("db", JSON.stringify(db));
};

var api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.response.use(
  function (res) { return res; },
  function (err) { return Promise.reject(err); }
);

export var getUsers = function () {
  return getDB().users || [];
};

export var addUser = function (user) {
  var db = getDB();
  var users = db.users || [];
  user.id = users.length > 0 ? Math.max.apply(null, users.map(function (u) { return parseInt(u.id) || 0; })) + 1 : 1;
  user.id = String(user.id);
  user.role = "student";
  users.push(user);
  db.users = users;
  saveDB(db);
  return user;
};

export var loginUser = function (email, password) {
  var users = getUsers();
  return users.find(function (u) { return u.email === email && u.password === password; }) || null;
};

export var getVouchers = function () {
  return getDB().vouchers || [];
};

export var validateVoucher = function (code) {
  var vouchers = getVouchers();
  return vouchers.find(function (v) { return v.code === code && v.active; }) || null;
};

export var addVoucher = function (voucher) {
  var db = getDB();
  var vouchers = db.vouchers || [];
  voucher.id = vouchers.length > 0 ? String(Math.max.apply(null, vouchers.map(function (v) { return parseInt(v.id) || 0; })) + 1) : "1";
  vouchers.push(voucher);
  db.vouchers = vouchers;
  saveDB(db);
  return voucher;
};

export var updateVoucher = function (id, data) {
  var db = getDB();
  var vouchers = db.vouchers || [];
  var idx = vouchers.findIndex(function (v) { return String(v.id) === String(id); });
  if (idx !== -1) { vouchers[idx] = Object.assign({}, vouchers[idx], data); }
  db.vouchers = vouchers;
  saveDB(db);
};

export var deleteVoucher = function (id) {
  var db = getDB();
  db.vouchers = (db.vouchers || []).filter(function (v) { return String(v.id) !== String(id); });
  saveDB(db);
};

export var getExams = function () {
  return getDB().exams || [];
};

export var addExam = function (exam) {
  var db = getDB();
  var exams = db.exams || [];
  exam.id = exams.length > 0 ? String(Math.max.apply(null, exams.map(function (e) { return parseInt(e.id) || 0; })) + 1) : "1";
  exams.push(exam);
  db.exams = exams;
  saveDB(db);
  return exam;
};

export var updateExam = function (id, data) {
  var db = getDB();
  var exams = db.exams || [];
  var idx = exams.findIndex(function (e) { return String(e.id) === String(id); });
  if (idx !== -1) { exams[idx] = Object.assign({}, exams[idx], data); }
  db.exams = exams;
  saveDB(db);
};

export var deleteExam = function (id) {
  var db = getDB();
  db.exams = (db.exams || []).filter(function (e) { return String(e.id) !== String(id); });
  db.questions = (db.questions || []).filter(function (q) { return String(q.examId) !== String(id); });
  saveDB(db);
};

export var getQuestions = function () {
  return getDB().questions || [];
};

export var getQuestionsByExam = function (examId) {
  return getQuestions().filter(function (q) { return String(q.examId) === String(examId); });
};

export var getRandomQuestions = function (examId, count) {
  var all = getQuestionsByExam(examId);
  var shuffled = all.slice().sort(function () { return Math.random() - 0.5; });
  return shuffled.slice(0, count);
};

export var addQuestion = function (question) {
  var db = getDB();
  var questions = db.questions || [];
  question.id = questions.length > 0 ? String(Math.max.apply(null, questions.map(function (q) { return parseInt(q.id) || 0; })) + 1) : "1";
  questions.push(question);
  db.questions = questions;
  saveDB(db);
  return question;
};

export var updateQuestion = function (id, data) {
  var db = getDB();
  var questions = db.questions || [];
  var idx = questions.findIndex(function (q) { return String(q.id) === String(id); });
  if (idx !== -1) { questions[idx] = Object.assign({}, questions[idx], data); }
  db.questions = questions;
  saveDB(db);
};

export var deleteQuestion = function (id) {
  var db = getDB();
  db.questions = (db.questions || []).filter(function (q) { return String(q.id) !== String(id); });
  saveDB(db);
};

export var getResults = function () {
  return getDB().results || [];
};

export var addResult = function (result) {
  var db = getDB();
  var results = db.results || [];
  result.id = results.length > 0 ? String(Math.max.apply(null, results.map(function (r) { return parseInt(r.id) || 0; })) + 1) : "1";
  results.push(result);
  db.results = results;
  saveDB(db);
  return result;
};

export var deleteResult = function (id) {
  var db = getDB();
  db.results = (db.results || []).filter(function (r) { return String(r.id) !== String(id); });
  saveDB(db);
};

export var resetDB = function () {
  localStorage.setItem("db", JSON.stringify(dbData));
};

export default api;
