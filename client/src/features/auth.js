import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    authorized: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload.username;
      state.authorized = true;
    },
    logout: (state) => {
      state.username = null;
      state.authorized = false;
    },
  },
});

  // export const handleLogout = () => async (dispatch) => {
  //   try {
  //     const response = await fetch('/logout', { method: 'POST' });
  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }
  //     dispatch(logout());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;