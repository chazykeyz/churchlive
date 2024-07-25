const initialState = {
  loading: false,
  user: null,
  is_authenticated: null,
  singleExam: null,
  examinations: null,
  examination: null,
  studentExaminations: null,
  teacherExams: null,
  teacherExamsDetail: null,
};

const combinedActions = [
  examtypesAction,
  examgradesAction,
  examstreamsAction,
  examinationsAction,
  examsAction,
  examPerStreamAction,
];
const examsReducer = myReduxReducer(
  "examSlicer",
  initialState,
  null,
  combinedActions
);

export default examsReducer.reducer;
