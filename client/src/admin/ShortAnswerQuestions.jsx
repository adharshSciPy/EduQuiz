// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from "react-router-dom";
// import Navbar from '../navbar/Navbar';
// import Footer from '../footer/Footer';
// import styles from './../assets/css/ShortAnswerQuestion.module.css'

// const ShortAnswerQuestion = () => {
//   const notifySuccess = () => toast.success("Submitted Successfully!");
//   const notifyError = (message) => toast.error(message || "Something Went Wrong!");
//   const { sectionId } = useParams();
  

//   const initialFields = {
//     questionCategory: '',
//     question: '',
//     answer: '',
//     mark: ''
//   };

//   const [form, setForm] = useState(initialFields);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     const { questionCategory, question, answer, mark } = form;
//     if (!questionCategory || !question || !answer || !mark) {
//       notifyError("Please fill required fields");
//       return;
//     }

//     try {
//       const payload = { questionCategory, question, answer, mark, sectionId };
      
//       const response = await axios.put(`http://localhost:8000/api/v1/section/createquestions/${sectionId}`, payload);

//       if (response.status === 200) {
//         notifySuccess();
//         setForm(initialFields); // Reset form after success
//       } else {
//         notifyError();
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error.response || error);
//       notifyError(error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className={styles.main}>
//       <Navbar />
//       <div className={styles.container}>
//         <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} />

//         <form onSubmit={submitHandler}>
//           {/* Category Selection */}
//           <div className={styles.inputDiv}>
//             <label htmlFor="type" className={styles.formLabel}>Type</label>
//             <select
//               name="questionCategory"
//               id="type"
//               className="form-select"
//               value={form.category}
//               onChange={handleInputChange}
//             >
//               <option value="">Select Type</option>
//               <option value="Technical">Technical</option>
//               <option value="NonTechnical">Non Technical</option>
//             </select>
//           </div>

//           {/* Question Text */}
//           <div className={styles.inputDiv}>
//             <label htmlFor="question" className={styles.formLabel}>Question</label>
//             <textarea
//               name="question"
//               id="question"
//               className="form-control w-100"
//               rows="2"
//               placeholder="Enter the question here"
//               value={form.question}
//               onChange={handleInputChange}
//             ></textarea>
//           </div>

//           {/* Answer Text */}
//           <div className={styles.inputDiv}>
//             <label htmlFor="answer" className={styles.formLabel}>Answer</label>
//             <textarea
//               name="answer"
//               id="answer"
//               className="form-control w-100"
//               rows="3"
//               placeholder="Enter the answer here"
//               value={form.answer}
//               onChange={handleInputChange}
//             ></textarea>
//           </div>

//           {/* Mark Input */}
//           <div className={styles.inputDiv}>
//             <label htmlFor="mark" className={styles.formLabel}>Mark</label>
//             <input
//               type='number'
//               name="mark"
//               id="mark"
//               className={styles.markInput}
//               placeholder="Enter the mark here"
//               value={form.mark}
//               onChange={handleInputChange}
//             />
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ShortAnswerQuestion;
