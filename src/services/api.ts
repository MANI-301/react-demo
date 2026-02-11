import usersData from '../data/users.json';
import vouchersData from '../data/vouchers.json';
import examsData from '../data/exams.json';
import questionsData from '../data/questions.json';

// Initialize localStorage with JSON data if not already set
const initData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(usersData));
  }
  if (!localStorage.getItem('vouchers')) {
    localStorage.setItem('vouchers', JSON.stringify(vouchersData));
  }
  if (!localStorage.getItem('exams')) {
    localStorage.setItem('exams', JSON.stringify(examsData));
  }
  if (!localStorage.getItem('questions')) {
    localStorage.setItem('questions', JSON.stringify(questionsData));
  }
  if (!localStorage.getItem('results')) {
    localStorage.setItem('results', JSON.stringify([]));
  }
};

initData();

// Users
export const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
export const addUser = (user: any) => {
  const users = getUsers();
  user.id = users.length > 0 ? Math.max(...users.map((u: any) => u.id)) + 1 : 1;
  user.role = 'student';
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return user;
};
export const loginUser = (email: string, password: string) => {
  const users = getUsers();
  return users.find((u: any) => u.email === email && u.password === password) || null;
};

// Vouchers
export const getVouchers = () => JSON.parse(localStorage.getItem('vouchers') || '[]');
export const validateVoucher = (code: string) => {
  const vouchers = getVouchers();
  return vouchers.find((v: any) => v.code === code && v.active) || null;
};
export const addVoucher = (voucher: any) => {
  const vouchers = getVouchers();
  voucher.id = vouchers.length > 0 ? Math.max(...vouchers.map((v: any) => v.id)) + 1 : 1;
  vouchers.push(voucher);
  localStorage.setItem('vouchers', JSON.stringify(vouchers));
  return voucher;
};
export const updateVoucher = (id: number, data: any) => {
  const vouchers = getVouchers();
  const idx = vouchers.findIndex((v: any) => v.id === id);
  if (idx !== -1) { vouchers[idx] = { ...vouchers[idx], ...data }; }
  localStorage.setItem('vouchers', JSON.stringify(vouchers));
};
export const deleteVoucher = (id: number) => {
  const vouchers = getVouchers().filter((v: any) => v.id !== id);
  localStorage.setItem('vouchers', JSON.stringify(vouchers));
};

// Exams
export const getExams = () => JSON.parse(localStorage.getItem('exams') || '[]');
export const addExam = (exam: any) => {
  const exams = getExams();
  exam.id = exams.length > 0 ? Math.max(...exams.map((e: any) => e.id)) + 1 : 1;
  exams.push(exam);
  localStorage.setItem('exams', JSON.stringify(exams));
  return exam;
};
export const updateExam = (id: number, data: any) => {
  const exams = getExams();
  const idx = exams.findIndex((e: any) => e.id === id);
  if (idx !== -1) { exams[idx] = { ...exams[idx], ...data }; }
  localStorage.setItem('exams', JSON.stringify(exams));
};
export const deleteExam = (id: number) => {
  const exams = getExams().filter((e: any) => e.id !== id);
  localStorage.setItem('exams', JSON.stringify(exams));
  // Also delete related questions
  const questions = getQuestions().filter((q: any) => q.examId !== id);
  localStorage.setItem('questions', JSON.stringify(questions));
};

// Questions
export const getQuestions = () => JSON.parse(localStorage.getItem('questions') || '[]');
export const getQuestionsByExam = (examId: number) => getQuestions().filter((q: any) => q.examId === examId);
export const addQuestion = (question: any) => {
  const questions = getQuestions();
  question.id = questions.length > 0 ? Math.max(...questions.map((q: any) => q.id)) + 1 : 1;
  questions.push(question);
  localStorage.setItem('questions', JSON.stringify(questions));
  return question;
};
export const updateQuestion = (id: number, data: any) => {
  const questions = getQuestions();
  const idx = questions.findIndex((q: any) => q.id === id);
  if (idx !== -1) { questions[idx] = { ...questions[idx], ...data }; }
  localStorage.setItem('questions', JSON.stringify(questions));
};
export const deleteQuestion = (id: number) => {
  const questions = getQuestions().filter((q: any) => q.id !== id);
  localStorage.setItem('questions', JSON.stringify(questions));
};

// Results
export const getResults = () => JSON.parse(localStorage.getItem('results') || '[]');
export const addResult = (result: any) => {
  const results = getResults();
  result.id = results.length > 0 ? Math.max(...results.map((r: any) => r.id)) + 1 : 1;
  results.push(result);
  localStorage.setItem('results', JSON.stringify(results));
  return result;
};
