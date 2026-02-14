import axios from "axios";
<<<<<<< HEAD

const API_URL = "http://localhost:3001";

// Users
export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

export const addUser = async (user) => {
  const newUser = { ...user, role: "student" };
  const res = await axios.post(`${API_URL}/users`, newUser);
  return res.data;
};

export const loginUser = async (email, password) => {
  const res = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
  return res.data.length > 0 ? res.data[0] : null;
};

// Exams
export const getExams = async () => {
  const res = await axios.get(`${API_URL}/exams`);
  return res.data;
};

export const addExam = async (exam) => {
  const res = await axios.post(`${API_URL}/exams`, exam);
  return res.data;
};

export const updateExam = async (id, data) => {
  const res = await axios.patch(`${API_URL}/exams/${id}`, data);
  return res.data;
};

export const deleteExam = async (id) => {
  await axios.delete(`${API_URL}/exams/${id}`);
  // Manual cascade delete for questions
  const questions = await getQuestionsByExam(id);
  for (const q of questions) {
    await deleteQuestion(q.id);
  }
};

// Questions
export const getQuestions = async () => {
  const res = await axios.get(`${API_URL}/questions`);
  return res.data;
};

export const getQuestionsByExam = async (examId) => {
  const res = await axios.get(`${API_URL}/questions?examId=${examId}`);
  return res.data;
};

export const getRandomQuestions = async (examId, count) => {
  const all = await getQuestionsByExam(examId);
  const shuffled = all.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const addQuestion = async (question) => {
  const res = await axios.post(`${API_URL}/questions`, question);
  return res.data;
};

export const updateQuestion = async (id, data) => {
  const res = await axios.patch(`${API_URL}/questions/${id}`, data);
  return res.data;
};

export const deleteQuestion = async (id) => {
  await axios.delete(`${API_URL}/questions/${id}`);
};

// Vouchers
export const getVouchers = async () => {
  const res = await axios.get(`${API_URL}/vouchers`);
  return res.data;
};

export const validateVoucher = async (code) => {
  const res = await axios.get(`${API_URL}/vouchers?code=${code}&active=true`);
  return res.data.length > 0 ? res.data[0] : null;
};

export const addVoucher = async (voucher) => {
  const res = await axios.post(`${API_URL}/vouchers`, voucher);
  return res.data;
};

export const updateVoucher = async (id, data) => {
  const res = await axios.patch(`${API_URL}/vouchers/${id}`, data);
  return res.data;
};

export const deleteVoucher = async (id) => {
  await axios.delete(`${API_URL}/vouchers/${id}`);
};

// Results
export const getResults = async () => {
  const res = await axios.get(`${API_URL}/results`);
  return res.data;
};

export const addResult = async (result) => {
  const res = await axios.post(`${API_URL}/results`, result);
  return res.data;
};

export const deleteResult = async (id) => {
  await axios.delete(`${API_URL}/results/${id}`);
};
=======
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
  user.id = users.length > 0 ? Math.max.apply(null, users.map(function (u) { return u.id; })) + 1 : 1;
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
  voucher.id = vouchers.length > 0 ? Math.max.apply(null, vouchers.map(function (v) { return v.id; })) + 1 : 1;
  vouchers.push(voucher);
  db.vouchers = vouchers;
  saveDB(db);
  return voucher;
};

export var updateVoucher = function (id, data) {
  var db = getDB();
  var vouchers = db.vouchers || [];
  var idx = vouchers.findIndex(function (v) { return v.id === id; });
  if (idx !== -1) { vouchers[idx] = Object.assign({}, vouchers[idx], data); }
  db.vouchers = vouchers;
  saveDB(db);
};

export var deleteVoucher = function (id) {
  var db = getDB();
  db.vouchers = (db.vouchers || []).filter(function (v) { return v.id !== id; });
  saveDB(db);
};

export var getExams = function () {
  return getDB().exams || [];
};

export var addExam = function (exam) {
  var db = getDB();
  var exams = db.exams || [];
  exam.id = exams.length > 0 ? Math.max.apply(null, exams.map(function (e) { return e.id; })) + 1 : 1;
  exams.push(exam);
  db.exams = exams;
  saveDB(db);
  return exam;
};

export var updateExam = function (id, data) {
  var db = getDB();
  var exams = db.exams || [];
  var idx = exams.findIndex(function (e) { return e.id === id; });
  if (idx !== -1) { exams[idx] = Object.assign({}, exams[idx], data); }
  db.exams = exams;
  saveDB(db);
};

export var deleteExam = function (id) {
  var db = getDB();
  db.exams = (db.exams || []).filter(function (e) { return e.id !== id; });
  db.questions = (db.questions || []).filter(function (q) { return q.examId !== id; });
  saveDB(db);
};

export var getQuestions = function () {
  return getDB().questions || [];
};

export var getQuestionsByExam = function (examId) {
  return getQuestions().filter(function (q) { return q.examId === examId; });
};

export var getRandomQuestions = function (examId, count) {
  var all = getQuestionsByExam(examId);
  var shuffled = all.slice().sort(function () { return Math.random() - 0.5; });
  return shuffled.slice(0, count);
};

export var addQuestion = function (question) {
  var db = getDB();
  var questions = db.questions || [];
  question.id = questions.length > 0 ? Math.max.apply(null, questions.map(function (q) { return q.id; })) + 1 : 1;
  questions.push(question);
  db.questions = questions;
  saveDB(db);
  return question;
};

export var updateQuestion = function (id, data) {
  var db = getDB();
  var questions = db.questions || [];
  var idx = questions.findIndex(function (q) { return q.id === id; });
  if (idx !== -1) { questions[idx] = Object.assign({}, questions[idx], data); }
  db.questions = questions;
  saveDB(db);
};

export var deleteQuestion = function (id) {
  var db = getDB();
  db.questions = (db.questions || []).filter(function (q) { return q.id !== id; });
  saveDB(db);
};

export var getResults = function () {
  return getDB().results || [];
};

export var addResult = function (result) {
  var db = getDB();
  var results = db.results || [];
  result.id = results.length > 0 ? Math.max.apply(null, results.map(function (r) { return r.id; })) + 1 : 1;
  results.push(result);
  db.results = results;
  saveDB(db);
  return result;
};

export var deleteResult = function (id) {
  var db = getDB();
  db.results = (db.results || []).filter(function (r) { return r.id !== id; });
  saveDB(db);
};

export var resetDB = function () {
  localStorage.setItem("db", JSON.stringify(dbData));
};

export default api;
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
