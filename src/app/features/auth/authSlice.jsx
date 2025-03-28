import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserApi, loginApi, logoutApi, signupApi } from "./authApi";

const initialState = {
	user: null,
	loading: false,
	error: null,
};

export const login = createAsyncThunk(
	"auth/login",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const res = await loginApi(email, password);
			return res.user;
		} catch (error) {
			return rejectWithValue(error.response?.data || "Login failed");
		}
	}
);
export const signup = createAsyncThunk(
	"auth/signup",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const res = await signupApi(email, password);
			return null;
		} catch (error) {
			return rejectWithValue(error.response?.data || "Signup failed");
		}
	}
);

export const fetchuser = createAsyncThunk(
	"auth/fetchUser",
	async (_, { rejectWithValue }) => {
		try {
			const res = await fetchUserApi();
			return res;
		} catch (error) {
			return rejectWithValue(error.response?.data || "User fetch failed");
		}
	}
);
export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			await logoutApi(); // Using the API function
			return null;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(login.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Signup
			.addCase(signup.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(signup.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Fetch User
			.addCase(fetchuser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchuser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(fetchuser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.loading = true;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.loading = false;
			});
	},
});

const authReducer = authSlice.reducer;
export default authReducer;
