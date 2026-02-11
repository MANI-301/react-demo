import usersData from "../data/users.json";
import vouchersData from "../data/vouchers.json";
import examsData from "../data/exams.json";
import questionsData from "../data/questions.json";

const initData = () => {
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

export const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");
export const addUser = (user) => {
  const users = getUsers();
  user.id = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  user.role = "student";
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return user;
};
export const loginUser = (email, password) => {
  const users = getUsers();
  return users.find((u) => u.email === email && u.password === password) || null;
};

export const getVouchers = () => JSON.parse(localStorage.getItem("vouchers") || "[]");
export const validateVoucher = (code) => {
  const vouchers = getVouchers();
  return vouchers.find((v) => v.code === code && v.active) || null;
};
export const addVoucher = (voucher) => {
  const vouchers = getVouchers();
  voucher.id = vouchers.length > 0 ? Math.max(...vouchers.map((v) => v.id)) + 1 : 1;
  vouchers.push(voucher);
  localStorage.setItem("vouchers", JSON.stringify(vouchers));
  return voucher;
};
export const updateVoucher = (id, data) => {
  const vouchers = getVouchers();
  const idx = vouchers.findIndex((v) => v.id === id);
  if (idx !== -1) { vouchers[idx] = { ...vouchers[idx], ...data }; }
  localStorage.setItem("vouchers", JSON.stringify(vouchers));
};
export const deleteVoucher = (id) => {
  const vouchers = getVouchers().filter((v) => v.id !== id);
  localStorage.setItem("vouchers", JSON.stringify(vouchers));
};

export const getExams = () => JSON.parse(localStorage.getItem("exams") || "[]");
export const addExam = (exam) => {
  const exams = getExams();
  exam.id = exams.length > 0 ? Math.max(...exams.map((e) => e.id)) + 1 : 1;
  exams.push(exam);
  localStorage.setItem("exams", JSON.stringify(exams));
  return exam;
};
export const updateExam = (id, data) => {
  const exams = getExams();
  const idx = exams.findIndex((e) => e.id === id);
  if (idx !== -1) { exams[idx] = { ...exams[idx], ...data }; }
  localStorage.setItem("exams", JSON.stringify(exams));
};
export const deleteExam = (id) => {
  const exams = getExams().filter((e) => e.id !== id);
  localStorage.setItem("exams", JSON.stringify(exams));
  const questions = getQuestions().filter((q) => q.examId !== id);
  localStorage.setItem("questions", JSON.stringify(questions));
};

export const getQuestions = () => JSON.parse(localStorage.getItem("questions") || "[]");
export const getQuestionsByExam = (examId) => getQuestions().filter((q) => q.examId === examId);
export const addQuestion = (question) => {
  const questions = getQuestions();
  question.id = questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
  questions.push(question);
  localStorage.setItem("questions", JSON.stringify(questions));
  return question;
};
export const updateQuestion = (id, data) => {
  const questions = getQuestions();
  const idx = questions.findIndex((q) => q.id === id);
  if (idx !== -1) { questions[idx] = { ...questions[idx], ...data }; }
  localStorage.setItem("questions", JSON.stringify(questions));
};
export const deleteQuestion = (id) => {
  const questions = getQuestions().filter((q) => q.id !== id);
  localStorage.setItem("questions", JSON.stringify(questions));
};

export const getResults = () => JSON.parse(localStorage.getItem("results") || "[]");
export const addResult = (result) => {
  const results = getResults();
  result.id = results.length > 0 ? Math.max(...results.map((r) => r.id)) + 1 : 1;
  results.push(result);
  localStorage.setItem("results", JSON.stringify(results));
  return result;
};
