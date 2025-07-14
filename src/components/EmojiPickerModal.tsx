// import React from 'react';
// import { Modal, View, StyleSheet } from 'react-native';
// import EmojiPicker, { EmojiType } from 'rn-emoji-keyboard';

// interface Props {
//   onSelect: (emoji: string) => void;
//   onClose: () => void;
// }

// export default function EmojiPickerModal({ onSelect, onClose }: Props) {
//   return (
//     <Modal visible transparent animationType="slide" onRequestClose={onClose}>
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           <EmojiPicker
//             onEmojiSelected={(emoji) => {
//               onSelect(emoji);
//               onClose();
//             }}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: '#00000066',
//     justifyContent: 'center',
//   },
//   container: {
//     backgroundColor: '#fff',
//     margin: 20,
//     borderRadius: 8,
//     height: 400,
//   },
// });
