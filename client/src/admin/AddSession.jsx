// import React, { useState } from 'react';
// import styles from './../assets/css/addSession.module.css';
// // import { useNavigate } from 'react-router-dom';
// import { Button, Flex } from 'antd';
// import axios from 'axios'

// function AddSession({ onClose, refreshSessions }) {
//   const [sessionName, setSessionName] = useState('');
//   const [sessionDate, setSessionDate] = useState('');
//   const [questionType, setQuestionType] = useState('');

//   const handleConfirm = async () => {
//     try {
//       await axios.post("http://localhost:8000/api/v1/section/createsection", {
//         sectionName: sessionName,
//         date: sessionDate,
//         questionType: questionType
//       });
      
//       // Refresh sessions to reflect the new data
//       refreshSessions();
//     } catch (error) {
//       console.log(error);
//     }

//     // Reset the input fields
//     setSessionName('');
//     setSessionDate('');
//     setQuestionType('');

//     // Close the modal after confirming
//     onClose();
//   };

//   // Check if all fields are filled
//   const isFormComplete = sessionName && sessionDate && questionType;

//   return (
//     <div className={styles.modal}>
//       <div className={styles.modalContent}>
//         <div className={styles.modalHeader}>Add New Session</div>
//         <div className={styles.modalBody}>
//           <input
//             type="text"
//             required
//             placeholder="Session Name"
//             className={styles.inputField}
//             value={sessionName}
//             onChange={(e) => setSessionName(e.target.value)}
//           />
//           <input
//             type="date"
//             required
//             className={styles.inputField}
//             value={sessionDate}
//             onChange={(e) => setSessionDate(e.target.value)}
//           />
//           <select
//             className={styles.inputField}
//             value={questionType}
//             onChange={(e) => setQuestionType(e.target.value)}
//           >
//             <option value="">Select Question Type</option>
//             <option value="MCQ">Multiple Choice Questions</option>
//             <option value="Descriptive">Short Answer Questions</option>
//           </select>
//         </div>
//         <div className={styles.modalFooter}>
//         <Flex gap="small" wrap>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button type="primary" onClick={handleConfirm} disabled={!isFormComplete}>
//             Confirm
//           </Button>
//           </Flex>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddSession;


