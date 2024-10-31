// import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
// import styles from './../assets/css/sSessionModal.module.css';

// const SessionModal = ({ isOpen, onOk, onCancel }) => {
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   const handleOk = () => {
//     setConfirmLoading(true);
//     setTimeout(() => {
//       setConfirmLoading(false);
//       onOk(); // Call the onOk function passed as prop
//     }, 1000);
//   };

//   return (
//     <Modal
//       title="Confirm Deletion"
//       open={isOpen}
//       onCancel={onCancel}
//       footer={[
//         <Button
//           key="ok"
//           className={styles.okButton}
//           type="primary"
//           loading={confirmLoading}
//           onClick={handleOk}
//         >
//           OK
//         </Button>,
//         <Button key="cancel" className={styles.cancelButton} onClick={onCancel}>
//           Cancel
//         </Button>,
//       ]}
//     >
//       <p>Are you sure you want to delete this session?</p>
//     </Modal>
//   );
// };

// export default SessionModal;
