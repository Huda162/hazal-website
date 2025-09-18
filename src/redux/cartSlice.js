import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const notifyRemove = () =>
  toast("تم حذف المنتج من السلة بنجاح", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    style: {
      backgroundColor: "rgb(45 111 109)",
      color: "white",
      textAlign: "center",
    },
  });
const notifyMissingOptions = () =>
  toast("الرجاء اختيار اللون أو الحجم", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "custom-toast",
    style: {
      backgroundColor: "rgb(45 111 109)",
      color: "white",
      textAlign: "center",
    },
  });
export const addCartSlice = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    // addItem: (state, action) => {
    //   const newItem = action.payload.newItem;
    //   const existItemIndex = state.value.findIndex(
    //     (item) => item.id === newItem.id
    //   );
    //   if (existItemIndex !== -1) {
    //     state.value[existItemIndex].quantity += 1;
    //   } else {
    //     state.value.push({ ...newItem });
    //   }
    // },

    addItem: (state, action) => {
      const newItem = action.payload.newItem;

      const existItemIndex = state.value.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.selectedColor === newItem.selectedColor &&
          item.selectedSize === newItem.selectedSize
      );

      if (existItemIndex !== -1) {
        state.value[existItemIndex].quantity += 1;
      } else {
        state.value.push({ ...newItem });
      }
    },

    removeItem: (state, action) => {
      return {
        ...state,
        value: state.value.filter((_, index) => index !== action.payload),
      };
    },
    decrementItem: (state, action) => {
      if (state.value[action.payload].quantity > 1) {
        state.value[action.payload].quantity -= 1;
      }
    },
    changeQuantity: (state, action) => {
      state.value[index].quantity = action.payload;
    },
    clearCart: () => {
      return { value: [] };
    },
  },
});

export const { addItem, removeItem, decrementItem, changeQuantity, clearCart } =
  addCartSlice.actions;
export default addCartSlice.reducer;

// export const addCartSlice1 = createSlice({
//     name: "cart",
//     initialState: { value: [] },
//     reducers: {
//         addItem: (state, action) => {
//             const newItem = action.payload.newItem;

//             // Check if the product requires color and/or size selection
//             if ((newItem.hasColor && !newItem.selectedColor) || (newItem.hasSize && !newItem.selectedSize)) {
//                 notifyMissingOptions();
//                 return; // Don't add the item if options are missing
//             }

//             const existItemIndex = state.value.findIndex(
//                 (item) => item.id === newItem.id &&
//                 item.selectedColor === newItem.selectedColor && // Match by color if applicable
//                 item.selectedSize === newItem.selectedSize     // Match by size if applicable
//             );

//             if (existItemIndex !== -1) {
//                 state.value[existItemIndex].quantity += 1;
//             } else {
//                 state.value.push({ ...newItem });
//             }
//         },

//         removeItem: (state, action) => {
//             notifyRemove();
//             return {
//                 ...state,
//                 value: state.value.filter((_, index) => index !== action.payload),
//             };
//         },

//         decrementItem: (state, action) => {
//             if (state.value[action.payload].quantity > 1) {
//                 state.value[action.payload].quantity -= 1;
//             }
//         },

//         changeQuantity: (state, action) => {
//             state.value[action.payload.index].quantity = action.payload.quantity;
//         },

//         clearCart: () => {
//             return { value: [] };
//         },
//     },
// });
